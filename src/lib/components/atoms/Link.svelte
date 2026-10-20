<!--
    Props:
    - href    (required) where the link goes
    - text    (required) the link text
    - size    "sm"  "md"  "lg" 
    - color    string- CSS variable
    - bold     boolean - default: false
    - classes  string - extra classes

    <Link href="/assignments" text="Bekijk alles" size="lg" color="var(--color-accent-light)" bold />
-->

<script>
    import ArrowRight from "./ArrowRight.svelte";
    let { href, classes, text, size, color="var(--color-neutral-darkest)", bold = false} = $props()
</script>

<a { href } class={[classes, size, { bold }]} style="--link-color: {color};">
    { text }
    <ArrowRight />
</a>

<style>
    a{
        color: var(--link-color);
        padding-bottom: 0.1em;
        text-decoration: transparent;
        display: inline-flex;
        border-bottom: 0.1rem solid transparent;
        text-transform: uppercase;
        gap: var(--spacing-md);
        font-family: var(--font-caption);
        align-items: center;

        @media (prefers-reduced-motion: no-preference) {
            transition: all 0.5s ease-in-out;
        }
        
        &:hover{
            border-bottom-color: currentColor;
            gap: var(--spacing-lg);
            cursor: pointer;
        }

        &.sm { font-size: var(--font-size-body-sm);}
        &.md { font-size: var(--font-size-body-md);}
        &.lg { font-size: var(--font-size-body-lg);}

        &.bold{ font-weight: bold;}
    }

</style>