<!--
    Props: 
    - href      string - with href it renders an <a>, without it a <button>
    - text      (required) the link text
    - variant   "primary" "secondary"
    - onclick   function - for the <button>"
    - type      "button" "submit" "reset"
    - disables  bolean default false
    - classes   string - extra classes
-->

<script>
    let { href, text, variant = 'primary', onclick, type="button", disabled = false , classes } = $props();
</script>

  {#if href && !disabled}
    <a href="{ href }" class={[ "button", variant, classes ]}>{ text }</a>
{:else}
    <button class={[ "button", variant, classes ]} { onclick } { type } { disabled } >{ text }</button>
{/if}


<style>
    .button{
        font-family: var(--font-detail);
        display: inline-block;
        text-align: center;
        text-decoration: none;
        padding: 0.7rem;
        letter-spacing: 0.05rem;
        text-transform: uppercase;
        border: 0.15rem solid;
        font-size: var(--font-size-body-sm);
      
        &:hover{
            cursor: pointer;
        }

        @media (prefers-reduced-motion: no-preference) {
            transition: all 0.5s ease-in-out;
        }
    }
    .primary{
        background-color: var(--color-brand-darkest);
        color: var(--color-accent-dark);
        font-weight: 700;
        border-color: var(--color-brand-darkest);

        &:hover {
            background-color: var(--color-accent-dark);
            color: var(--color-brand-darkest);
        }
        &:focus-visible {
            outline: 0.4rem solid hsl(var(--brand-h) var(--brand-s) var(--brand-dark-l) / 50%);
            outline-offset: 0;
        }
        &:active {
            background-color: var(--color-brand-darkest);
            color: var(--color-accent-dark);
        }
        &:disabled{
            background-color: var(--color-neutral-dark);
            color: var(--color-accent-darkest);
            border-color: var(--color-neutral-dark);
            cursor: not-allowed;
        }
    }
    .secondary{
        --l-bg: var(--accent-dark-l);
        --l-text: var(--brand-darkest-l);

        background-color: hsl(var(--accent-h), var(--accent-s), var(--l-bg));
        color: hsl(var(--brand-h), var(--brand-s), var(--l-text));
        font-weight: 700;
        border-color: var(--color-accent-darkest);

        &:hover {
           --l-bg: var(--accent-light-l);
        }
        &:focus-visible {
            outline: 0.4rem solid hsl(var(--accent-h) var(--accent-s) var(--accent-darker-l) / 50%);
            outline-offset: 0;
        }
        &:active {
            --l-bg: var(--accent-dark-l);
        }
        &:disabled {
            --l-bg: var(--accent-darker-l);
            cursor: not-allowed;
        }
    }
</style>