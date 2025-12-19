<script>
    import Hero from "$lib/components/molecules/Hero/Hero.svelte"
    import heroImg from "$lib/assets/images/grav-waves.jpg?enhanced";


    console.log(Hero)
</script>

<Hero
  pageTitle="Careers"
  background={{ alt: "Two merging black holes", file: heroImg }}
  sronIcon={logo}
/>

