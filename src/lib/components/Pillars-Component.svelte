<script>
  const dummydata = [
    {
      link: "#",
      image: {
        src: "/src/lib/assets/images/placeholder1.jpg",
        alt: "a guy holding a thing",
      },
      title: "technology",
    },
    {
      link: "#",
      image: {
        src: "/src/lib/assets/images/grav-waves.jpg",
        alt: "a scientist sciencing",
      },
      title: "science",
    },

    {
      link: "#",
      image: {
        src: "/src/lib/assets/images/placeholder2.jpg",
        alt: "a guy holding a thing",
      },
      title: "instrumentation",
    },
    {
      link: "#",
      image: {
        src: "/src/lib/assets/images/placeholder1.jpg",
        alt: "a guy holding a thing",
      },
      title: "placeholder",
    },
    {
      link: "#",
      image: {
        src: "/src/lib/assets/images/placeholder1.jpg",
        alt: "a guy holding a thing",
      },
      title: "lorem ipsum",
    },
  ];
</script>

<section>
  
<h2>Pillars</h2>
  <!-- TODO: make the things inside this #each loop into a seperate component partial -->
  <ul>
    {#each dummydata as data}
    <li class="pillar">
      <img src={data.image.src} alt={data.image.alt} /><!-- width="100%" -->

      <a href={data.link}> {data.title}</a>
    </li>
  {/each}
  </ul>
</section>

<style>
  ul {
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding-block-start: 1em;
    padding-block-end: 1.5em;

    @media (width < 600px) {
      flex-direction: column;
      align-items: center;
    }
  }

  .pillar {
    position: relative;
    margin: 5px;

    display: grid;
    
    align-items: center;
    grid-template-columns: clamp(1em, 30vw, 6.5em) 1fr;
    width: 100%;

    background-color: #292E6B;

    @media (width > 600px) {
      display: flex;
      align-items: center;

      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0;

      flex-direction: column;
      max-width: 250px;

    }

    

  }

  .pillar img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;

    @media (width > 600px) {
      max-height: unset;
      max-width: unset;
    }
  }

  .pillar a {
    text-align: center;
    font-size: clamp(1em, 5vw, 1.2em);
    font-family: var(--heading);

    @media (width > 600px) {
      padding-block-start: 1em;
      padding-block-end: 1em;
      text-align: start;
      font-size: unset;
    }
  }

  .pillar:hover {
    text-decoration: underline;
  }

  a::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
