<script>
	import { ComponentImage, Link, Paragraph } from '$lib/components/atoms'
	import {
		ComponentViews,
		ExplorerItemContent,
		InstrumentMap,
	} from '$lib/components/molecules'
	import { ExplorerNode } from '$lib/components/organisms'
	import { pick, text } from '$lib/state/language.svelte.js'

	let {
		item,
		depth,
		number,
		explorer,
		parentId = null,
	} = $props()

	const { state } = $derived(explorer)
	const { id, scene, component, title, blocks, children, image } =
		$derived(item)
	const path = $derived(explorer.getPath(state.selectedId))
	const selected = $derived(state.selectedId === id)
	const expanded = $derived(
		path.has(id) && !(selected && state.selectedCollapsed),
	)
	const headingLevel = $derived(`h${Math.min(depth + 2, 6)}`)
	// Without the 3D model the page is an exhibit: the branches inside a main
	// component fold into native disclosures, and every component and
	// instrument part with a location view opens when its link is followed
	// (CSS :target), with "On the spacecraft" and "Close-up"
	const catalogue = $derived(!state.enhanced)
	const disclosure = $derived(catalogue && depth >= 2 && children.length > 0)
	const exhibit = $derived(catalogue && Boolean(item.location))
	const scope = $derived(depth === 1 ? 'spacecraft' : 'instrument')
	const backHref = $derived(
		depth === 1 ? '#explorer-components-title' : `#${parentId}`,
	)
</script>

