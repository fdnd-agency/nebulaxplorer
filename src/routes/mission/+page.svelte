<script>
  import blackholeImage from "$lib/assets/blackhole.jpg?enhanced";
  import Hero from "$lib/components/Hero/Hero.svelte";
  import logo from "$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg";
  import Paragraph from "$lib/components/Paragraph/Paragraph.svelte";
</script>

<Hero
  pageTitle="Mission"
  sronIcon={logo}
  background={{ alt: "", file: blackholeImage }}
/>

<section class="paragraph-block">
  <div class="text-title">
    <h2 class="subtitle">What are we <span class="orange">up</span> to?</h2>
    <p class="heading">What our current project entails</p>
  </div>
  
  <img src={blackholeImage} alt="Black Hole" width="630px" />
</section>

<Paragraph />

<style>
  .paragraph-block {
    display: grid;
    grid-template-columns: subgrid;
    gap: inherit;
    row-gap: unset;

    > *:not(enhanced\:img, img, picture) {
      grid-column: 1 / -1;
      max-width: 43.75rem;
      padding-left: none;

      @media (min-width: 36.25rem) {
        grid-column: 1 / 4;
        padding-right: 1.5rem;
      }
      @media (min-width: 56.25rem) {
        padding-left: 2.5rem;
        grid-column: 1 / 8;
      }
    }

    .text-title {
      * + * {
        margin-top: 0.5rem;
      }
    }

    :global(.text-content) {
      * + p {
        margin-top: 0.5rem;
        @media (min-width: 56.25rem) {
          padding-left: 1.5rem;
        }
      }

      * + p {
        margin-top: 2rem;
      }
    }

    :global(.text-content),
    :global(picture) {
      margin-top: 3rem;
    }

    :global(picture) {
      grid-column: 4 / -1;
      height: fit-content;

      display: none;

      @media (min-width: 36.25rem) {
        display: block;
      }

      @media (min-width: 56.25rem) {
        grid-column: 8 / -1;
      }

      :global(enhanced\:img),
      :global(img) {
        width: 100%;
        object-fit: cover;
        max-height: 22.8125rem;
      }
    }

    .subtitle span {
      color: var(--cleanroom-100);
    }
  }

  /* util classes */
  .orange {
    color: var(--cleanroom-100);
  }

  :global(enhanced\:img) {
    width: auto;
  }
</style>
