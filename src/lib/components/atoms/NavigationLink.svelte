<script>
    let { href, label, active = false, classes } = $props();
</script>

<a { href } class={[classes, { active }]} aria-current={ active ? "page" : undefined }>
    { label }
</a>

<style>
    a{
        display: inline-block;
        font-family: var(--font-heading);
        font-size: var(--font-size-body-sm);
        color: var(--color-neutral-lightest);
        text-decoration: none;

        @media (prefers-reduced-motion: no-preference) {
            transition: all 0.5s ease-in-out;
        }

        &:hover,
        &:focus-visible
        {
            color: var(--color-accent-mid);
            @media (prefers-reduced-motion: no-preference) {
                transform: translateY(0.25rem);
            }
        }
        &.active {
            color: var(--color-accent-mid);
            text-decoration: underline;
            text-underline-offset: var(--spacing-sm);
        }
    }
</style>