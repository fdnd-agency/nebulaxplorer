<script>
	import { page } from '$app/stores'
	import { resolve } from '$app/paths'
	import { Arrow, sanitizeString } from '$lib'

	// Split the path into segments and filter out empty strings
	const pathSegments = $page.url.pathname
		.split('/')
		.filter((segment) => segment !== '')

	const { contrast = 'white-on-space' } = $props()
</script>

<nav class={`breadcrumb-path ${contrast}`}>
	<div class="content-container">
		<a href={resolve('/')} class="crumb subheading">home</a>
		{#each pathSegments as segment, index (index)}
			<span class="arrow">
				<Arrow />
			</span>
			{#if index + 1 < pathSegments.length}
				<a
					href={resolve(
						'/' + pathSegments.slice(0, index + 1).join('/')
					)}
					class="crumb subheading">
					{sanitizeString(segment)}
				</a>
			{:else}
				<span class="caption">
					{sanitizeString(segment)}
				</span>
			{/if}
		{/each}
	</div>
</nav>

<style>
	.breadcrumb-path div {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		width: 100%;

		/* color schemes */

		/* defaults */
		--arrow-color: var(--accent-color);
		--text-color: var(--text-color-light);

		/* explicit */
		&.white-on-space {
			--arrow-color: var(--accent-color);
			--text-color: var(--text-color-light);
		}

		&.space-on-gray {
			--arrow-color: var(--secondary-color);
			--text-color: var(--text-color-dark);
		}

		&.white-on-cleanroom {
			--arrow-color: var(--background-color-dark);
			--text-color: var(--text-color-light);
		}

		/* Text colors */
		color: var(--text-color);

		.arrow {
			display: contents;
			/* Arrow colors */
			color: var(--arrow-color);
		}

		/* Truncate when too long, helps with REALLY large titles */
		span {
			flex-shrink: 1;
			min-width: 0;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		a:hover {
			text-decoration: underline;
			text-underline-offset: 0.125rem;
		}
	}
</style>
