<script>
    let { headingLevel = 2, theme = 'auto', children } = $props()
</script>

<svelte:element this={`h${headingLevel}`} class={['heading', theme]}>
    {@render children?.()}
</svelte:element>

<style>
    .heading {
        --heading-text: light-dark(var(--color-brand-darkest), var(--color-neutral-lightest));
        color: var(--heading-text);

        &.light { color-scheme: light; }
        &.dark { color-scheme: dark; }
    }
</style>