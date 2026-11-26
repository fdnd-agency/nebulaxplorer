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
			<div class="explorer-intro prose">
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

<style>
	/* The page without JavaScript is the base: a catalogue on the page. With
	   the 3D view (.js-enhanced) the explorer is a panel beside it, or a sheet
	   at the bottom on a phone. */
	.explorer {
		color: var(--explorer-text);
		background: var(--explorer-background);

		:global(.js-enhanced) & {
			position: fixed;
			z-index: 30;
			display: flex;
			flex-direction: column;

			/* Desktop: always open on the right */
			@container satellite (width >= 720px) {
				top: 0;
				right: 0;
				bottom: 0;
				width: var(--explorer-width);
				border-left: 1px solid var(--explorer-line);
				box-shadow: 0 0 40px
					hsl(
						var(--neutral-h) var(--neutral-s)
							var(--neutral-darkest-l) / 40%
					);
				transition:
					transform 320ms var(--ease),
					visibility 0s;

				/* Hidden in full screen */
				&[data-hidden='true'] {
					visibility: hidden;
					transform: translateX(100%);
					transition:
						transform 320ms var(--ease),
						visibility 0s 320ms;
				}
			}

			/* Phone: a sheet that folds between its peek row and expanded */
			@container satellite (width < 720px) {
				right: 0;
				bottom: 0;
				left: 0;
				height: calc(var(--stage-height) - var(--sheet-expanded-top));
				border-top: 1px solid var(--explorer-line);
				box-shadow: 0 -12px 40px
					hsl(
						var(--neutral-h) var(--neutral-s)
							var(--neutral-darkest-l) / 40%
					);
				transform: translateY(calc(100% - var(--sheet-peek-height)));
				transition: transform 250ms var(--ease);

				&[data-sheet='expanded'] {
					transform: none;
				}

				&[data-hidden='true'] {
					visibility: hidden;
					transform: translateY(100%);
				}
			}
		}

		/* Dual-screen devices: the explorer fills one screen */
		:global(.satellite-page[data-layout='docked-columns'].js-enhanced) & {
			top: 0;
			right: auto;
			bottom: 0;
			left: 0;
			z-index: 50;
			width: var(--docked-explorer-width);
			height: auto;
			visibility: visible;
			transform: none;
			transition: none;
		}

		:global(.satellite-page[data-layout='docked-rows'].js-enhanced) & {
			top: var(--docked-explorer-top);
			right: 0;
			bottom: 0;
			left: 0;
			width: auto;
			height: auto;
			visibility: visible;
			transform: none;
			transition: none;
		}

		@media (prefers-reduced-transparency: reduce) {
			box-shadow: none;
		}
	}

	.explorer-scroll {
		container: explorer / inline-size;
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 clamp(var(--spacing-lg), 4vw, var(--spacing-xl)) 6rem;

		:global(.js-enhanced) & {
			flex: 1;
			max-width: none;
			margin: 0;
			overflow-y: auto;
			overscroll-behavior: contain;
			padding: 0 var(--spacing-md) var(--spacing-xl);
			scrollbar-color: var(--explorer-line) transparent;
			scrollbar-width: thin;

			@container satellite (width >= 720px) {
				padding: 0 var(--spacing-xl) var(--spacing-xl) 2.5rem;
			}
		}

		/* The peek row of the sheet shows only the selected item */
		:global(.js-enhanced) .explorer[data-sheet='peek'] & {
			@container satellite (width < 720px) {
				visibility: hidden;
			}
		}
	}

	/* Without JavaScript: the opening (name and the satellite), then the
	   components. On large screens the name sits beside the satellite. */
	.explorer-root {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-areas:
			'intro'
			'hero'
			'components';

		@container satellite (width >= 900px) {
			grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
			grid-template-areas:
				'intro hero'
				'components components';
			align-items: center;
			column-gap: clamp(var(--spacing-xl), 4vw, var(--spacing-2xl));
		}

		:global(.js-enhanced) & {
			display: block;
		}
	}

	.explorer-intro {
		grid-area: intro;
		padding-top: clamp(var(--spacing-lg), 6vw, var(--spacing-xl));

		@container satellite (width >= 900px) {
			padding-top: 0;
		}

		:global(.js-enhanced) & {
			padding-top: 0;
		}
	}

	.explorer-lead {
		max-width: 60ch;
	}

	/* So the prose spacing above the note applies */
	.explorer-intro > noscript {
		display: block;
	}

	.explorer-static-note {
		max-width: 34em;
		padding-left: var(--spacing-md);
		border-left: 1px solid var(--explorer-accent);
		color: var(--explorer-text-muted);
		font-family: var(--font-caption);
		font-size: var(--font-size-body-sm);
		line-height: var(--line-height-normal);
	}

	.explorer-tree-navigation {
		grid-area: components;
		margin-top: clamp(var(--spacing-xl), 7vw, 6rem);
	}

	.explorer-section-label {
		margin-bottom: var(--spacing-md);
		color: var(--explorer-text-muted);
		font-family: var(--font-body);
		font-size: var(--font-size-body-sm);
		font-weight: 500;
		line-height: var(--line-height-normal);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		scroll-margin-top: var(--spacing-md);
	}

	/* The list of the seven components */
	.explorer-tree {
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--explorer-line);
		list-style: none;

		:global(.js-enhanced) & {
			border-top: 0;
			border-bottom: 1px solid var(--explorer-line);
		}
	}
</style>
