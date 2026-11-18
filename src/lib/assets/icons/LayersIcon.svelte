<script>
	let { hidden = true, title = '', width = 24, height = 24 } = $props()
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 16 16"
	{width}
	{height}
	aria-hidden={hidden}
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="square"
>
	{#if title}<title>{title}</title>{/if}
	<path d="M2 5l6-3 6 3-6 3zM2 8l6 3 6-3M2 11l6 3 6-3" />
</svg>
