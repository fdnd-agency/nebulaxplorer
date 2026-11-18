<script>
	let {
		exit = false,
		hidden = true,
		title = '',
		width = 24,
		height = 24,
	} = $props()
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
	<path
		d={exit
			? 'M6 2v4H2M10 2v4h4M14 10h-4v4M2 10h4v4'
			: 'M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4'}
	/>
</svg>
