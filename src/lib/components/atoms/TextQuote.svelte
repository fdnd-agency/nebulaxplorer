<script>
    let { variant = 'inline', author, source, children } = $props()
</script>


{#if variant === 'big'}
    <figure>
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
    <q class="inline-quote">{@render children?.()}</q>
{/if}

<style>
    blockquote {
        position: relative;
        text-align: left;
        font-size: 1.5em;
      
        font-weight: 500;
        line-height: 1.3;
        font-style: italic;
        padding-left: 1.5rem;
        
        &::before,
        &::after{
			font-size: 1.5em;
        }
        &::before{
            content: '“';
            position: absolute;
            color: var(--color-accent-mid);
            inset-block-start: 0;
            inset-inline-start: 0;
            line-height: 1;
        }
        &::after{
            content: '”';
            color: var(--color-accent-mid);
        }
    }
    figure{
        padding: var(--spacing-md);
        padding-inline-start: var(--spacing-lg);

        color: var(--color-neutral-lightest);
        background: var(--color-brand-darker);
        border-radius: 0px 0.2rem 0.2rem 0px;
        border-inline-start: 5px solid var(--color-accent-mid);
    }
    figcaption {
		color: var(--color-neutral-lighter);
		font-size: var(--font-size-body-sm);
        text-align: right;
	}
    .inline-quote {
        font-style: italic;

        &::before,
        &::after{
            font-size: 1.2em;
        }
        &::before{
            content: '“';
            color: var(--color-accent-mid);
        }
        &::after{
            content: '”';
            color: var(--color-accent-mid);
        }
    }
</style>