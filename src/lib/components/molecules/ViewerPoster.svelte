<script>
	import { language, text } from '$lib/state/language.svelte.js'

	let { visible, onload } = $props()

	const alt = {
		en: 'Rendering of the NEBULA Xplorer satellite: a box-shaped spacecraft with two deployed solar panels.',
		nl: 'Weergave van de NEBULA Xplorer-satelliet: een kastvormig ruimtevaartuig met twee uitgeklapte zonnepanelen.',
	}
</script>

<div class="viewer-poster" hidden={!visible}>
	<!-- Only rendered while shown, so the page without JavaScript loads one image -->
	{#if visible}
		<img
			src="/media/satellite-overview-1600.webp"
			srcset="/media/satellite-overview-960.webp 960w, /media/satellite-overview-1600.webp 1600w, /media/satellite-overview-2400.webp 2400w, /media/satellite-overview-3200.webp 3200w"
			sizes="100vw"
			width="1600"
			height="900"
			loading="lazy"
			decoding="async"
			alt={alt[language.current]}
		/>
	{/if}
	<div class="viewer-poster-panel">
		<p>{text('posterText')}</p>
		<button type="button" class="viewer-load-model" onclick={onload}
			>{text('loadModel')}</button
		>
	</div>
</div>
