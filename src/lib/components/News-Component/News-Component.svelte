<script>
  const NewsCards = [
    {
      id: 1,
      title: "XRISM ziet verrassend trage en dichte wind van neutronenster",
      type: "News",
      slug: ""
    },
    {
      id: 2,
      title: "XRISM ziet verrassend trage en dichte wind van neutronenster",
      type: "Event",
      slug: ""
    },
    {
      id: 3,
      title: "XRISM ziet verrassend trage en dichte wind van neutronenster",
      type: "News",
      slug: ""
    },
  ];

</script>

<section class="grid-wrapper">
<ul class="news-grid">
  {#each NewsCards as newscard}
  <li class="news-card">
    <div class="news-image">
      <img src="/src/lib/assets/images/placeholder2.png" alt="{newscard.title}"> 
    </div>
    <div class="news-info">
      <span class="news-label"></span>
      <h3>{newscard.title}</h3>
      <span class="news-label"></span>
      <p>{newscard.type}</p>
    </div>
  </li>
  {/each}

      <li class="read-more-card">
    <div class="read-more-image">
      <img src="/src/lib/assets/images/placeholder2.png" alt="Read More"> 
      <div class="read-more-text">
      <h3>Read more       
      <svg
  width="12"
  height="20"
  viewBox="0 0 12 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M0.424371 0.402013C0.557539 0.274641 0.716033 0.173532 0.890695 0.10453C1.06536 0.0355277 1.25272 0 1.44196 0C1.6312 0 1.81857 0.0355277 1.99323 0.10453C2.16789 0.173532 2.32639 0.274641 2.45955 0.402013L11.5756 9.03646C11.7101 9.16261 11.8168 9.31276 11.8897 9.47822C11.9625 9.64368 12 9.82117 12 10.0004C12 10.1797 11.9625 10.3572 11.8897 10.5227C11.8168 10.6881 11.7101 10.8383 11.5756 10.9644L2.46099 19.6002C2.1911 19.8561 1.82499 19.9999 1.44318 20C1.06138 20.0001 0.695159 19.8566 0.425087 19.6009C0.155015 19.3452 0.00321433 18.9984 0.00308003 18.6367C0.00294573 18.275 0.154488 17.9281 0.424371 17.6723L8.52214 10.0011L0.424371 2.32997C0.289915 2.20382 0.183183 2.05368 0.110343 1.88822C0.0375035 1.72276 0 1.54527 0 1.36599C0 1.18672 0.0375035 1.00923 0.110343 0.843769C0.183183 0.67831 0.289915 0.528166 0.424371 0.402013Z"
    fill="#FFFFFF"
  />
</svg>
</h3>
</div>
    </div>
      <div class="overlay">
    
    </div>
  </li>

</ul>
</section>


<style>

.grid-wrapper{
  display: inherit;

  .news-grid{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    padding-top: 4rem;
    padding-bottom: 3rem;
    padding-left: 0;
    list-style: none;
}

@media (min-width: 700px) {
.news-grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 2rem;
    padding-bottom: 3rem;
    list-style: none;
    background-color: rgb(255, 255, 255);
}
}

@media (min-width: 1000px) {
.news-grid{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 2rem;
    row-gap: 4rem;
    padding-bottom: 4rem;
    padding-left: 4rem;
    padding-right: 4rem;
    list-style: none;
}
}

.news-card{

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

.news-info{
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

.news-label {
    font-family: var(--subtext);
    font-weight: 900;
    font-size: 1rem;
    line-height: 1.4rem;
    color: var(--space-140);
 
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

  .read-more-card{
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    transform: translateY(-0.5rem);
    &:hover {
      transform: translateY(-1rem);
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    }
}

     .read-more-image {
    border-top: 0.3rem solid var(--space-140);
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin-top: auto;
    position: relative;
    

    img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    background: #292F6B;
  }
  }


    .read-more-text {
      padding: 0.75rem 0.75rem 0rem 0.75rem;
      border-top: 2px solid white;
      border-width: 0.3rem;
  
    h3{
      font-family: var(--heading);
      font-weight: 400;
      font-size: 1.75rem;
      line-height: 1.75rem;
      color: var(--white);
      position: absolute;
      bottom: 1.5rem;
      left: 6rem;
      transform: translate(-50%, -50%);
    }

  }


  .overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: #292F6B;
}

.read-more-card:hover .overlay {
  opacity: 0.3;
}
</style>