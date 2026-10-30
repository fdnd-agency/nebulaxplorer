<script>
    let { hidden = true, title = '', width = 24, height =24 } = $props();
</script>

<svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="currentColor"
    viewBox="0 0 15 15"
    {width}
    {height}
    aria-hidden={hidden}
>
    {#if title}<title>{title}</title>{/if}
    <path fill="currentColor" d="m14.768 5.226-.021.1a.7.7 0 0 1-.211.372l-.082.081-4.32 4.32a.73.73 0 0 1-.6.226.72.72 0 0 1-.626-.476.72.72 0 0 1 .186-.8q1.392-1.4 2.788-2.789l.362-.361H.753a.74.74 0 0 1-.739-.61.737.737 0 0 1 .59-.852 1 1 0 0 1 .179-.014h11.458l-.036-.038-3.113-3.111a.75.75 0 0 1-.226-.447.74.74 0 0 1 .4-.749.7.7 0 0 1 .236-.074l.016-.007h.173l.012.007a.75.75 0 0 1 .439.225l4.319 4.319.08.079a.7.7 0 0 1 .211.372l.021.1Z" data-name="Path 447"/>
</svg>