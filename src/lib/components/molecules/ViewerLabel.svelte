<script>
	let {
		hidden,
		number,
		name,
		tag,
	} = $props()
</script>

<p class="viewer-label" aria-hidden="true" {hidden}>
	<span class="viewer-label-number">{number}</span>
	<span class="viewer-label-name">{name}</span>
	<span class="viewer-tag" hidden={!tag}>{tag}</span>
</p>

<style>
	/* The selected item, top left of the 3D view */
	.viewer-label {
		position: absolute;
		top: var(--spacing-lg);
		left: var(--spacing-xl);
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--spacing-sm);
		max-width: calc(100cqi - 2 * var(--spacing-xl));
		color: var(--color-neutral-lightest);
		line-height: var(--line-height-normal);
		pointer-events: none;

		/* On a phone the sheet's peek row shows it */
		@container satellite (width < 720px) {
			display: none;
		}
	}

	.viewer-label-number {
		color: var(--color-accent-mid);
		font-family: var(--font-caption);
		font-size: var(--font-size-body-sm);
	}

	.viewer-label-name {
		font-family: var(--font-heading);
		font-size: var(--font-size-body-sm);
		font-weight: 500;
	}

	.viewer-tag {
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--color-brand-mid);
		font-family: var(--font-body);
		font-size: var(--font-size-body-sm);
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
</style>
