<script> 
// using props now instead of export to be consistent with other pages
	let { news = [] } = $props();
  
  import placeholderImage from "$lib/assets/images/placeholder2.jpg";
</script>


<ul class="news-grid">
{#each news as NewsCard}
  <li class="news-card">
  <a
  href={'/news/' + (NewsCard.slug)}
  class="news-card-link"
  >
  <div class="news-image">
  <img src={`https://fdnd-agency.directus.app/assets/${NewsCard.image}`}
  alt="{NewsCard.title}">
  
  </div>
  
  <div class="news-info">
  <span class="news-label"></span>
  <h3>{NewsCard.title || "Untitled"}</h3>
  <span class="news-label"></span>
  {#if NewsCard.type || NewsCard.category}
  <p>{NewsCard.type || NewsCard.category}</p>
  {/if}
  </div>
  </a>
  </li>
{/each}

</ul>


<style>

  .news-grid{
    display: grid;
    list-style: none;
}

@media (min-width: 700px) {
.news-grid{
    grid-template-columns: repeat(2fr);
    grid-template-rows: repeat(3fr);
}
}

@media (min-width: 1000px) {
.news-grid{
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
}
}

.news-card{

    background-color: var(--white);
    border-radius: 4px;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding-bottom: 3rem;
}
    .news-card:hover {
      transform: translateY(-0.5rem);
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    }


.news-info{
    padding: .75rem;
    padding-bottom: 0;

   h3{

    color: var(--ultra-140);
   }
   p{
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