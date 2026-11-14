<script>
    let { 
        src, 
        alt = "",
        credit = "",
        loading = "lazy",
        sizes = "100vw",
        rounded = true,
        ratio = "auto"
    } = $props();
</script>

<figure class={[ratio, { rounded }]}>
    <enhanced:img {src} {alt} {sizes} {loading}></enhanced:img>
    {#if credit}
        <figcaption>Image: {credit}</figcaption>
    {/if}
</figure>

<style>
    figure{
        position: relative;
        overflow: hidden;

        img{
            display: block;
            width: 100%;
            height: auto;
            object-fit: cover;
        }
        figcaption {
            position: absolute;
            right: 0;
            top: 0;
            padding: var(--spacing-xs) var(--spacing-sm);
            background: hsl(var(--neutral-h) var(--neutral-s) var(--neutral-darkest-l) / 0.75);
            color: var(--color-neutral-lightest);
            @media (prefers-reduced-transparency: reduce) {
                background: var(--color-neutral-darkest);
            }
        }
    }
    figure{
        &.rounded img {
            border-radius: var(--border-radius-brand);
        }

        &.square img {
            aspect-ratio: 1 / 1;
        }

        &.landscape img {
            aspect-ratio: 4 / 3;
        }

        &.wide img {
            aspect-ratio: 16 / 9;
        }
    }
</style>