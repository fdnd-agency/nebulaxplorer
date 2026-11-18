<script>
	import { Link, Paragraph } from '$lib/components/atoms'
	import ComponentImage from '$lib/components/atoms/ComponentImage.svelte'
	import ComponentViews from '$lib/components/molecules/ComponentViews.svelte'
	import ExplorerItemContent from '$lib/components/molecules/ExplorerItemContent.svelte'
	import InstrumentMap from '$lib/components/molecules/InstrumentMap.svelte'
	import ExplorerNode from '$lib/components/organisms/ExplorerNode.svelte'
	import { pick, text } from '$lib/state/language.svelte.js'

	let { item, depth, number, explorer, parentId = null } = $props()

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
					color="var(--color-neutral-lightest)"
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
