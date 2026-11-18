<script>
	let { hidden = true, title = '', width = 24, height = 24 } = $props()
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 16 16"
	{width}
	{height}
	aria-hidden={hidden}
	fill="currentColor"
>
	{#if title}<title>{title}</title>{/if}
	<path d="M5 3l8 5-8 5z" />
</svg>
