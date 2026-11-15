<script>
	let { theme = 'auto', children } = $props()
</script>

<span class={['accent', theme]}>{@render children?.()}</span>

<style>
	.accent {
		--accent-color: light-dark(var(--color-accent-dark), var(--color-accent-mid));
		color: var(--accent-color);

		&.light { color-scheme: light; }
		&.dark { color-scheme: dark; }
	}
</style>