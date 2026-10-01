<script module>
	import {
		Hero,
		PartnersCarousel,
		lrgbEnhanced,
		setupScrollReveal,
	} from '$lib'
</script>

<script>
	import { onMount } from 'svelte'

	onMount(() => {
		setupScrollReveal()
	})
</script>

<svelte:head>
	<title>Partners</title>
	<meta
		name="description"
		content="The partners page features the valued partners and sponsors of the Nebula Xplorer project." />
</svelte:head>

<!-- HERO BLOCK -->
<Hero
	titleColor="var(--text-color-light)"
	pageTitle="Partners"
	background={{ file: lrgbEnhanced, alt: 'Virgo Cluster Galaxies' }}
	attribution={{
		text: 'NASA',
		link: 'https://apod.nasa.gov/apod/ap250417.html',
	}} />

<section class="content-container reveal">
	<h2 class="section-title">Work with us!</h2>

	<p class="paragraph">
		Multiple organisations already support NEBULA-Xplorer’s mission through
		equipment, software licences, facilities, or personnel. Take a glimpse
		at the companies below to better understand how partners can contribute
		to the project and help turn ambitious student-led space exploration
		into reality.
	</p>
</section>

<PartnersCarousel />

<section class="content-container reveal">
	<h2 class="section-title orange">Partner with NEBULA!</h2>
	<p class="paragraph">
		We are always open to new collaborations with companies, institutions,
		and individuals who believe in empowering the next generation of
		engineers. If your organisation is interested in supporting
		NEBULA-Xplorer, we would be glad to explore how we can create meaningful
		value together.
	</p>
	<p class="subheading">
		Contact us at <a href="mailto:nebula@sron.nl">nebula@sron.nl</a>!
	</p>
</section>

<style>
	section {
		margin-block-end: calc(2rem + 1vw);
	}

	h2 {
		margin-block: 1rem;
	}

	a {
		color: var(--accent-color);
	}

	.paragraph {
		max-width: 70ch;
		margin-block: 1rem;
	}

	.content-container {
		padding: 0;
	}
</style>
