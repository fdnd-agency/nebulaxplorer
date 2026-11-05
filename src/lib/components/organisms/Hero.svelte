<script>
  import imageFallback from "$lib/assets/images/hero-background-01.jpg";

  let { title, text, image, alt = "" } = $props();
  let backgroundImage = $derived(image || imageFallback);
</script>

<section class="hero">
  <img src={backgroundImage} {alt} />
  <div>
    <h1>{title}</h1>
    {#if text}
      <p>{text}</p>
    {/if}
  </div>
</section>

<style>
  .hero {
    background-size: cover;
    background-position: 25% 75%;
    height: 50vh;
    position: relative;
    padding-left: var(--spacing-md);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-xs);

    @media (min-width: 768px) {
      gap: var(--spacing-2xl);
    }

    h1,
    p {
      position: relative;
      color: var(--color-neutral-lightest);
    }

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: rgb(0 0 0 / 50%);
    }
  }
</style>
