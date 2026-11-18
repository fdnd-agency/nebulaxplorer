<script>
	let { 
        headingLevel = 2, 
        theme = 'auto', 
        subheading,
        subheadingPosition = 'above',
        children 
    } = $props()
</script>

{#snippet title()}
    <svelte:element this={`h${headingLevel}`} class={['heading', theme]}>
        {@render children?.()}
    </svelte:element>
{/snippet}

{#if subheading}
    <hgroup>
        {#if subheadingPosition === 'above'}
            <p class={['subheading', theme]}>{subheading}</p>
        {/if}

        {@render title()}

        {#if subheadingPosition === 'below'}
            <p class={['subheading', theme]}>{subheading}</p>
        {/if}
    </hgroup>
{:else}
    {@render title()}
{/if}

<style>
    hgroup {
        display: flex;
        flex-direction: column;
    }

    .heading,
    .subheading {
        &.light { color-scheme: light; }
        &.dark { color-scheme: dark; }
    }

	.heading {
		--heading-text: light-dark(
			var(--color-brand-darkest),
			var(--color-neutral-lightest)
		);
		color: var(--heading-text);
	}

    .subheading {
        --subheading-text: light-dark(var(--color-accent-dark), var(--color-accent-mid));
        color: var(--subheading-text);
        letter-spacing: 0.05em;
        font-family: var(--font-caption);
        text-transform: uppercase;
        font-size: 1em;
    }
</style>
