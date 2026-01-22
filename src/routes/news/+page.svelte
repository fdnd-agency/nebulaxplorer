 <script>
  // Importing necessary components and assets
  import logo from "$lib/assets/logos/SRON_Academy_OnWhite.svg";
  import Breadcrumb from "$lib/components/molecules/Breadcrumb/Breadcrumb.svelte";
  import NewsCards from "$lib/components/NewsCards/NewsCards.svelte";

// using props to be consistent with Svelte runes
  const { data } = $props();
</script>

<svelte:head>
  <style>
  
    body {
      background-color: var(--ultra-10);
    }

  </style>
</svelte:head>

<section class="hero">

  <img src={logo} alt="Logo of SRON Academy" class="hero-logo" />

  <h1 class="title">
    News
  </h1>
</section>

<Breadcrumb contrast="space-on-gray" /> 

<section class="paragraph-block">
  <div class="text-title">
    <h2 class="subtitle">Our latest <span class="orange">developments</span></h2>
    <p class="heading">Currently <span class="orange">{data.news.length}</span> available</p>
  </div>
  </section>
   
<!-- <NewsCards news={data.news} /> -->

<!-- Styles -->

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
        color: var(--space-140)
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

   .hero {
    --menu-button-size: 3.75rem;
    position: relative;
    padding: 1.5rem;
    padding-top: 5.25rem;
    @media (min-width: 56.25rem) {
      padding: 3.5rem 4rem 2.25rem 4rem;
      color: var(--space-140);
    }

    .hero-logo {
      width: clamp(10rem, calc(25vw + 5rem), 60rem);
      max-width: 36.375rem;
      display: block;
    }
  }
</style>