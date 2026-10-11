export function createDomBindings() {
	return {
		componentLinks: [...document.querySelectorAll('[data-3d-object]')],
		componentDetails: [
			...document.querySelectorAll('[data-component-info]'),
		],
		componentDetailsPanel: document.querySelector('.component-details'),
		instrumentLinks: [
			...document.querySelectorAll('[data-instrument-component]'),
		],
		instrumentDetails: [
			...document.querySelectorAll('[data-instrument-info]'),
		],
		instrumentDetailsPanel: document.querySelector('.instrument-details'),
		instrumentNavigation: document.querySelector('.instrument-navigation'),
		selectionStatus: document.querySelector('.selection-status'),
		viewerSidebar: document.querySelector('.viewer-sidebar'),
		viewerSidebarToggle: document.querySelector('.viewer-sidebar-toggle'),
		viewLinks: [...document.querySelectorAll('a[data-view]')],
		opticalLinks: [
			...document.querySelectorAll('a[data-optical-component]'),
		],
		opticsPanel: document.querySelector('.optics-panel'),
		partSelect: document.querySelector('#cad-part'),
		playButton: document.querySelector('#ray-play'),
		rotationButton: document.querySelector('#rotation-toggle'),
		opticalSelection: document.querySelector('#optical-selection'),
		viewerRoot: document.querySelector('.viewer'),
	}
}
