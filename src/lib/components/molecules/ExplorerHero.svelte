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
