<script>
	import { Button } from '$lib/components/atoms'
	import { language, text } from '$lib/state/language.svelte.js'

	let {
		visible,
		onload,
	} = $props()

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
		<Button
			text={text('loadModel')}
			variant="secondary-solid"
			classes="viewer-load-model"
			onclick={onload}
		/>
	</div>
</div>

<style>
	/* Reduced data: a still of the satellite and a button to load the 3D
	   model */
	.viewer-poster {
		position: absolute;
		inset: 0;
		display: grid;
		align-items: end;
		justify-items: center;
		padding: var(--spacing-lg);
		pointer-events: auto;

		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}

	.viewer-poster-panel {
		position: relative;
		display: grid;
		justify-items: start;
		gap: var(--spacing-md);
		max-width: 420px;
		padding: var(--spacing-lg);
		color: var(--color-neutral-lightest);
		background: var(--color-brand-darkest);

		p {
			font-family: var(--font-caption);
			font-size: var(--font-size-body-sm);
			line-height: var(--line-height-normal);
		}
	}
</style>
