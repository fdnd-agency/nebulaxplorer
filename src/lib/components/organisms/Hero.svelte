<script>
  import imageFallback from "$lib/assets/images/hero-background-01.jpg?enhanced";

  let { title, text, image, alt = "" } = $props();
  let backgroundImage = $derived(image || imageFallback);
</script>

<section class="hero">
  <enhanced:img
    src={backgroundImage}
    {alt}
    sizes="100vw"
    fetchpriority="high"
  />
  <div>
    <h1>{title}</h1>
    {#if text}
      <p>{text}</p>
    {/if}
  </div>
</section>

<style>
  .hero {
    min-height: 35svh;
    position: relative;
    display: flex;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: var(--spacing-xs);
      padding-left: var(--spacing-md);

      @media (min-width: 768px) {
        gap: var(--spacing-2xl);
        padding-left: var(--spacing-xl);
      }
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: bottom;
      z-index: -2;
    }

    &::after {
      content: "";
      position: absolute;
      background-color: rgb(0 0 0 / 50%);
      z-index: -1;
      inset: 0;
    }
  }
</style>
