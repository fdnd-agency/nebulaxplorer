<script>
  import scientificImage from "$lib/assets/images/WerkenbijSRON.jpg";
  let { data } = $props();

</script>

<section class="grid-wrapper">
<ul class="scientific-grid">

  {#each data.scientific as scientificcard}
  <li class="scientific-card">
    <div class="scientific-image">
      <img src={scientificImage} alt="{scientificcard.title}">
    </div>
    <div class="scientific-info">
      <span class="scientific-label"></span>
      <h3>{scientificcard.title}</h3>
      <span class="scientific-label"></span>
      <p>{scientificcard.content}</p>
    </div>
  </li>
  {/each}

</ul>
</section>

<style>

.grid-wrapper{
  display: inherit;

  .scientific-grid{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    padding-bottom: 6rem;
    padding-left: 0;
    list-style: none;
}

@media (min-width: 700px) {
.scientific-grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 2rem;
    padding-bottom: 6rem;
    list-style: none;
}
}

@media (min-width: 1000px) {
.scientific-grid{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 2rem;
    row-gap: 4rem;
    padding-bottom: 6rem;
    padding-left: 4rem;
    padding-right: 4rem;
    list-style: none;
}
}

.scientific-card{

    background-color: var(--white);
    border-radius: 0.2rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding-bottom: 3rem;

    &:hover {
      transform: translateY(-0.5rem);
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    }
}

.scientific-info{
    padding: 0.75rem 0.75rem 0rem 0.75rem;

   h3{
    font-family: var(--heading);
    font-weight: 400;
    font-size: 1.3rem;
    line-height: 1.75rem;
    color: var(--ultra-140);
   }
   p{
    font-family: var(--heading);
    font-weight: 900;
    font-size: 1.2rem;
    color: var(--cleanroom-100);
    padding: 0.5rem 0 0.5rem 0;
   }
}

.scientific-label {
    font-family: var(--subtext);
    font-weight: 900;
    font-size: 1rem;
    line-height: 1.4rem;
    color: var(--space-140);
 
  }

}
  
   .scientific-image {
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