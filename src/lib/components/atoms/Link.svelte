<script>
    import ArrowRight from "./ArrowRight.svelte";
    let { href, classes, text} = $props()
</script>

<a { href } class={ classes }>
    { text }
    <ArrowRight />
</a>

<style>
    .een{
        color: var(--color-accent-darker);
        padding-bottom: 0.1em;
        text-decoration: transparent;
        display: inline-flex;
        border-bottom: 0.1rem solid transparent;
        text-transform: uppercase;
        gap: var(--spacing-md);
        font-family: var(--font-caption);
        align-items: center;
        font-size: var(--font-size-body-md);

        @media (prefers-reduced-motion: no-preference) {
            transition: all 0.5s ease-in-out;
        }
        
        &:hover{
            border-bottom-color: currentColor;
            gap: var(--spacing-lg);
            cursor: pointer;
        }
    }
    .twee{
        color: var(--color-accent-darker);
        padding-bottom: 0.1em;
        text-decoration: transparent;
        display: inline-flex;
        text-transform: uppercase;
        gap: var(--spacing-md);
        font-family: var(--font-caption);
        align-items: center;
        font-size: var(--font-size-body-md);

        @media (prefers-reduced-motion: no-preference) {
            transition: all 0.5s ease-in-out;
        }
        
        &:hover{
            gap: var(--spacing-lg);
            text-decoration: var(--color-accent-darker);
            text-decoration: underline;
            cursor: pointer;
        }
    }
</style>