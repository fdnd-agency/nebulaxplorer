<script>
	let { children } = $props()
</script>

<span>{@render children?.()}</span>

<style>
	span {
		color: var(--color-accent-mid);
	}
</style>