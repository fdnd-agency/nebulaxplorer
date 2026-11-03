<script>
	import ExplorerCredits from '$lib/components/molecules/ExplorerCredits.svelte'
	import ExplorerBar from '$lib/components/organisms/ExplorerBar.svelte'
	import ExplorerNode from '$lib/components/organisms/ExplorerNode.svelte'
	import { SHEET_STATES } from '$lib/state/viewerState.svelte.js'
	import { pick, text } from '$lib/state/language.svelte.js'

	let { explorer } = $props()

	const comfortableOffset = 12
	const { state, tree, content } = $derived(explorer)
	const { kicker, title, lead, figure, componentsLabel, mission, children } =
		$derived(content)
	const visible = $derived(state.enhanced && explorer.isVisible())

	let scrollElement = $state()
	let scrollTimeout = null

	function scrollToNode(id, smooth) {
		clearTimeout(scrollTimeout)
		const reduceMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches
		const animate = smooth && !reduceMotion
		const behavior = animate ? 'smooth' : 'auto'
		const scroll = () => {
			const link =
				id === tree.rootId
					? null
					: document
							.getElementById(id)
							?.querySelector(':scope > .explorer-node-heading a')
			if (!link) {
				scrollElement.scrollTo({ top: 0, behavior })
				return
			}
			const containerTop = scrollElement.getBoundingClientRect().top
			const rowTop =
				link.getBoundingClientRect().top -
				containerTop +
				scrollElement.scrollTop
			const comfortableBottom =
				scrollElement.scrollTop + scrollElement.clientHeight * 0.4
			if (
				rowTop >= scrollElement.scrollTop + comfortableOffset &&
				rowTop <= comfortableBottom
			)
				return
			scrollElement.scrollTo({
				top: Math.max(0, rowTop - comfortableOffset),
				behavior,
			})
		}
		scrollTimeout = setTimeout(scroll, animate ? 280 : 0)
	}

	$effect(() => {
		const request = state.scrollRequest
		if (!state.enhanced || !scrollElement) return
		scrollToNode(request.id, request.smooth)
	})

	function handleClick(event) {
		if (!state.enhanced) return
		const link = event.target.closest('a[href^="#"]')
		if (link && tree.has(link.hash.slice(1))) {
			event.preventDefault()
			const id = link.hash.slice(1)
			if (
				id === state.selectedId &&
				link.classList.contains('explorer-node-link')
			) {
				explorer.toggleSelectedItem()
				return
			}
			explorer.navigate(id, {
				source: link.closest('.explorer-breadcrumb')
					? 'breadcrumb'
					: 'list',
				keyboard: event.detail === 0,
			})
			return
		}
		if (
			explorer.isMobile() &&
			state.sheetState === SHEET_STATES.PEEK &&
			!event.target.closest('a, button')
		)
			explorer.setSheetState(SHEET_STATES.EXPANDED)
	}

	function previewFromEvent(event) {
		if (!state.enhanced) return
		const link = event.target.closest('.explorer-node-link')
		explorer.setPreview(link ? link.hash.slice(1) : null)
	}

	function handleFocusout(event) {
		if (!state.enhanced) return
		if (!event.currentTarget.contains(event.relatedTarget))
			explorer.setPreview(null)
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_click_events_have_key_events -->
<section
	class="explorer"
	id="explorer"
	aria-label={text('explorerLabel')}
	data-open={String(state.explorerOpen)}
	data-sheet={state.sheetState}
	inert={state.enhanced && !visible}
	onclick={handleClick}
	onpointerover={previewFromEvent}
	onfocusin={previewFromEvent}
	onpointerleave={() => state.enhanced && explorer.setPreview(null)}
	onfocusout={handleFocusout}
>
	<ExplorerBar {explorer} />

	<div class="explorer-scroll" bind:this={scrollElement}>
		<div
			class="explorer-root"
			id={content.id}
			data-explorer-item
			data-scene={content.scene}
		>
			<p class="explorer-kicker">{pick(kicker)}</p>
			<h1 class="explorer-title">{pick(title)}</h1>
			<p class="explorer-lead">{pick(lead)}</p>
			<figure class="explorer-figure">
				<img
					src={figure.src}
					width={figure.width}
					height={figure.height}
					loading="lazy"
					decoding="async"
					alt={pick(figure.alt)}
				/>
			</figure>
			<nav
				class="explorer-tree-nav"
				aria-labelledby="explorer-components-title"
			>
				<h2
					class="explorer-section-label"
					id="explorer-components-title"
				>
					{pick(componentsLabel)}
				</h2>
				<ol class="explorer-tree">
					{#each children as item, index (item.id)}
						<ExplorerNode
							{item}
							depth={1}
							number={String(index + 1).padStart(2, '0')}
							{explorer}
						/>
					{/each}
				</ol>
			</nav>
			<div class="explorer-about">
				<h2 class="explorer-section-label">
					{pick(mission.title)}
				</h2>
				<p>{pick(mission.text)}</p>
			</div>
		</div>

		<ExplorerCredits />
	</div>
</section>
