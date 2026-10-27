<!--
    Props:
    - href       (required) where the link goes
    - text       (required) the link text
    - size       "sm"  "md"  "lg" 
    - color      string- CSS variable
    - bold       boolean - default = false
    - classes    string - extra classes
    - stretched  boolean - default = false
                 The parent needs `position: relative`.
    - ...rest    other attributes

    <Link href="/assignments" text="Bekijk alles" size="lg" color="var(--color-accent-light)" bold />
-->

<script>
    import ArrowRight from "./ArrowRight.svelte";
    let { href, classes, text, size, color="var(--color-neutral-darkest)", bold = false, stretched = false, ...rest} = $props()
</script>

<a { href } class={[classes, size, { bold, stretched }]} style="--link-color: { color };" { ...rest }>
    { text }
    <span class="icon-wrapper">
        <ArrowRight />
    </span>
</a>

<style>
    a{
        color: var(--link-color);
        padding-bottom: 0.1em;
        text-decoration: transparent;
        display: inline-flex;
        border-bottom: 0.1rem solid transparent;
        text-transform: uppercase;
        gap: var(--spacing-lg);
        font-family: var(--font-caption);
        align-items: center;
        transition: all 0.5s ease-in-out;

        .icon-wrapper {
            display: inline-flex;
            transform: translateX(calc(var(--spacing-md) - var(--spacing-lg)));

            @media (prefers-reduced-motion: no-preference) {
                transition: all 0.5s ease-in-out;
            }
        }

        &:hover{
            border-bottom-color: currentColor;
            cursor: pointer;
        }
        &:hover .icon-wrapper {
            transform: translateX(0);
        }

        &.sm { font-size: var(--font-size-body-sm);}
        &.md { font-size: var(--font-size-body-md);}
        &.lg { font-size: var(--font-size-body-lg);}

        &.bold{ font-weight: bold;}

        &.stretched::after {
            content: "";
            position: absolute;
            inset: 0;
        }
    }

</style>