<script module>
	import {
		Hero,
		sronAcademyLogoOnSpaceBlue as logo,
		blackholeHeroEnhanced as heroImg,
	} from '$lib'
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
