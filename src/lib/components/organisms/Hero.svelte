<script>
  let { title, text, image } = $props();
</script>

<section class="hero" style="background-image: url('{image}')">
  <h1>{title}</h1>
  <p>{text}</p>
</section>

<style>
  .hero {
    background-image: url("src/lib/assets/images/hero-background-01.jpg");
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
