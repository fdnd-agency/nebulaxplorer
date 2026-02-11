<script module>
	import { Hero } from '$lib'
	import logo from '$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg'
	import heroImg from '$lib/assets/images/grav-waves.jpg?enhanced'
</script>

<svelte:head>
	<title>Scientific</title>
	<meta
		name="description"
		content="The scientific page features advanced news and resources to inspire students and scientists alike on the latest discoveries and progress made on the Nebula Xplorer mission." />
</svelte:head>
<!-- HERO BLOCK -->
<Hero
	titleColor="var(--white)"
	pageTitle="Scientific"
	background={{ alt: 'Two merging black holes', file: heroImg }}
	sronIcon={logo} />
