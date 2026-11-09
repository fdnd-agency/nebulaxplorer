<script>
  let { label = "Read more", hiddenLabel = "", children } = $props();
</script>

<details>
  <summary>
    {label}
    {#if hiddenLabel}
      <span class="visually-hidden">{hiddenLabel}</span>
    {/if}
  </summary>
  <div class="content">
    {@render children()}
  </div>
</details>

<style>
  details {
    padding-top: var(--spacing-md);

    div {
      color: var(--color-neutral-light);
    }

    &[open] summary::after {
      transform: rotate(45deg);
    }
  }

  summary {
    border-bottom: 1px solid var(--color-neutral-lightest);
    cursor: pointer;
    position: relative;
    list-style: none;
    padding-bottom: var(--spacing-sm);

    &::after {
      content: "+";
      position: absolute;
      right: 0;
      transform-origin: center;

      @media (prefers-reduced-motion: no-preference) {
        transition: 0.3s linear;
      }
    }
  }

  .content {
    padding-top: var(--spacing-md);
  }
</style>
