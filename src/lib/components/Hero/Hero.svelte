<script>
  let {
    background = {
      alt: "default background image",
      file,
    },
    sronIcon,
    paragraph,
    sronIconPath = "defpath",
    pageTitle = "None set",
  } = $props();
</script>

<section class="hero">
  {#if paragraph}
    <p>{paragraph}</p>
  {/if}

  <enhanced:img
    src={background.file}
    alt={background.alt}
    class="hero-bg"
    sizes="100vw"
  />

  {#if sronIcon}
    <img src={sronIcon} alt="Logo of SRON Academy" class="hero-logo" />
  {/if}
  <h1>{pageTitle}</h1>
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

    > *:not(picture) + *:not(picture) {
      margin-top: 1rem;
    }

    :global(picture) {
      display: contents;

      enhanced\:img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        z-index: -1;
      }
    }

    .hero-logo{
      width: clamp(10rem, calc(25vw + 5rem), 60rem);
      max-width: 36.375rem;

    }
    border-bottom: .1875rem solid var(--cleanroom-100);
  }
</style>
