import { flushSync, tick } from 'svelte'
import { createExplorerTree } from './explorerTree.js'
import { readExplorerItems } from './explorerItems.js'
import { SHEET_STATES, createViewerState } from './viewerState.svelte.js'
import { pick, restoreLanguage, text } from './language.svelte.js'
import { getExplorerPage } from '../utils/explorerPage.js'
import { readLayoutMode } from '../utils/layoutMode.js'

const selectionSources = new Set(['list', 'marker', 'canvas'])

function readHash() {
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

	// The explorer is always open: a panel beside the 3D view, or on a phone a
	// sheet that folds back to its peek row
	function isVisible() {
		return true
	}

	function getFullTitle(id) {
		return pick(tree.get(id)?.title)
	}

	function getTitle(id) {
		return id === tree.rootId ? pick(content.shortLabel) : getFullTitle(id)
	}

	// The item in the address bar; an earlier anchor is replaced by the current one
	function getHashId() {
		const hash = readHash()
		const id = tree.resolve(hash)
		if (id && id !== hash) history.replaceState(history.state, '', `#${id}`)
		return id ?? ''
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

	function setSheetState(sheetState, { focus = false } = {}) {
		state.sheetState = sheetState
		if (focus) focusItem(state.selectedId)
	}

	// On a phone a selected part without parts of its own folds the sheet back,
	// so the part itself is in view
	function revealSelection(id, source, keyboard) {
		if (!isMobile() || !selectionSources.has(source) || keyboard) return
		if (tree.getChildren(id).length === 0) setSheetState(SHEET_STATES.PEEK)
	}

	function navigate(
		id,
		{ source = 'list', push = true, focus = false, keyboard = false } = {},
	) {
		const nextId = tree.resolve(id) ?? tree.rootId
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
		if (isMobile() && state.sheetState === SHEET_STATES.EXPANDED)
			setSheetState(SHEET_STATES.PEEK)
	}

	function handlePopstate() {
		if (!state.enhanced) return
		navigate(getHashId(), { source: 'history', push: false })
		showViewer()
	}

	// A link to a part (#sun-sensor) and the Back button show the 3D view right
	// below the site header, instead of where the browser put the part's
	// anchor. One frame later, once the page has its final layout.
	function showViewer() {
		requestAnimationFrame(() =>
			getExplorerPage()?.scrollIntoView({
				block: 'start',
				behavior: 'instant',
			}),
		)
	}

	function initialize(layoutMode) {
		state.layoutMode = layoutMode
		const initialId = getHashId() || tree.rootId
		state.selectedId = initialId
		requestScroll(initialId, false)
	}

	function enhance() {
		const page = getExplorerPage()
		const layoutMode = readLayoutMode()
		initialize(layoutMode)
		state.enhanced = true
		page.dataset.layout = layoutMode
		page.classList.add('js-enhanced')
		flushSync()
		if (state.selectedId !== tree.rootId) showViewer()
	}

	function showFallback() {
		state.fallback = true
	}

	function connect() {
		const page = getExplorerPage()
		const coarsePointer = window.matchMedia('(pointer: coarse)')
		const updatePointer = () => {
			state.coarsePointer = coarsePointer.matches
		}
		page.classList.add('js')
		state.scriptActive = true
		restoreLanguage()
		updatePointer()
		coarsePointer.addEventListener('change', updatePointer)
		document.addEventListener('keydown', handleKeydown)
		window.addEventListener('popstate', handlePopstate)
		// The explorer is one page of the site: stop listening when it closes
		return () => {
			coarsePointer.removeEventListener('change', updatePointer)
			document.removeEventListener('keydown', handleKeydown)
			window.removeEventListener('popstate', handlePopstate)
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
		setSheetState,
		handleKeydown,
		handlePopstate,
		initialize,
		enhance,
		showFallback,
		connect,
	}
}
