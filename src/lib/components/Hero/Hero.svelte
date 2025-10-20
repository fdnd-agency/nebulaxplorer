<script>
  let {
    background = {
      alt: "default background image",
      file,
    },
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

  <h1>{pageTitle}</h1>
</section>

<style>
  .hero {
    position: relative;

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
  }
</style>
