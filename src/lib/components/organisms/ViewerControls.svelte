<script>
	import ViewerControl from '$lib/components/molecules/ViewerControl.svelte'
	import { text } from '$lib/state/language.svelte.js'

	let { state, controller } = $props()

	const {
		availableControls,
		rotationPaused,
		raysPlaying,
		outerPanelsVisible,
		cameraAdjusted,
		satelliteReady,
	} = $derived(state)
</script>

<div class="viewer-controls">
	<ViewerControl
		control="rotation"
		playing={!rotationPaused}
		label={text(rotationPaused ? 'resumeRotation' : 'pauseRotation')}
		hidden={!availableControls.rotation}
		onclick={() => controller?.toggleRotation()}
	/>
	<ViewerControl
		control="outerPanels"
		icon="layers"
		pressed={outerPanelsVisible}
		label={text('outerPanels')}
		hidden={!availableControls.outerPanels}
		onclick={() => controller?.toggleOuterPanels()}
	/>
	<ViewerControl
		control="rays"
		playing={raysPlaying}
		label={text(raysPlaying ? 'pauseRays' : 'playRays')}
		hidden={!availableControls.rays}
		onclick={() => controller?.toggleRays()}
	/>
	<ViewerControl
		control="reset"
		icon="reset"
		label={text('resetView')}
		hidden={!(cameraAdjusted && satelliteReady)}
		onclick={() => controller?.resetView()}
	/>
</div>
