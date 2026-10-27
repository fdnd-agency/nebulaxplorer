<script>
    let { href = "#main", text = "skip to content"} = $props()
</script>

<a { href }>{ text }</a>

<style>
    a {
        position: absolute;
        left: 0;
        z-index: 999;
        top: var(--spacing-sm);
        background-color: var(--color-brand-darkest);
        color: var(--color-accent-mid); 
        padding: var(--spacing-lg);
        transform: translateX(-100%);

        @media (prefers-reduced-motion: no-preference) {
            transition: transform 0.3s ease-in-out;
        }

        &:focus-visible {
            transform: translateX(0%);
            filter: drop-shadow(0 0 0.75rem var(--color-brand-darkest));
        }
    }
</style>