{#snippet label()}{#if exhibit && image}<span class="explorer-node-thumb"
			><ComponentImage
				{image}
				alt=""
				sizes="(min-width: 900px) 160px, 112px"
			/></span
		>{/if}<span class="explorer-list-number"
		>{number}<span class="visually-hidden">,</span></span
	>
	<span class="explorer-node-title">{pick(title)}</span
	>{#if children.length}<span class="explorer-list-meta"
			>{children.length}<span class="visually-hidden"
				>{text('itemsInside')}</span
			></span
		>{/if}{/snippet}

{#snippet body()}
	<div
		class="explorer-node-body"
		id="{id}-content"
		inert={state.enhanced && !expanded}
	>
		<div class="explorer-node-content">
			{#if exhibit}
				<Link
					href={backHref}
					text={text(depth === 1 ? 'allComponents' : 'allParts')}
					size="sm"
					color="var(--explorer-text)"
					classes="explorer-back"
				/>
				<ComponentViews {item} {scope} />
			{:else if catalogue && item.map}
				<InstrumentMap map={item.map} parts={children} />
			{:else if catalogue && image}
				<figure
					class="explorer-node-figure"
					class:is-schematic={image.schematic}
				>
					<ComponentImage
						{image}
						sizes="(min-width: 1100px) 300px, 40vw"
					/>
					{#if image.schematic}
						<figcaption>{text('schematic')}</figcaption>
					{/if}
				</figure>
			{/if}
			<ExplorerItemContent {blocks} enhanced={state.enhanced} />
			{#if children.length}
				<ol class="explorer-tree">
					{#each children as child, index (child.id)}
						<ExplorerNode
							item={child}
							depth={depth + 1}
							number={String(index + 1).padStart(2, '0')}
							{explorer}
							parentId={id}
						/>
					{/each}
				</ol>
			{/if}
		</div>
	</div>
{/snippet}

<li
	class="explorer-node"
	class:is-expanded={state.enhanced && expanded}
	class:is-selected={state.enhanced && selected}
	class:is-in-path={state.enhanced && path.has(id) && !selected}
	class:has-figure={catalogue && image && !exhibit}
	class:is-exhibit={exhibit}
	{id}
	data-explorer-item
	data-scene={scene}
	data-component={component}
	data-depth={depth}
>
	{#if catalogue}
		<!-- Earlier anchors of this item; with JavaScript the explorer resolves them -->
		{#each item.aliases ?? [] as alias (alias)}<span id={alias}
			></span>{/each}
	{/if}
	{#if disclosure}
		<details class="explorer-disclosure" open={item.openWithoutScript}>
			<summary class="explorer-disclosure-summary"
				><svelte:element
					this={headingLevel}
					class="explorer-node-heading"
					>{@render label()}</svelte:element
				></summary
			>
			{@render body()}
		</details>
	{:else}
		<svelte:element this={headingLevel} class="explorer-node-heading"
			><a
				class="explorer-node-link"
				class:is-previewed={state.previewId === id}
				href="#{id}"
				aria-controls={state.enhanced ? `${id}-content` : undefined}
				aria-expanded={state.enhanced ? String(expanded) : undefined}
				aria-current={state.enhanced && selected ? 'true' : undefined}
				>{@render label()}</a
			></svelte:element
		>
		{#if exhibit && item.summary}
			<div class="explorer-node-summary">
				<Paragraph>{pick(item.summary)}</Paragraph>
			</div>
		{/if}
		{@render body()}
	{/if}
</li>

<style>
	/* One item of the list: a row with its number and name that opens in
	   place. Without JavaScript (the base) a main component is an exhibit row
	   with a close-up thumbnail that opens with CSS :target; with the 3D view
	   (.js-enhanced) the rows expand and collapse in the panel. data-depth is
	   the level in the list (1 = the seven main components). */
	.explorer-node {
		position: relative;

		/* Earlier anchors (aliases) take no room */
		> span[id] {
			position: absolute;
			top: 0;
		}

		&[data-depth='1']:not(.is-exhibit) {
			border-top: 1px solid var(--explorer-line);
		}
	}

	.explorer-node-heading {
		margin: 0;
		font: inherit;
	}

	.explorer-node-link {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr) auto auto;
		align-items: center;
		min-height: 3.25rem;
		padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm)
			var(--spacing-xs);
		color: var(--explorer-text);
		text-decoration: none;
		transition:
			background-color 150ms var(--ease),
			box-shadow 150ms var(--ease);

		&:hover,
		&.is-previewed {
			background: var(--explorer-hover);
		}

		&:focus-visible {
			outline-offset: -2px;
		}

		.explorer-node:not([data-depth='1']) > .explorer-node-heading > & {
			grid-template-columns: 2rem minmax(0, 1fr) auto auto;
			min-height: 2.75rem;
		}

		@container explorer (width >= 520px) {
			min-height: 3.5rem;
			padding-right: var(--spacing-md);
		}

		/* With the 3D view: a chevron that turns when the row opens */
		:global(.js-enhanced) &::after {
			content: '';
			width: 7px;
			height: 7px;
			margin-left: var(--spacing-md);
			border-top: 1.5px solid currentColor;
			border-right: 1.5px solid currentColor;
			opacity: 0.72;
			transform: rotate(45deg);
			transition: transform 240ms var(--ease);
		}

		.is-expanded > .explorer-node-heading > &::after {
			transform: translateY(-2px) rotate(135deg);
		}

		.is-selected > .explorer-node-heading > & {
			background: var(--explorer-hover);
			box-shadow: inset 2px 0 0 var(--explorer-accent);

			@media (prefers-contrast: more) {
				box-shadow: inset 4px 0 0 var(--explorer-accent);
			}

			@media (forced-colors: active) {
				outline: 2px solid Highlight;
				outline-offset: -2px;
			}
		}

		@media (forced-colors: active) {
			forced-color-adjust: auto;
		}
	}

	.explorer-list-number {
		color: var(--explorer-accent);
		font-family: var(--font-caption);
		font-size: var(--font-size-body-sm);
		line-height: var(--line-height-normal);
	}

	.explorer-node-title {
		font-family: var(--font-heading);
		font-size: var(--font-size-body-md);
		font-weight: 500;
		line-height: var(--line-height-normal);

		.explorer-node:not([data-depth='1']) > .explorer-node-heading & {
			font-size: var(--font-size-body-sm);
		}

		.is-selected > .explorer-node-heading & {
			font-weight: 700;

			@media (forced-colors: active) {
				text-decoration: underline;
				text-underline-offset: 4px;
			}
		}
	}

	.explorer-list-meta {
		color: var(--explorer-text-muted);
		font-family: var(--font-caption);
		font-size: var(--font-size-body-sm);
		line-height: var(--line-height-normal);
	}

	.explorer-node-content {
		:global(.js-enhanced) & {
			padding: var(--spacing-xs) var(--spacing-xs) var(--spacing-sm)
				2.5rem;

			@container explorer (width >= 520px) {
				padding-left: var(--spacing-xl);
			}
		}

		:global(.js-enhanced) .explorer-node:not([data-depth='1']) > * > & {
			padding-left: 2rem;
		}
	}

	/* The parts of an item */
	.explorer-tree {
		margin: 0;
		padding: 0;
		list-style: none;

		:global(.js-enhanced) & {
			margin: var(--spacing-xs) 0 var(--spacing-sm) -1.75rem;
			padding-left: var(--spacing-sm);
			border-left: 1px solid var(--explorer-line);

			@media (forced-colors: active) {
				border-left-color: CanvasText;
			}
		}

		/* The parts list of the X-ray instrument in its exhibit */
		.is-exhibit .explorer-node-content > & {
			margin-top: var(--spacing-xl);
			border-top: 1px solid var(--explorer-line);
		}

		.explorer-disclosure & {
			border-top: 1px solid var(--explorer-line);
		}
	}

	/* With the 3D view a row opens and closes with an animation */
	.explorer-node-body {
		:global(.js-enhanced) & {
			display: grid;
			grid-template-rows: 0fr;
			opacity: 0;
			transition:
				grid-template-rows 260ms var(--ease),
				opacity 200ms var(--ease);

			> .explorer-node-content {
				min-height: 0;
				overflow: hidden;
			}
		}

		.is-expanded > & {
			grid-template-rows: 1fr;
			opacity: 1;
		}
	}

	/* Without JavaScript: exhibit rows ---------------------------------------
	   A main component (and each part of the X-ray instrument) is a row with a
	   close-up thumbnail and its name. Following its link opens it (:target):
	   "On the spacecraft" and "Close-up", one sentence about what it does,
	   the deeper text and a way back. */
	.explorer-node.is-exhibit {
		border-bottom: 1px solid var(--explorer-line);
		scroll-margin-top: 0;

		/* Large screens: closed rows read as a directory, name on the left
		   and what it does on the right */
		@container satellite (width >= 900px) {
			display: grid;
			grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
			column-gap: var(--spacing-xl);
			align-items: center;

			> .explorer-node-heading {
				grid-column: 1;
			}

			> .explorer-node-body {
				grid-column: 1 / -1;
			}

			&:is(:target, :has(:target)) {
				grid-template-columns: minmax(0, 1fr);
			}
		}

		> .explorer-node-heading > .explorer-node-link {
			grid-template-columns: 6rem auto minmax(0, 1fr) auto;
			column-gap: var(--spacing-md);
			min-height: 5.5rem;
			padding: var(--spacing-sm) var(--spacing-xs) var(--spacing-sm) 0;

			@container satellite (width >= 900px) {
				grid-template-columns: 8rem auto minmax(0, 1fr) auto;
				column-gap: var(--spacing-lg);
				min-height: 7rem;
			}

			&:hover {
				background: var(--explorer-hover);
			}

			&:focus-visible {
				outline: 2px solid var(--explorer-select);
				outline-offset: -2px;
			}

			/* A chevron: down while closed, up while open */
			&::after {
				content: '';
				width: 9px;
				height: 9px;
				margin: 0 var(--spacing-sm) var(--spacing-xs) 0;
				border-right: 1.5px solid currentColor;
				border-bottom: 1.5px solid currentColor;
				opacity: 0.8;
				transform: rotate(45deg);
			}
		}

		&:not([data-depth='1']) > .explorer-node-heading > .explorer-node-link {
			grid-template-columns: 5rem auto minmax(0, 1fr) auto;
			min-height: 4.75rem;

			@container satellite (width >= 900px) {
				grid-template-columns: 6rem auto minmax(0, 1fr) auto;
				min-height: 5.5rem;
			}
		}

		> .explorer-node-heading .explorer-node-title {
			font-size: clamp(
				var(--font-size-body-md),
				1.8vw,
				var(--font-size-body-lg)
			);
		}

		&:not([data-depth='1']) > .explorer-node-heading .explorer-node-title {
			font-size: var(--font-size-body-md);
		}

		> .explorer-node-heading .explorer-list-meta {
			display: none;
		}

		> .explorer-node-body {
			display: none;
		}

		/* Open: the component whose link was followed, or that holds it */
		&:is(:target, :has(:target)) {
			> .explorer-node-body {
				display: block;
				padding: 0 0 var(--spacing-xl);
			}

			> .explorer-node-summary {
				display: block;
				margin: 0 0 var(--spacing-lg);
			}

			> .explorer-node-heading > .explorer-node-link {
				padding-left: var(--spacing-sm);
				box-shadow: inset 3px 0 0 var(--explorer-select);

				&::after {
					transform: translateY(4px) rotate(-135deg);
				}
			}
		}
	}

	.explorer-node-thumb {
		display: block;
		overflow: hidden;
		aspect-ratio: 4 / 3;
		background: var(--studio);
	}

	/* One sentence about what it does: beside the name in the closed list on
	   large screens, under the name once opened */
	.explorer-node-summary {
		display: none;
		max-width: 58ch;

		@container satellite (width >= 900px) {
			display: block;
		}
	}

	/* Without JavaScript: the branches of the X-ray instrument --------------
	   Native disclosures (<details>), with the parts in a figure beside their
	   text. */
	.explorer-disclosure {
		border-bottom: 1px solid var(--explorer-line);

		/* A branch inside a branch (the parent row is another instance) */
		:global(.explorer-disclosure) & {
			margin-top: var(--spacing-lg);
			border-top: 1px solid var(--explorer-line);
			border-bottom: 0;
		}

		&[open] > .explorer-disclosure-summary::after {
			transform: translateY(4px) rotate(-135deg);
		}

		> .explorer-node-body {
			padding: var(--spacing-xs) 0 var(--spacing-xl);
		}

		@media (forced-colors: active) {
			border: 1px solid CanvasText;
		}
	}

	.explorer-disclosure-summary {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		min-height: 4rem;
		padding: var(--spacing-sm) var(--spacing-xs);
		cursor: pointer;
		list-style: none;
		transition: background-color 200ms var(--ease);

		&::-webkit-details-marker {
			display: none;
		}

		&::after {
			content: '';
			flex: none;
			width: 9px;
			height: 9px;
			margin: 0 var(--spacing-sm) var(--spacing-xs) auto;
			border-right: 1.5px solid currentColor;
			border-bottom: 1.5px solid currentColor;
			opacity: 0.8;
			transform: rotate(45deg);
		}

		&:hover {
			background: var(--explorer-hover);
		}

		&:focus-visible {
			outline: 2px solid var(--explorer-select);
			outline-offset: -2px;
		}

		.explorer-node-heading {
			display: flex;
			flex: 1;
			align-items: baseline;
			gap: var(--spacing-md);
		}

		.explorer-node-title {
			font-size: var(--font-size-body-md);
		}
	}

	/* A part with a picture, inside a branch: the picture beside its name and
	   text */
	:global(.explorer-disclosure) .explorer-node.has-figure {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		padding: var(--spacing-lg) 0;
		border-bottom: 1px solid var(--explorer-line);
		scroll-margin-top: var(--spacing-md);

		@container satellite (width >= 640px) {
			grid-template-columns: minmax(180px, 2fr) minmax(0, 3fr);
			grid-auto-rows: min-content;
			column-gap: var(--spacing-xl);

			> .explorer-node-heading,
			> .explorer-node-body > .explorer-node-content > * {
				grid-column: 2;
			}

			> .explorer-node-body
				> .explorer-node-content
				> .explorer-node-figure {
				grid-column: 1;
				grid-row: 1 / span 4;
			}
		}

		> .explorer-node-body,
		> .explorer-node-body > .explorer-node-content {
			display: contents;
		}

		.explorer-node-link {
			display: flex;
			align-items: baseline;
			gap: var(--spacing-md);
			min-height: 0;
			padding: 0 0 var(--spacing-sm);
		}

		.explorer-node-title {
			font-size: var(--font-size-body-md);
		}
	}

	:global(.explorer-disclosure) .explorer-node:not(.has-figure, .is-exhibit) {
		padding: var(--spacing-md) 0;
		border-bottom: 1px solid var(--explorer-line);
	}

	.explorer-node-figure {
		margin: 0;

		figcaption {
			margin-top: var(--spacing-sm);
			color: var(--explorer-text-muted);
			font-family: var(--font-body);
			font-size: var(--font-size-body-sm);
			font-weight: 500;
			line-height: var(--line-height-normal);
			letter-spacing: 0.1em;
			text-transform: uppercase;
		}

		.explorer-disclosure
			> .explorer-node-body
			> .explorer-node-content
			> & {
			max-width: 720px;
			margin: var(--spacing-sm) 0 var(--spacing-lg);
		}
	}
</style>
