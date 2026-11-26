<script>
	import { Button, Heading, Paragraph } from '$lib/components/atoms'
	import { ExplorerCredits, ExplorerHero } from '$lib/components/molecules'
	import { ExplorerBar, ExplorerNode } from '$lib/components/organisms'
	import { ArrowIcon } from '$lib/assets/icons'
	import { SHEET_STATES } from '$lib/state/viewerState.svelte.js'
	import { pick, pickFor, text } from '$lib/state/language.svelte.js'

	let { explorer } = $props()

	const comfortableOffset = 12
	const { state, tree, content } = $derived(explorer)
	const {
		kicker,
		title,
		lead,
		hero,
		staticNote,
		exploreComponents,
		componentsLabel,
		children,
	} = $derived(content)
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
	data-sheet={state.sheetState}
	data-hidden={String(state.explorerHidden)}
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
			<div class="explorer-intro">
				<div class="explorer-title">
					<Heading headingLevel={2} subheading={pick(kicker)}
						>{pick(title)}</Heading
					>
				</div>
				<div class="explorer-lead">
					<Paragraph>{pickFor(state.enhanced, lead)}</Paragraph>
				</div>
				<!-- The page without the 3D model: a catalogue of the components -->
				{#if !state.enhanced}
					<Button
						href="#explorer-components-title"
						text={pick(exploreComponents).replace(
							'{count}',
							String(children.length),
						)}
						variant="secondary-solid"
						classes="explorer-call-to-action"
					>
						{#snippet icon()}<ArrowIcon
								direction="down"
							/>{/snippet}
					</Button>
					<noscript>
						<p class="explorer-static-note">{pick(staticNote)}</p>
					</noscript>
				{/if}
			</div>
			{#if !state.enhanced}
				<ExplorerHero {hero} />
			{/if}
			<nav
				class="explorer-tree-navigation"
				aria-labelledby="explorer-components-title"
			>
				<div
					class="explorer-section-label"
					id="explorer-components-title"
				>
					<Heading headingLevel={2}>{pick(componentsLabel)}</Heading>
				</div>
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
		</div>

		<ExplorerCredits />
	</div>
</section>
