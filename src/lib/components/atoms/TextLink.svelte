<script>
	let { 
		href, 
		theme = 'auto', 
		children 
	} = $props()
</script>

{#if href}
	<a {href} class={['link', theme]}>
		{@render children?.()}
	</a>
{/if}

<style>
	.link {
		--link-color: light-dark(
			var(--color-accent-darker),
			var(--color-accent-mid)
		);
		color: var(--link-color);
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 0.2rem;

		@media (prefers-reduced-motion: no-preference) {
			transition: text-decoration-color 0.5s ease-in-out;
		}
		&:hover,
		&:focus-visible {
			cursor: pointer;
			text-decoration-color: currentColor;
		}
		&.light {
			color-scheme: light;
		}
		&.dark {
			color-scheme: dark;
		}
	}
</style>
