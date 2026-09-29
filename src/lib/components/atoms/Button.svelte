<script>
    let { variant = 'primary', text } = $props();
</script>
    
<button class="{ variant }">{ text }</button>

<style>
    button{
        text-transform: uppercase;
        font-family: var(--font-detail);
        font-weight: 500;
        padding: 0.7rem;
        letter-spacing: 0.05rem;
        font-size: var(--font-size-body-md);

        @media (prefers-reduced-motion: no-preference) {
            transition: all 0.5s ease-in-out;
        }
    }
    .primary{
        background-color: var(--color-brand-darkest);
        color: var(--color-accent-dark);
    }
    .secondary{
        background-color: var(--color-accent-dark);
        color: var(--color-brand-dark);
    }
</style>