<script>
	let {
		variant = 'inline',
		theme = 'auto',
		author,
		source,
		children,
	} = $props()
</script>

{#if variant === 'big'}
	<figure class={['quote', theme]}>
		<blockquote>
			{@render children?.()}
		</blockquote>
		{#if author}
			<figcaption>
				- {author}{#if source}, <cite>{source}</cite>{/if}
			</figcaption>
		{/if}
	</figure>
{:else}
	<q class={['quote', 'inline-quote', theme]}>{@render children?.()}</q>
{/if}

<style>
	.quote {
		--quote-bg: light-dark(
			var(--color-brand-darker),
			var(--color-neutral-lighter)
		);
		--quote-text: light-dark(
			var(--color-neutral-lightest),
			var(--color-brand-darkest)
		);
		--quote-caption: light-dark(
			var(--color-neutral-light),
			var(--color-brand-dark)
		);
		--quote-accent: light-dark(
			var(--color-accent-mid),
			var(--color-accent-dark)
		);

		&.light {
			color-scheme: light;
		}
		&.dark {
			color-scheme: dark;
		}
	}
	.inline-quote,
	blockquote {
		quotes: '“' '”' '‘' '’';
		&::before,
		&::after {
			color: var(--quote-accent);
		}
		&::before {
			content: open-quote;
		}
		&::after {
			content: close-quote;
		}
	}
	blockquote {
		position: relative;
		text-align: left;
		font-size: 1.2em;

		font-weight: 500;
		line-height: 1.3;
		font-style: italic;
		padding-left: 1.5rem;
		color: var(--quote-text);
		&::before,
		&::after {
			font-size: 1.5em;
		}
		&::before {
			position: absolute;
			inset-block-start: 0;
			inset-inline-start: 0;
			line-height: 1;
		}
	}
	figure {
		padding: var(--spacing-md);
		padding-inline-start: var(--spacing-lg);
		color: var(--quote-text);
		background: var(--quote-bg);

		border-radius: 0px 0.2rem 0.2rem 0px;
		border-inline-start: 5px solid var(--quote-accent);
	}
	figcaption {
		color: var(--quote-caption);
		font-size: var(--font-size-body-sm);
		text-align: right;
	}
	.inline-quote {
		color: var(--quote-text);
		font-style: italic;

		&::before,
		&::after {
			font-size: 1.2em;
		}
	}
</style>
