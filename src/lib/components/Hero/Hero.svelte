<script>
  let {
    background = {
      alt: "default background image",
      path: "defpath",
    },
    paragraph,
    sronIconPath = "defpath",
    pageTitle = "None set"
  } = $props();
</script>

<section class="hero">
  {#if paragraph}
    <p>{paragraph}</p>
  {/if}
  <img src={background.path} alt={background.alt} class="hero-bg" />
  <img src={sronIconPath} alt="" class="hero-bg" />
  <h1>{pageTitle}</h1>
</section>
