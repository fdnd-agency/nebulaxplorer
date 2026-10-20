<script>
</script>

<section class="hero">
  <div class="hero-wrapper">
    <h1>Mission</h1>
    <span>To the starts by the genius of youth</span>
  </div>
</section>

<style>
  .hero {
    background-image: url("src/lib/assets/images/hero-background-01.jpg");
    height: 50vh;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: rgb(0 0 0 / 50%);
    }
  }
</style>
