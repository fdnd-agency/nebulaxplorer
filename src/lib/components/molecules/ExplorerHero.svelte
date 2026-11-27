<script>
	import { pick } from '$lib/state/language.svelte.js'

	let { hero } = $props()

	// The looping sway is an animated AVIF: it plays without JavaScript and
	// without player controls. It only downloads without JavaScript (with
	// JavaScript the 3D model takes its place) and for visitors who allow
	// motion; everyone else gets the sharp still, the loop's first frame.
	// Phones get an upright composition with both panel tips in frame.
	const motion =
		'(scripting: none) and (prefers-reduced-motion: no-preference)'
	const phone = '(max-width: 699px)'
	const { tall } = $derived(hero)
</script>

<figure class="explorer-hero">
	<picture>
		<source
			type="image/avif"
			srcset={tall.animation}
			media="{phone} and {motion}"
			width={tall.width}
			height={tall.height}
		/>
		<source
			type="image/webp"
			srcset="{tall.still}-900.webp 900w, {tall.still}-1350.webp 1350w"
			sizes="100vw"
			media={phone}
			width={tall.width}
			height={tall.height}
		/>
		<source type="image/avif" srcset={hero.animation} media={motion} />
		<img
			class="explorer-hero-media"
			src="{hero.still}-1440.webp"
			srcset="{hero.still}-960.webp 960w, {hero.still}-1440.webp 1440w, {hero.still}-2160.webp 2160w"
			sizes="(min-width: 900px) 58vw, 100vw"
			width={hero.width}
			height={hero.height}
			decoding="async"
			fetchpriority="high"
			alt={pick(hero.alt)}
		/>
	</picture>
</figure>

<style>
	/* The whole satellite in the opening of the page without JavaScript */
	.explorer-hero {
		grid-area: hero;
		margin: var(--spacing-lg) 0 0;

		@container satellite (width >= 900px) {
			margin: 0;
		}
	}

	.explorer-hero-media {
		display: block;
		width: 100%;
		height: auto;
		background: var(--color-brand-darkest);

		/* Phone: the upright satellite, both panel tips on the first screen */
		@container satellite (width < 700px) {
			width: auto;
			max-width: 100%;
			height: clamp(320px, calc(100svh - 430px), 560px);
			margin: 0 auto;
		}

		/* Large screens: the whole satellite beside the name */
		@container satellite (width >= 900px) {
			width: auto;
			max-width: 100%;
			max-height: calc(100svh - var(--header-height) - var(--spacing-xl));
			margin-left: auto;
		}

		@media (prefers-reduced-motion: no-preference) {
			animation: explorer-hero-in 1600ms var(--ease) both;
		}
	}

	@keyframes explorer-hero-in {
		from {
			opacity: 0;
			transform: scale(0.985);
		}
	}
</style>
