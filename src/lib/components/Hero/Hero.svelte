<script>
  let {
    background = {
      alt: "default background image",
      file,
    },
    sronIcon,
    paragraph,
    pageTitle = "None set",
  } = $props();
</script>

<section class="hero">
  {#if paragraph}
    <p class="subheading">{paragraph}</p>
  {/if}

  {#if background.file}
    <enhanced:img
      src={background.file}
      alt={background.alt}
      class="hero-bg"
      sizes="100vw"
    />
  {/if}

 {#if sronIcon}
    <img src={sronIcon} alt="Logo of SRON Academy" class="hero-logo" />
{/if}
  <h1 class="title">{pageTitle}</h1>
</section>

<style>
  .hero {
    --menu-button-size: 3.75rem;
    border-bottom: 0.1875rem solid var(--cleanroom-100);
    position: relative;
    padding: 1.5rem;
    padding-top: 5.25rem;
    @media (min-width: 56.25rem) {
      padding: 3.5rem 4rem 2.25rem 4rem;
    }

    /* every adjecent elem should have margin-top; except for the picture as that is the background image. */
    > *:not(picture) + *:not(picture) {
      margin-top: 1rem;
    }

    /* if a p is present the logo will correctly get margin-top */
    > p ~ img{
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

    .hero-logo {
      width: clamp(10rem, calc(25vw + 5rem), 60rem);
      max-width: 36.375rem;
      display: block;
    }

    .title {
      color: var(--space-140);
      font-weight: 400;
      }
    }

</style>
