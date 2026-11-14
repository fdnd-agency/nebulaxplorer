<!--
    Props:
    - src            (required) enhanced image import (`?enhanced`), not a string path
    - alt            string - default = "" (decorative). Describe the image if it carries content
    - credit         string - shows "Image: {credit}" in a caption, no credit = no figcaption
    - creditPosition "top" "bottom" - default = "top"
    - label          string - badge in the top left corner, only shown when rounded = false
    - labelColor     "brand" "secondary" "accent" - default = "accent"
    - loading        "lazy" "eager" - default = "lazy"
    - sizes          string - default = "100vw"
    - rounded        boolean - default = true
    - ratio          "auto" "square" "landscape" "wide" - default = "auto"

    <Image src={foto} alt="X-ray reverberation" credit="NASA" ratio="wide" sizes="(min-width: 48rem) 50vw, 100vw" />
-->

<script>
    let { 
        src, 
        alt = "",
        credit = "",
        creditPosition = "top",
        loading = "lazy",
        sizes = "100vw",
        rounded = true,
        ratio = "auto",
        label = "",
        labelColor = "accent"
    } = $props();
</script>

<figure class={[ratio, { rounded }]}>
    <enhanced:img {src} {alt} {sizes} {loading}></enhanced:img>
    {#if credit}
        <figcaption class={creditPosition}>Image: {credit}</figcaption>
    {/if}
    {#if label && !rounded}
        <p class={["label", labelColor]}>{label}</p>
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
            padding: var(--spacing-xs) var(--spacing-sm);
            background: hsl(var(--neutral-h) var(--neutral-s) var(--neutral-darkest-l) / 0.75);
            color: var(--color-neutral-lightest);

            &.top {
                top: 0;
            }

            &.bottom {
                bottom: 0;
            }

            @media (prefers-reduced-transparency: reduce) {
                background: var(--color-neutral-darkest);
            }
        }
    }
    figure{
        .label{
            position: absolute;
            left: 0;
            top: 0;
            padding: var(--spacing-xs) var(--spacing-sm);
            letter-spacing: 0.05rem;
            font-family: var(--font-heading);
            font-size: var(--font-size-body-sm);

            &.brand {
                background: var(--color-brand-mid);
                color: var(--color-neutral-lightest);
            }

            &.secondary {
                background: var(--color-secondary-light);
                color: var(--color-neutral-darkest);
            }

            &.accent {
                background: var(--color-accent-mid);
                color: var(--color-brand-darkest);
            }
        }

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