<!--
    Props: 
    - href           string - with href it renders an <a>, without it a <button>
    - text           (required) button text
    - variant        "primary-solid" "secondary-solid" "primary-outline" "secondary-outline"
    - onclick        function - for the <button>"
    - type           "button" "submit" "reset"
    - disables       bolean default false
    - icon
    -iconPosition
    - classes        string - extra classes
    - iconPosition  "before" "after" - default: "after"

    Examples:

    <Button href="/assignments" text="Bekijk opdrachten" variant="secondary-solid" iconPosition="before">
        {#snippet icon()}
            <ArrowRight />
        {/snippet}
    </Button>

    <Button text="Verstuur" type="submit" onclick={verstuur} iconPosition="after">
        {#snippet icon()}
            <ArrowRight />
        {/snippet}
    </Button>
-->

<script>
    let { href, text, variant = 'primary-solid', onclick, type="button", disabled = false ,icon, iconPosition = 'after', classes } = $props();
</script>

{#snippet content()}
    {#if icon && iconPosition === 'before'}{@render icon()}{/if}
    {text}
    {#if icon && iconPosition === 'after'}{@render icon()}{/if}
{/snippet}

{#if href && !disabled}
    <a href="{ href }" class={[ "button", variant, classes ]}>
        {@render content()}
    </a>
{:else}
    <button class={[ "button", variant, classes ]} { onclick } { type } { disabled } >
        {@render content()}
    </button>
{/if}


<style>
    .button{
        font-family: var(--font-body);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-xs) var(--spacing-sm);
        border: 0.1rem solid;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.05rem;
        font-size: var(--font-size-body-md);
        line-height: var(--line-height-relaxed);
        font-weight: 700;
      
        &:hover{
            cursor: pointer;
        }

        @media (prefers-reduced-motion: no-preference) {
            transition: all 0.5s ease-in-out, border-color 0s;
        }
    }
    .primary-solid{
        background-color: var(--color-brand-darkest);
        color: var(--color-accent-mid);
        border-color: var(--color-brand-darkest);

        &:hover,
        &:focus-visible {
            background-color: var(--color-accent-mid);
            color: var(--color-brand-darkest);
            border-color: var(--color-brand-darkest);
        }
        &:focus-visible {
            outline: 0.4rem solid hsl(var(--brand-h) var(--brand-s) var(--brand-dark-l) / 50%);
            outline-offset: 0;
        }
        &:active {
            background-color: var(--color-brand-darkest);
            color: var(--color-accent-mid);
        }
        &:disabled{
            background-color: var(--color-neutral-dark);
            color: var(--color-neutral-lighter);
            border-color: var(--color-neutral-dark);
            cursor: not-allowed;
        }
    }
    .secondary-solid {
        background-color: var(--color-accent-mid);
        color: var(--color-brand-darkest);
        border-color: var(--color-accent-darkest);

        &:hover {
            background-color: var(--color-accent-lighter);
        }
        &:focus-visible {
            outline: 0.4rem solid color-mix(in srgb, var(--color-accent-darker) 50%, transparent);
            outline-offset: 0;
        }
        &:active {
            background-color: var(--color-accent-mid);
        }
        &:disabled {
            background-color: var(--color-neutral-dark);
            color: var(--color-neutral-lighter);
            cursor: not-allowed;
            border-color: var(--color-neutral-dark);
        }
    }
    .primary-outline{
        background-color: inherit;
        color: var(--color-brand-darkest);
        border-color: var(--color-brand-darkest);

        &:hover,
        &:focus-visible {
            background-color: var(--color-brand-lightest);
            color: var(--color-brand-darkest);
            border-color: var(--color-brand-darkest);
        }
        &:focus-visible {
            outline: 0.4rem solid hsl(var(--brand-h) var(--brand-s) var(--brand-dark-l) / 50%);
            outline-offset: 0;
        }
        &:active {
            background-color: var(--color-brand-darkest);
            color: var(--color-accent-mid);
        }
         &:disabled{
            background-color: var(--color-neutral-lighter);
            color: var(--color-neutral-dark);
            border-color: var(--color-neutral-dark);
            cursor: not-allowed;
        }
    }
    .secondary-outline{
        background-color: inherit;
        color: var(--color-accent-dark);
        border-color: var(--color-accent-mid);

        &:hover {
            background-color: var(--color-accent-lightest);
        }
        &:focus-visible {
            outline: 0.4rem solid color-mix(in srgb, var(--color-accent-darker) 50%, transparent);
            outline-offset: 0;
        }
        &:active {
            background-color: var(--color-accent-mid);
        }
        &:disabled{
            background-color: var(--color-neutral-lighter);
            color: var(--color-neutral-dark);
            cursor: not-allowed;
            border-color: var(--color-neutral-dark);
        }
    }
</style>