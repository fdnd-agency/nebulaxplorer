<script>

  const {
    paragraph,
    pageTitle = "None set",
    titleColor,
  } = $props();

</script>

<section class="hero">
  {#if paragraph}
    <p class="subheading">{paragraph}</p>
  {/if}

    <img src="../src/lib/assets/logos/SRON_Academy_OnWhite.svg" alt="Logo of SRON Academy" class="hero-logo" />

  <h1 class="title" style={titleColor ? `color: ${titleColor}` : 'color: var(--space-140)'}>
    {pageTitle}
  </h1>
</section>

<style>
  .hero {
    --menu-button-size: 3.75rem;
    position: relative;
    padding: 1.5rem;
    padding-top: 5.25rem;
    @media (min-width: 56.25rem) {
      padding: 3.5rem 4rem 2.25rem 4rem;
    }

    .hero-logo {
      width: clamp(10rem, calc(25vw + 5rem), 60rem);
      max-width: 36.375rem;
      display: block;
    }
  }
</style>
