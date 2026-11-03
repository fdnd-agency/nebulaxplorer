<script>
	import ExplorerItemContent from '$lib/components/molecules/ExplorerItemContent.svelte'
	import ExplorerNode from '$lib/components/organisms/ExplorerNode.svelte'
	import { pick, text } from '$lib/state/language.svelte.js'

	let { item, depth, number, explorer } = $props()

	const { state } = $derived(explorer)
	const { id, scene, component, title, blocks, children } = $derived(item)
	const path = $derived(explorer.getPath(state.selectedId))
	const selected = $derived(state.selectedId === id)
	const expanded = $derived(
		path.has(id) && !(selected && state.selectedCollapsed),
	)
	const headingLevel = $derived(`h${Math.min(depth + 2, 6)}`)
</script>

<li
	class="explorer-node"
	class:is-expanded={state.enhanced && expanded}
	class:is-selected={state.enhanced && selected}
	class:is-in-path={state.enhanced && path.has(id) && !selected}
	{id}
	data-explorer-item
	data-scene={scene}
	data-component={component}
>
	<svelte:element this={headingLevel} class="explorer-node-heading"
		><a
			class="explorer-node-link"
			class:is-previewed={state.previewId === id}
			href="#{id}"
			aria-controls={state.enhanced ? `${id}-content` : undefined}
			aria-expanded={state.enhanced ? String(expanded) : undefined}
			aria-current={state.enhanced && selected ? 'true' : undefined}
			><span class="explorer-list-number"
				>{number}<span class="visually-hidden">,</span></span
			>
			<span class="explorer-node-title">{pick(title)}</span
			>{#if children.length}<span class="explorer-list-meta"
					>{children.length}<span class="visually-hidden"
						>{text('itemsInside')}</span
					></span
				>{/if}</a
		></svelte:element
	>
	<div
		class="explorer-node-body"
		id="{id}-content"
		inert={state.enhanced && !expanded}
	>
		<div class="explorer-node-content">
			<ExplorerItemContent {blocks} />
			{#if children.length}
				<ol class="explorer-tree">
					{#each children as child, index (child.id)}
						<ExplorerNode
							item={child}
							depth={depth + 1}
							number={String(index + 1).padStart(2, '0')}
							{explorer}
						/>
					{/each}
				</ol>
			{/if}
		</div>
	</div>
</li>
