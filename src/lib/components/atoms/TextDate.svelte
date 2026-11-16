<script>
	let { date, theme = 'auto', children } = $props()
</script>

<time datetime={date} class={['date', theme]}>
	{@render children?.()}
</time>

<style>
	.date {
        font-style: italic;
		font-size: var(--font-size-body-sm);
		color: light-dark(var(--color-brand-dark), var(--color-neutral-light));

		&.light { color-scheme: light; }
		&.dark { color-scheme: dark; }
	}
</style>