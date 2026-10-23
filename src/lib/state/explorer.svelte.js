import { flushSync, tick } from 'svelte'
import { createExplorerTree } from './explorerTree.js'
import { readExplorerItems } from './explorerItems.js'
import { SHEET_STATES, createViewerState } from './viewerState.svelte.js'
import { pick, restoreLanguage, text } from './language.svelte.js'
import { readLayoutMode } from '../utils/layoutMode.js'

const selectionSources = new Set(['list', 'marker', 'canvas'])

function getHashId() {
	try {
		return decodeURIComponent(window.location.hash.slice(1))
	} catch {
		return ''
	}
}

export function createExplorer(content) {
	const items = readExplorerItems(content)
	const tree = createExplorerTree(items)
	const state = createViewerState(tree.rootId)

	function isMobile() {
		return state.layoutMode === 'sheet'
	}

	function isDocked() {
		return state.layoutMode.startsWith('docked')
	}

	function isVisible() {
		return (
			isDocked() ||
			(isMobile()
				? state.sheetState !== SHEET_STATES.CLOSED
				: state.explorerOpen)
		)
	}

	function getFullTitle(id) {
		return pick(tree.get(id)?.title)
	}

	function getTitle(id) {
		return id === tree.rootId ? pick(content.shortLabel) : getFullTitle(id)
	}

	function getPath(id) {
		return new Set(tree.getPath(id).map((item) => item.id))
	}

	async function focusItem(id) {
		await tick()
		if (id === tree.rootId) {
			const title = document.querySelector('.explorer-title')
			title.tabIndex = -1
			title.focus({ preventScroll: true })
			return
		}
		document
			.getElementById(id)
			?.querySelector(':scope > .explorer-node-heading a')
			?.focus({ preventScroll: true })
	}

	async function focusToggle() {
		await tick()
		document.querySelector('.explorer-toggle')?.focus()
	}

	function requestScroll(id, smooth = true) {
		state.scrollRequest = {
			id,
			smooth,
			count: state.scrollRequest.count + 1,
		}
	}

	function announce(id) {
		const parts = [tree.getNumber(id), getFullTitle(id), text('selected')]
		state.announcement = ''
		setTimeout(() => {
			state.announcement = parts.filter(Boolean).join(', ')
		}, 60)
	}

	function setExplorerOpen(open, { focus = false } = {}) {
		state.explorerOpen = open
		if (!focus) return
		if (open) focusItem(state.selectedId)
		else focusToggle()
	}

	function setSheetState(sheetState, { focus = false } = {}) {
		state.sheetState = sheetState
		if (!focus) return
		if (sheetState === SHEET_STATES.CLOSED) focusToggle()
		else focusItem(state.selectedId)
	}

	function openExplorer() {
		if (isDocked()) focusItem(state.selectedId)
		else if (isMobile())
			setSheetState(SHEET_STATES.EXPANDED, { focus: true })
		else setExplorerOpen(true, { focus: true })
	}

	function closeExplorer() {
		if (isDocked()) return
		if (isMobile()) setSheetState(SHEET_STATES.CLOSED, { focus: true })
		else setExplorerOpen(false, { focus: true })
	}

	function revealSelection(id, source, keyboard) {
		if (!isMobile() || !selectionSources.has(source) || keyboard) return
		const isLeaf = tree.getChildren(id).length === 0
		if (isLeaf || state.sheetState === SHEET_STATES.CLOSED)
			setSheetState(SHEET_STATES.PEEK)
	}

	function navigate(
		id,
		{ source = 'list', push = true, focus = false, keyboard = false } = {},
	) {
		const nextId = tree.has(id) ? id : tree.rootId
		const previousId = state.selectedId
		const changed = nextId !== previousId
		if (push && changed) history.pushState(null, '', `#${nextId}`)
		if (changed) state.breadcrumbExpanded = false
		state.selectedId = nextId
		state.selectedCollapsed = false
		state.previewId = null
		requestScroll(nextId)
		revealSelection(nextId, source, keyboard)
		if (changed || source === 'history') state.sceneRequest += 1
		if (focus) focusItem(nextId)
		if (changed) announce(nextId)
	}

	function toggleSelectedItem() {
		state.selectedCollapsed = !state.selectedCollapsed
		if (!state.selectedCollapsed) requestScroll(state.selectedId)
	}

	function setPreview(id) {
		if (state.previewId !== id) state.previewId = id
	}

	function handleKeydown(event) {
		if (event.key !== 'Escape' || !state.enhanced) return
		const parent = tree.getParent(state.selectedId)
		const explorer = document.getElementById('explorer')
		if (parent && explorer?.contains(document.activeElement)) {
			event.preventDefault()
			navigate(parent.id, {
				source: 'breadcrumb',
				focus: true,
				keyboard: true,
			})
			return
		}
		if (isMobile()) {
			if (state.sheetState === SHEET_STATES.EXPANDED)
				setSheetState(SHEET_STATES.PEEK)
			else if (state.sheetState === SHEET_STATES.PEEK)
				setSheetState(SHEET_STATES.CLOSED, { focus: true })
		} else if (state.explorerOpen && !isDocked()) {
			setExplorerOpen(false, { focus: true })
		}
	}

	function handlePopstate() {
		if (!state.enhanced) return
		navigate(getHashId(), { source: 'history', push: false })
	}

	function initialize(layoutMode) {
		state.layoutMode = layoutMode
		const initialId = tree.has(getHashId()) ? getHashId() : tree.rootId
		state.selectedId = initialId
		if (initialId !== tree.rootId) {
			state.explorerOpen = !isMobile()
			state.sheetState = isMobile()
				? SHEET_STATES.PEEK
				: SHEET_STATES.CLOSED
		}
		requestScroll(initialId, false)
	}

	function enhance() {
		const root = document.documentElement
		const layoutMode = readLayoutMode()
		initialize(layoutMode)
		state.enhanced = true
		root.dataset.layout = layoutMode
		root.classList.add('js-enhanced')
		flushSync()
	}

	function showFallback() {
		state.fallback = true
	}

	function skipToExplorer(event) {
		if (!state.enhanced) return
		event.preventDefault()
		openExplorer()
	}

	function connect() {
		const root = document.documentElement
		const siteLanguage = root.lang
		const coarsePointer = window.matchMedia('(pointer: coarse)')
		const updatePointer = () => {
			state.coarsePointer = coarsePointer.matches
		}
		root.classList.add('js')
		state.scriptActive = true
		restoreLanguage()
		updatePointer()
		coarsePointer.addEventListener('change', updatePointer)
		document.addEventListener('keydown', handleKeydown)
		window.addEventListener('popstate', handlePopstate)
		// The explorer is one page of the site: hand the document back as it was
		return () => {
			coarsePointer.removeEventListener('change', updatePointer)
			document.removeEventListener('keydown', handleKeydown)
			window.removeEventListener('popstate', handlePopstate)
			root.classList.remove('js', 'js-enhanced')
			delete root.dataset.layout
			root.lang = siteLanguage
		}
	}

	return {
		content,
		tree,
		state,
		isMobile,
		isDocked,
		isVisible,
		getTitle,
		getFullTitle,
		getPath,
		focusItem,
		navigate,
		toggleSelectedItem,
		setPreview,
		setExplorerOpen,
		setSheetState,
		openExplorer,
		closeExplorer,
		handleKeydown,
		handlePopstate,
		initialize,
		enhance,
		showFallback,
		skipToExplorer,
		connect,
	}
}
