<script>
    let { headingLevel = 2, theme = 'dark', children } = $props()
</script>

<svelte:element this={`h${headingLevel}`} class={['heading', theme]}>
    {@render children?.()}
</svelte:element>

<style>
    .heading {
		& :global(span) {
			color: var(--color-accent-mid);
		}
	}
    .light {
		color: var(--color-brand-darkest);
	}

    .dark {
        color: var(--color-neutral-lightest);
    }

</style>