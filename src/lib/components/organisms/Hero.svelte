<script>
  import imageFallback from "$lib/assets/images/hero-background-01.jpg";

  let { title, text, image } = $props();
  let backgroundImage = $derived(image || imageFallback);
</script>

<section class="hero" style:background-image="url('{backgroundImage}')">
  <h1>{title}</h1>
  <p>{text}</p>
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
