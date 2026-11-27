<script>
	import { text } from '$lib/state/language.svelte.js'

	let { explorer } = $props()

	const collapsedBreadcrumbLength = 4
	const { state, tree, getTitle } = $derived(explorer)
	const path = $derived(tree.getPath(state.selectedId))
	const collapsed = $derived(
		!state.breadcrumbExpanded && path.length > collapsedBreadcrumbLength,
	)
	const visibleItems = $derived(
		collapsed ? [path[0], null, ...path.slice(-2)] : path,
	)
	const hiddenTitles = $derived(
		path
			.slice(1, -2)
			.map((item) => getTitle(item.id))
			.join(', '),
	)
</script>

<nav class="explorer-breadcrumb" aria-label={text('breadcrumb')}>
	<ol>
		{#if state.enhanced}
			{#each visibleItems as item, index (item?.id ?? `more-${index}`)}
				<li>
					{#if !item}
						<button
							type="button"
							class="explorer-breadcrumb-more"
							aria-label="{text('showFullPath')}: {hiddenTitles}"
							onclick={() => (state.breadcrumbExpanded = true)}
							>…</button
						>
					{:else if item.id === state.selectedId}
						<span aria-current="location">{getTitle(item.id)}</span>
					{:else}
						<a href="#{item.id}">{getTitle(item.id)}</a>
					{/if}
				</li>
			{/each}
		{/if}
	</ol>
</nav>

<style>
	.explorer-breadcrumb ol {
		display: flex;
		flex-wrap: wrap;
		margin: 0;
		padding: 0;
		color: var(--explorer-text-muted);
		font-family: var(--font-caption);
		font-size: var(--font-size-body-sm);
		line-height: var(--line-height-normal);
		list-style: none;
	}

	li + li::before {
		content: '›';
		margin: 0 var(--spacing-sm);
	}

	a {
		color: inherit;
		text-decoration: none;

		&:hover {
			color: var(--explorer-text);
			text-decoration: underline 1px var(--explorer-accent);
			text-underline-offset: 4px;
		}
	}

	[aria-current] {
		color: var(--explorer-text);
	}

	.explorer-breadcrumb-more {
		padding: 0 2px;
		border: 0;
		color: inherit;
		background: none;
		cursor: pointer;
	}
</style>
