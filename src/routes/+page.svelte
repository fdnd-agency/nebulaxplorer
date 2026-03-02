<script>
	import {
		Hero,
		NewsComponent as News,
		PillarsComponent,
		MailingListSignup,
		nebulaSatelliteEnhanced,
		blackholeHeroEnhanced as heroImg,
		sronAcademyLogoOnSpaceBlue as logo,
	} from '$lib'

	let { data } = $props()
</script>

<svelte:head>
	<title>Home</title>
	<meta
		name="description"
		content="NEBULA-Xplorer will investigate how jets form and how X-ray binaries evolve. It will observe these objects for long periods of time to see how their emission varies on time scales from milliseconds to weeks." />
</svelte:head>

<Hero
	titleColor="var(--white)"
	pageTitle="Nebula Xplorer"
	background={{ alt: 'Two merging black holes', file: heroImg }}
	sronIcon={logo} />

<News newsCards={data.newsItems} />

<section class="section-paragraph-picture">
	<h2 class="section_title">Over Nebula Xplorer</h2>
	<p class="paragraph">
		NEBULA – Xplorer staat voor “Netherlands Educational Satellite for
		Exploration of Binary-Linked Astrophysics – X-ray Observer”. Ongeveer
		vierhonderd studenten helpen SRON, veertien Nederlandse
		onderwijsinstellingen en vele industriële partners om deze ruimtemissie
		te ontwikkelen van begin tot eind, onder leiding van wetenschappers en
		ingenieurs. De missie heeft twee doelen. Het wetenschappelijke doel is
		beter begrijpen hoe een zwart gat materiaal afsnoept van een ster die er
		omheen draait. Het educatieve doel is dat studenten van Nederlandse
		onderwijsinstellingen van binnenuit meemaken hoe je een ruimtemissie van
		begin tot eind opbouwt. SRON heeft de leiding over NEBULA – Xplorer,
		waarmee het bijdraagt aan een nieuwe generatie wetenschappers,
		ontwerpers en technici voor het Nederlandse ruimteonderzoek.
	</p>
	<enhanced:img
		src={nebulaSatelliteEnhanced}
		alt="The Nebula Xplorer Satellite"
		sizes="(min-width:500px) 900px, (min-width:300px) 450px" />
</section>

<PillarsComponent />

<MailingListSignup />

<style>
	.section-paragraph-picture {
		display: grid;
		gap: 2rem;
		padding-block: 3rem;
		padding-inline: clamp(
			1rem,
			5vw,
			3.5rem
		); /* TODO: make this the standard padding for sections in general.css */

		@media (min-width: 1000px) {
			grid-template-columns: 2fr 1fr;
		}

		h2 {
			grid-column: 1 / -1;
		}

		img {
			max-width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
