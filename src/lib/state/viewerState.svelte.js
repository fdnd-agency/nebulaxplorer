// On a phone the explorer is a sheet: its peek row, or expanded
export const SHEET_STATES = Object.freeze({
	PEEK: 'peek',
	EXPANDED: 'expanded',
})

export function createViewerState(rootId) {
	const state = $state({
		selectedId: rootId,
		selectedCollapsed: false,
		previewId: null,
		sheetState: SHEET_STATES.PEEK,
		layoutMode: 'panel',
		scriptActive: false,
		enhanced: false,
		fallback: false,
		outerPanelsVisible: false,
		raysPlaying: true,
		rotationPaused: false,
		cameraAdjusted: false,
		satelliteReady: false,
		availableControls: { rotation: false, outerPanels: false, rays: false },
		status: null,
		representation: null,
		switching: false,
		posterVisible: false,
		hintDismissed: false,
		coarsePointer: false,
		breadcrumbExpanded: false,
		announcement: '',
		sceneRequest: 0,
		scrollRequest: { id: rootId, smooth: false, count: 0 },
	})
	return state
}
