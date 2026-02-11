<script module>
	import { Hero } from '$lib'
	import logo from '$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg'
	import heroImg from '$lib/assets/images/grav-waves.jpg?enhanced'
</script>

<svelte:head>
	<title>Team</title>
	<meta
		name="description"
		content="The team page features the different teams who have worked on the Nebula Xplorer mission over the years." />
</svelte:head>

<!-- HERO BLOCK -->
<Hero
	titleColor="var(--white)"
	pageTitle="Team"
	background={{ alt: 'Two merging black holes', file: heroImg }}
	sronIcon={logo} />
