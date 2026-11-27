<script>
	import { pick } from '$lib/state/language.svelte.js'

	// A close-up rendered from the CAD model on a studio backdrop
	// (scripts/render-stills.mjs), stored in three widths in
	// static/media/components/
	let {
		image,
		sizes,
		alt = pick(image.alt),
	} = $props()

	const base = $derived(`/media/components/${image.name}`)
</script>

<img
	class="component-image"
	src="{base}-1200.webp"
	srcset="{base}-320.webp 320w, {base}-640.webp 640w, {base}-1200.webp 1200w"
	{sizes}
	width="1200"
	height="900"
	loading="lazy"
	decoding="async"
	{alt}
/>
