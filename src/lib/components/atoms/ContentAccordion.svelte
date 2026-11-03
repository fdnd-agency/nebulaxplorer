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
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  details {
    padding-top: var(--spacing-md);

    &[open] summary::after {
      transform: rotate(45deg);
    }
  }

  summary {
    border-top: 1px solid var(--color-neutral-lightest);
    cursor: pointer;
    position: relative;
    list-style: none;
    padding-top: var(--spacing-sm);

    &::after {
      content: "+";
      position: absolute;
      right: 0;
      transform-origin: center;
      transition: 0.3s linear;
    }
  }

  .content {
    padding-top: var(--spacing-md);
  }
</style>
