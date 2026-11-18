<script>
	let { name, stateful = false } = $props()

	const paths = {
		menu: 'M2 4h12M2 8h12M2 12h12',
		close: 'M3 3l10 10M13 3L3 13',
		chevron: 'M3 10.5l5-5 5 5',
		fullscreen: 'M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4',
		fullscreenExit: 'M6 2v4H2M10 2v4h4M14 10h-4v4M2 10h4v4',
		pause: 'M5 3v10M11 3v10',
		play: 'M5 3l8 5-8 5z',
		layers: 'M2 5l6-3 6 3-6 3zM2 8l6 3 6-3M2 11l6 3 6-3',
		reset: 'M3 8a5 5 0 1 0 1.5-3.6M3 2v3h3',
	}
</script>

<svg
	class={stateful ? `icon icon-${name}` : 'icon'}
	viewBox="0 0 16 16"
	aria-hidden="true"><path d={paths[name]} /></svg
>
