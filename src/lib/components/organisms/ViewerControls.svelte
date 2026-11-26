<script>
	import { ViewerControl } from '$lib/components/molecules'
	import { text } from '$lib/state/language.svelte.js'

	let {
		state,
		controller,
		explorer,
	} = $props()

	const {
		availableControls,
		rotationPaused,
		raysPlaying,
		outerPanelsVisible,
		cameraAdjusted,
		satelliteReady,
		fullscreen,
		fullscreenAvailable,
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
	<ViewerControl
		control="fullscreen"
		icon={fullscreen ? 'fullscreenExit' : 'fullscreen'}
		label={text(fullscreen ? 'exitFullscreen' : 'fullscreen')}
		iconOnly
		hidden={!fullscreenAvailable}
		onclick={() => explorer.toggleFullscreen()}
	/>
</div>

<style>
	/* Pause rotation, outer panels, X-rays, reset view and full screen, bottom
	   right of the 3D view */
	.viewer-controls {
		position: absolute;
		right: var(--spacing-lg);
		bottom: var(--spacing-lg);
		display: flex;
		gap: var(--spacing-sm);
		pointer-events: auto;

		/* Phone: a column on the right, below the NL/EN switch */
		@container satellite (width < 720px) {
			top: calc(var(--spacing-md) + 3.5rem);
			right: var(--spacing-md);
			bottom: auto;
			flex-direction: column;
		}

		:global(.satellite-page[data-layout='docked-rows']) & {
			top: var(--spacing-md);
			bottom: auto;
		}
	}
</style>
