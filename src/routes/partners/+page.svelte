<script module>
	import {
		Hero,
		PartnersCarousel,
		Carousel,
		sronAcademyLogoOnSpaceBlue as logo,
		blackholeHeroEnhanced as heroImg,
	} from '$lib'
</script>

<svelte:head>
	<title>Partners</title>
	<meta
		name="description"
		content="The partners page features the valued partners and sponsors of the Nebula Xplorer project." />
</svelte:head>

<!-- HERO BLOCK -->
<Hero titleColor="var(--white)" pageTitle="Partners" />

<h2 class="section_title">Work with us!</h2>
<PartnersCarousel />

<Carousel />
