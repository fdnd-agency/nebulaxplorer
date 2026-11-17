<script>
	let { 
        theme = 'auto', 
        children 
    } = $props()
</script>

<p class={['paragraph', theme]}>
	{@render children?.()}
</p>

<style>
	.paragraph {
		--paragraph-text: light-dark(
			var(--color-brand-darkest),
			var(--color-neutral-lightest)
		);
		color: var(--paragraph-text);

		&.light {
			color-scheme: light;
		}
		&.dark {
			color-scheme: dark;
		}
	}
</style>
