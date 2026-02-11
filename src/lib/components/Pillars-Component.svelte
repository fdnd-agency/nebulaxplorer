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
  section {
    display: flex;
    justify-content: center;

    @media (width < 600px) {
      flex-direction: column;
      align-items: center;
    }
  }

  .pillar {
    position: relative;
    margin: 5px;

    display: flex;
    flex-direction: column;

    @media (width > 600px) {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0;
      max-width: 250px;
    }
  }

  .pillar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pillar a {
    margin-top: auto;
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
