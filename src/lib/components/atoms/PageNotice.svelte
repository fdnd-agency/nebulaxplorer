<script>
	let {
		children,
		...attributes
	} = $props()
</script>

<p class="page-notice" {...attributes}>
	{@render children()}
</p>

<style>
	.page-notice {
		padding: var(--spacing-md) var(--spacing-lg);
		color: var(--color-brand-darkest);
		background: var(--color-accent-mid);
		font-family: var(--font-body);
		font-size: var(--font-size-body-sm);
		font-weight: 500;
		line-height: var(--line-height-normal);
	}
</style>
