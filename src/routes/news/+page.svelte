<script>
  import blackholeImage from "$lib/assets/images/blue-background.png?enhanced";
  import Hero from "$lib/components/Hero/Hero.svelte";
  import logo from "$lib/assets/logos/SRON_Academy_OnWhite.svg";
  import Breadcrumb from "$lib/components/Breadcrumb/Breadcrumb.svelte";
  import NewsCards from "$lib/components/NewsCards/NewsCards.svelte";
</script>
 

<Hero
  pageTitle="News"
  sronIcon={logo}
  background={{ alt: "", file: blackholeImage }}
/>
 
<Breadcrumb 
  /> 

<section class="paragraph-block">
  <div class="text-title">
    <h2 class="subtitle">Our latest <span class="orange">developments</span></h2>
    <p class="heading">Currently <span class="orange">12</span> available</p>
  </div>
  </section>
   
<NewsCards 
  /> 

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
 
    .text-content article {
      * + p {
        margin-top: 0.5rem;
        @media (min-width: 56.25rem) {
          padding-left: 1.5rem;
        }
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

    .heading{
      padding-bottom: 3rem;
    }
 
    .subtitle,.heading{
      color: var(--space-140);
      font-weight: 400;
    }

    .subtitle span {
      color: var(--cleanroom-140);
    }
  }

 
  /* util classes */
  .orange {
    color: var(--cleanroom-140);
  }
 
  :global(enhanced\:img) {
    width: auto;
  }

</style>