export const SHEET_STATES = Object.freeze({
	CLOSED: 'closed',
	PEEK: 'peek',
	EXPANDED: 'expanded',
})

export function createViewerState(rootId) {
	const state = $state({
		selectedId: rootId,
		selectedCollapsed: false,
		previewId: null,
		explorerOpen: false,
		sheetState: SHEET_STATES.CLOSED,
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
