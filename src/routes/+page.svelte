<script>
  import PillarsComponent from "$lib/components/Pillars-Component.svelte";
  import Mission from "$lib/components/atoms/Mission.svelte";
  // import NewsComponent from "$lib/components/News-Component/News-Component.svelte";




	import nebulaSatellite from "$lib/assets/images/nebula-satellite.png?enhanced&w=900;450";
	import Hero from "$lib/components/molecules/Hero/Hero.svelte";
	import heroImg from "$lib/assets/images/grav-waves.jpg?enhanced";
	import logo from "$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg";
</script>

<Hero
	titleColor="var(--white)"
	pageTitle="Nebula Xplorer"
	background={{ alt: "Two merging black holes", file: heroImg }}
	sronIcon={logo}
/>

<section class="section-paragraph-picture">
	<h2 class="section_title">Over Nebula Xplorer</h2>
	<p class="paragraph">
		NEBULA – Xplorer staat voor “Netherlands Educational Satellite for
		Exploration of Binary-Linked Astrophysics – X-ray Observer”. Ongeveer
		vierhonderd studenten helpen SRON, veertien Nederlandse
		onderwijsinstellingen en vele industriële partners om deze ruimtemissie te
		ontwikkelen van begin tot eind, onder leiding van wetenschappers en
		ingenieurs. De missie heeft twee doelen. Het wetenschappelijke doel is beter
		begrijpen hoe een zwart gat materiaal afsnoept van een ster die er omheen
		draait. Het educatieve doel is dat studenten van Nederlandse
		onderwijsinstellingen van binnenuit meemaken hoe je een ruimtemissie van
		begin tot eind opbouwt. SRON heeft de leiding over NEBULA – Xplorer, waarmee
		het bijdraagt aan een nieuwe generatie wetenschappers, ontwerpers en
		technici voor het Nederlandse ruimteonderzoek.
	</p>
	<enhanced:img
		src={nebulaSatellite}
		alt="The Nebula Xplorer Satellite"
		sizes="(min-width:500px) 900px, (min-width:300px) 450px"
	/>
</section>

<PillarsComponent />

<!-- <Mission {data} /> -->

<style>
	.section-paragraph-picture {
		display: grid;
		gap: 2rem;
		/* padding: 3rem 1rem; */
		padding-inline: clamp(1rem, 5vw, 3.5rem); /* TODO: make this the standard padding for sections in general.css */

		/* @media (min-width: 500px) {
			padding: 3rem 2rem;
		} */

		@media (min-width: 1000px) {
			/* padding: 3rem 3rem; */
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
