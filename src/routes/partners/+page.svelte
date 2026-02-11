<script module>
	import { Hero } from "$lib";
	import logo from "$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg";
	import heroImg from "$lib/assets/images/grav-waves.jpg?enhanced";
</script>

<svelte:head>
	<title>Partners</title>
	<meta
		name="description"
		content="The partners page features the valued partners and sponsors of the Nebula Xplorer project."
	/>
</svelte:head>

<!-- HERO BLOCK -->
<Hero
	titleColor="var(--white)"
	pageTitle="Partners"
	background={{ alt: "Two merging black holes", file: heroImg }}
	sronIcon={logo}
/>
