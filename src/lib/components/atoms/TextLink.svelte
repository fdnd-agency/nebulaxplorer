<script>
	let { href, children } = $props()
</script>

{#if href}
    <a {href}>
        {@render children?.()}
    </a>
{/if}

<style>
	a {
		color: var(--color-accent-mid);
        text-decoration: underline;
		text-decoration-color: transparent;
        text-underline-offset: 0.2rem;
        
		@media (prefers-reduced-motion: no-preference) {
			transition: text-decoration-color 0.5s ease-in-out;
		}
		&:hover,
		&:focus-visible {
			cursor: pointer;
            text-decoration: underline;
        }
	}
</style>
