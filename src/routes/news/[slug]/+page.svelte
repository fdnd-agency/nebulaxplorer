
<script>
  import { Hero } from "$lib";
  import blackholeImage from "$lib/assets/images/blackhole2.jpg?enhanced";
  import logo from "$lib/assets/logos/SRON_Academy_OnWhite.svg";
  import Breadcrumb from "$lib/components/molecules/Breadcrumb/Breadcrumb.svelte";
  import placeholderImage from "$lib/assets/images/placeholder2.jpg";
  const { data } = $props();
  const { newsItem } = $derived(data);
</script>

<Hero
  pageTitle={newsItem?.title || "News"}
  sronIcon={logo}
  background={{ alt: newsItem?.title || "", file: blackholeImage }}
/>

<Breadcrumb />

<section class="paragraph-block">
  <div class="text-title">
    {#if newsItem?.Type || newsItem?.type || newsItem?.category}
      <span class="news-type">{newsItem.Type || newsItem.type || newsItem.category}</span>
    {/if}
    <h2 class="subtitle">{newsItem?.title || "Untitled"}</h2>
  </div>

  {#if newsItem?.image || newsItem?.image?.data}
    <picture>
      <img 
        src={newsItem.image?.data?.full_url || newsItem.image || placeholderImage} 
        alt={newsItem.title || "News image"} 
      />
    </picture>
  {/if}

  {#if newsItem?.content || newsItem?.body || newsItem?.description || newsItem?.text || newsItem?.article || newsItem?.content_html || newsItem?.content_markdown}
    <section class="text-content">
      <article>
        {#if newsItem?.content}
          {@html newsItem.content}
        {:else if newsItem?.body}
          {@html newsItem.body}
        {:else if newsItem?.description}
          {@html newsItem.description}
        {:else if newsItem?.text}
          {@html newsItem.text}
        {:else if newsItem?.article}
          {@html newsItem.article}
        {:else if newsItem?.content_html}
          {@html newsItem.content_html}
        {:else if newsItem?.content_markdown}
          {@html newsItem.content_markdown}
        {/if}
      </article>
    </section>
  {/if}
</section>

<style>
  :global(body) {
    background-color: var(--ultra-10); 
  }
  .paragraph-block {
    display: grid;
    grid-template-columns: subgrid;
    gap: inherit;
    row-gap: unset;
    margin-bottom: 1rem;
    > *:not(enhanced\:img, img, picture) {
      grid-column: 1 / -1;
      max-width: 43.75rem;
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
      :global(* + p) {
        margin-top: 0.5rem;
        line-height: 1.7;
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
    .subtitle {
      color: var(--space-140);
      font-weight: 400;
    }
    .news-type {
      display: inline-block;
      font-family: var(--heading);
      font-weight: 900;
      font-size: 1.2rem;
      color: var(--cleanroom-100);
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    .date {
      color: var(--space-140);
      font-size: 1rem;
      margin-top: 0.5rem;
    }
  }
</style>