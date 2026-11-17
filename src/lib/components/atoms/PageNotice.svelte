<script>
	let { children, ...attributes } = $props()
</script>

<p class="page-notice" {...attributes}>
	{@render children()}
</p>
