<script>
  import Hero from "$lib/components/organisms/Hero.svelte";
  import missionImage from "$lib/assets/images/hero-background-01.jpg";
</script>

<svelte:head>
	<title>Home - NebulaXPlorer</title>
</svelte:head>

<Hero
  title="Mission"
  text="To the stars by the genius of youth"
  image={missionImage}
/>
