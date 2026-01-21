 <script>
  // Importing necessary components and assets
  import blackholeImage from "$lib/assets/images/blackhole2.jpg?enhanced";
  import logo from "$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg";
  import Breadcrumb from "$lib/components/molecules/Breadcrumb/Breadcrumb.svelte";
  import NewsCards from "$lib/components/NewsCards/NewsCards.svelte";
  import Heronews from "$lib/components/molecules/Hero/Heronews.svelte";

// using props to be consistent with Svelte runes
  const { data } = $props();
</script>

<Heronews pageTitle="News" sronIcon={logo} />

<Breadcrumb /> 

<section class="paragraph-block">
  <div class="text-title">
    <h2 class="subtitle">Our latest <span class="orange">developments</span></h2>
    <p class="heading">Currently <span class="orange">{data.news.length}</span> available</p>
  </div>
  </section>
   
<NewsCards news={data.news} /> 

<!-- Styles -->
<style>
 
  :global(body) {
    background-color: var(--ultra-10); 
  }

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
</style>