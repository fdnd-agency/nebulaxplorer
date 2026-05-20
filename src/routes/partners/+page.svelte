<script module>
	import {
		Hero,
		PartnersCarousel,
		sronAcademyLogoOnSpaceBlue as logo,
		blackholeHeroEnhanced as heroImg,
		lrgbEnhanced,
	} from '$lib'
</script>

<svelte:head>
	<title>Partners</title>
	<meta
		name="description"
		content="The partners page features the valued partners and sponsors of the Nebula Xplorer project." />
</svelte:head>

<!-- HERO BLOCK -->
<Hero
	titleColor="var(--white)"
	pageTitle="Partners"
	background={{ file: lrgbEnhanced, alt: 'test' }}
	attribution={{
		text: 'NASA',
		link: 'https://apod.nasa.gov/apod/ap250417.html',
	}} />

<section class="content-container">
	<h2 class="section_title">Work with us!</h2>

	<p class="paragraph">
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem,
		molestiae. Modi exercitationem quia dolores molestiae sed error et nisi
		quod saepe rerum. Soluta harum architecto perspiciatis. Dolorum eius
		ipsa rerum.
	</p>
	<p class="paragraph">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
		reiciendis corrupti quasi similique! Similique, eum id blanditiis enim
		atque praesentium! Doloremque delectus nemo porro eum mollitia sed
		beatae asperiores officia.
	</p>
</section>

<PartnersCarousel />

<section class="content-container">
	<h2 class="section_title">Partner with NEBULA!</h2>
	<p class="paragraph">
		Contact us at <a href="mailto:nebula@sron.nl">nebula@sron.nl</a>
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
		color: var(--cleanroom-100);
	}

	.paragraph {
		max-width: 70ch;
	}

	.content-container {
		padding: 0;
	}
</style>
