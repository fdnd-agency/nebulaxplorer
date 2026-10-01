<script>
    let { variant = 'primary', text, disabled = false } = $props();
</script>
    
<button class={ variant } disabled={disabled}>{ text }</button>

<style>
    button{
        padding: 0.7rem;
        letter-spacing: 0.05rem;
        font-size: var(--font-size-body-md);
        border: 0.15rem solid;
        &:hover{
            cursor: pointer;
        }

        @media (prefers-reduced-motion: no-preference) {
            transition: all 0.5s ease-in-out;
        }
    }
    .primary{
        font-family: var(--font-detail);
        background-color: hsl(var(--brand-h), var(--brand-s), var(--brand-darkest-l));
        color: hsl(var(--accent-h), var(--accent-s), var(--accent-dark-l));
        font-weight: 500;
        text-transform: uppercase;
        border-color: var(--color-brand-darkest);

        &:hover {
            background-color: hsl(var(--accent-h), var(--accent-s), var(--accent-dark-l));
            color: hsl(var(--brand-h), var(--brand-s), var(--brand-darkest-l));
        }
        &:focus-visible {
            outline: 0.4rem solid hsl(var(--accent-h), var(--accent-s), var(--accent-darker-l));
            outline-offset: 0;
        }
        &:active {
            background-color: hsl(var(--brand-h), var(--brand-s), var(--brand-darkest-l));
            color: hsl(var(--accent-h), var(--accent-s), var(--accent-dark-l));
        }
    }
    .secondary{
        --l-bg: var(--accent-dark-l);
        --l-text: var(--brand-darkest-l);

        font-family: var(--font-body);
        background-color: hsl(var(--accent-h), var(--accent-s), var(--l-bg));
        color: hsl(var(--brand-h), var(--brand-s), var(--l-text));
        font-weight: 300;
        border-color: var(--color-accent-darkest);

        &:hover {
           --l-bg: var(--accent-light-l);
        }
        &:focus-visible {
            outline: 0.4rem solid hsl(var(--accent-h), var(--accent-s), var(--accent-darker-l));
            outline-offset: 0;
        }
        &:active {
            --l-bg: var(--accent-dark-l);
        }
        &:disabled {
            --l-bg: var(--accent-darker-l);
        }
    }
</style>