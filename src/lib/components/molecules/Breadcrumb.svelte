<script>
	import { page } from '$app/stores'
	import { Arrow, sanitizeString } from '$lib'

	// Split the path into segments and filter out empty strings
	const pathSegments = $page.url.pathname
		.split('/')
		.filter((segment) => segment !== '')

	const { contrast = 'white-on-space' } = $props()
</script>

<nav class={`breadcrumb-path ${contrast}`}>
	<a href="/" class="crumb subheading">home</a>
	{#each pathSegments as segment, index}
		<span class="arrow">
			<Arrow />
		</span>
		{#if index + 1 < pathSegments.length}
			<a
				href={'/' + pathSegments.slice(0, index + 1).join('/')}
				class="crumb subheading">
				{sanitizeString(segment)}
			</a>
		{:else}
			<span class="caption">
				{sanitizeString(segment)}
			</span>
		{/if}
	{/each}
</nav>

<style>
	nav.breadcrumb-path {
		display: inline-flex;
		gap: 0.75rem;
		align-items: center;
		width: 100%;
		max-width: var(--content-width);
		margin-inline: auto;
		padding: 0;

		/* color schemes */

		/* defaults */
		--arrow-color: var(--cleanroom-100);
		--text-color: var(--white);

		/* explicit */
		&.white-on-space {
			--arrow-color: var(--cleanroom-100);
			--text-color: var(--white);
		}

		&.space-on-gray {
			--arrow-color: var(--ultra-100);
			--text-color: var(--space-100);
		}

		&.white-on-cleanroom {
			--arrow-color: var(--space-100);
			--text-color: var(--white);
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
