<script>
  import Hero from "$lib/components/organisms/Hero.svelte";
  import missionImage from "$lib/assets/images/hero-background-01.jpg";
  import Link from "$lib/components/atoms/Link.svelte"
</script>

<svelte:head>
	<title>Home - NebulaXPlorer</title>
</svelte:head>

<Hero
  title="Mission"
  text="To the stars by the genius of youth"
  image={missionImage}
/>


<Link href="/" text="Bekijk alles" size="lg" color="var(--color-accent-light)" bold />