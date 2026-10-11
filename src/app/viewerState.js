export const VIEW_NAMES = Object.freeze({
	SATELLITE: 'satellite',
	INTERIOR: 'interior',
	INSTRUMENT: 'instrument',
	INSTRUMENT_INTERIOR: 'instrument-interior',
	MIRROR: 'mirror',
	RAYS: 'rays',
	PARTS: 'parts',
})

export function createViewerState() {
	return {
		pointerStart: null,
		pointerDragged: false,
		selectedComponent: null,
		frameRequest: null,
		viewerInViewport: true,
		viewRequest: 0,
		activeView: VIEW_NAMES.SATELLITE,
		rayPlaying: false,
		lastFrameTime: null,
		interacting: false,
		rotationPaused: false,
		selectedInstrumentComponent: null,
		instrumentComponents: null,
	}
}
