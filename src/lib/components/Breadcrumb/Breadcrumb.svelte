<script>
  let {
    paragraph,
    pageTitle = "None set",
  } = $props();
</script>

<section class="breadcrumb">
  <h1 class="breadcrumb-words">
    <a href="/"><span class="breadcrumb-home"><u>home</u></span></a>
     <span class="orange"> > </span> <span class="thin">news</span></h1>
</section>

<style>
.breadcrumb {
    --menu-button-size: 3.75rem;
    position: relative;
    padding: 1rem;
    padding-top: 5.25rem;
    @media (min-width: 56.25rem) {
      padding: 0rem 4rem 0rem 4rem;
    }

    .breadcrumb-words {
      color: var(--space-140);
      font-weight: 400;
      }
    }

    .breadcrumb-home {
      font-weight: 500;
    }

    .breadcrumb-home:hover {
      color: var(--cleanroom-140);
      transition: 0.3s;
    }

     /* util classes */
  .orange {
    color: var(--cleanroom-140);
  }
  .thin {
    font-weight: 300;
  }
 

</style>

