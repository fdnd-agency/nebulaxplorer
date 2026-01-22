<script>
  // using props now instead of export to be consistent with other pages
  let { news = [] } = $props();

  import placeholderImage from "$lib/assets/images/placeholderzoomout.jpg?enhanced&w=1920;1440;1024;768";
  import logo from "$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg";


</script>


<ul class="news-grid">
  {#each news as NewsCard}
    <li class="news-card">
      <a href={"/news/${NewsCard.slug || NewsCard.id}"} class="news-card-link">
        <div class="news-image">
          {#if NewsCard.image}
            <picture class="news-image">
              <source type="image/webp"
                srcset="https://fdnd-agency.directus.app/assets/{NewsCard.image}?format=webp&w=300,
                        https://fdnd-agency.directus.app/assets/{NewsCard.image}?format=webp&w=600,
                        https://fdnd-agency.directus.app/assets/{NewsCard.image}?format=webp&w=900"
              />
              <img
                src="https://fdnd-agency.directus.app/assets/{NewsCard.image}?format=jpg&w=400&h=300"
                alt="{NewsCard.title}"
                width="400"
                height="300"
              />
            </picture>

          {:else}
            <enhanced:img
              src="{placeholderImage}"
              alt="{NewsCard.title}"
            />

          {/if}

        </div>
        <div class="news-info">
          <h3>
            {NewsCard.title || "Untitled"}
          </h3>
          {#if NewsCard.type || NewsCard.category}
            <p>
              {NewsCard.type || NewsCard.category}
            </p>
          {/if}
        </div>
      </a>
    </li>
  {/each}
</ul>

<style>
  .news-grid {
    grid-template-columns: repeat(1fr);
    display: grid;
    list-style: none;
    margin-bottom: 3rem;
  }

  @media (min-width: 700px) {
    .news-grid {
      gap: 2rem;

    }
  }

    @media (min-width: 650px) {
    .news-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1000px) {
    .news-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .news-card {
    background-color: var(--white);
    border-radius: 0.1875rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }
  .news-card:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  }

  .news-info {
    padding: 0.75rem;
    padding-bottom: 0;
    padding-bottom: 3rem;

    h3 {
      color: var(--ultra-140);
    }
    p {
      color: var(--cleanroom-100);
      padding: 0.5rem 0 0.5rem 0;
    }
  }



  .news-image {
    border-top: 0.3rem solid var(--space-140);
    width: 100%;
    height: 16.5rem;
    overflow: hidden;
    margin-top: auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
</style>
