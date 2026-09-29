<script>
    let { variant = 'primary', text, disabled = false } = $props();
</script>
    
<button class={ variant } disabled={disabled}>{ text }</button>

<style>
    button{
        padding: 0.7rem;
        letter-spacing: 0.05rem;
        font-size: var(--font-size-body-md);
        border: 0.1rem solid var(--color-brand-darkest);

        @media (prefers-reduced-motion: no-preference) {
            transition: all 0.5s ease-in-out;
        }
    }
    .primary{
        font-family: var(--font-detail);
        background-color: var(--color-brand-darkest);
        color: var(--color-accent-dark);
        font-weight: 500;
        text-transform: uppercase;

        &:hover{
            background-color: var(--color-accent-dark);
            color: var(--color-brand-dark);
        }
    }
    .secondary{
        font-family: var(--font-body);
        background-color: var(--color-accent-dark);
        color: var(--color-brand-dark);
        font-weight: 300;

        &:hover{
            background-color: var(--color-brand-darkest);
            color: var(--color-accent-dark);
        }
        &:disabled{
            background-color: var(--color-accent-lighter);
        }
    }
</style>