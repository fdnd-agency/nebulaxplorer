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
        --l-bg: var(--brand-darkest-l);
        --l-text: var(--accent-dark-l);

        font-family: var(--font-detail);
        background-color: hsl(var(--brand-h), var(--brand-s), var(--l-bg));
        color: hsl(var(--accent-h), var(--accent-s), var(--l-text));
        font-weight: 500;
        text-transform: uppercase;
        border-color: var(--color-brand-darkest);

        &:hover {
         
        }
        &:focus-visible {
       
        }
        &:active {
        
        }
        &:disabled {
          
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
           
        }
        &:focus-visible {
        
        }
        &:active {
          
        }
        &:disabled {
        
        }
    }
</style>