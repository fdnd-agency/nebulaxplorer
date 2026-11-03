<script>
	import { language, text } from '$lib/state/language.svelte.js'

	let { visible, onload } = $props()

	const alt = {
		en: 'Rendering of the NEBULA Xplorer satellite: a box-shaped spacecraft with two deployed solar panels.',
		nl: 'Weergave van de NEBULA Xplorer-satelliet: een kastvormig ruimtevaartuig met twee uitgeklapte zonnepanelen.',
	}
</script>

<div class="viewer-poster" hidden={!visible}>
	<img
		src="/media/satellite-overview.webp"
		width="1200"
		height="800"
		loading="lazy"
		decoding="async"
		alt={alt[language.current]}
	/>
	<div class="viewer-poster-panel">
		<p>{text('posterText')}</p>
		<button type="button" class="viewer-load-model" onclick={onload}
			>{text('loadModel')}</button
		>
	</div>
</div>
