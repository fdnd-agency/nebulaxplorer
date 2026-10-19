<script>
</script>

<section class="hero">
  <h1>Mission</h1>
  <span>To the starts by the genius of youth</span>
</section>

<style>
  .hero {
    background-image: url("src/lib/assets/images/hero-background-01.jpg");
    max-height: 50vh;

    position: relative;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: rgb(0 0 0 / 50%);
    }

    h1,
    span {
      position: relative;
      color: var(--color-neutral-lightest);
  }
</style>
