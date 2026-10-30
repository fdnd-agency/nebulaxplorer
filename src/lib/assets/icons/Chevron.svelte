<script>
    let { hidden = true, title = '', width = 24, height =24 } = $props();
</script>

<svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="currentColor"
    viewBox="0 0 8.374 14.734"
    {width}
    {height}
    aria-hidden={hidden}
>
    {#if title}<title>{title}</title>{/if}
    <path d="M.294.294a1 1 0 0 1 1.421 0L8.08 6.658a1 1 0 0 1 0 1.421l-6.364 6.365a1.005 1.005 0 0 1-1.422-1.421l5.654-5.654L.294 1.715a1 1 0 0 1 0-1.421" data-name="Path 520"></path>
</svg>

