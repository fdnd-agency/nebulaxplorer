import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let controls

export function createControls(camera, renderer) {
	controls = new OrbitControls(camera, renderer.domElement)

	controls.enableDamping = true
	controls.dampingFactor = 0.075
	controls.enableZoom = true
	controls.enablePan = false
	controls.enableRotate = true
	controls.rotateSpeed = 1.05
	controls.zoomSpeed = 0.9

	// The explorer is a section of a page that scrolls. The mouse wheel scrolls
	// the page; Ctrl or ⌘ with the wheel, and pinching on a trackpad (which
	// reports Ctrl), zoom. On touch screens a vertical swipe scrolls the page,
	// a sideways one rotates and pinching zooms.
	const canvas = renderer.domElement
	canvas.addEventListener(
		'wheel',
		(event) => {
			if (!event.ctrlKey && !event.metaKey)
				event.stopImmediatePropagation()
		},
		{ capture: true },
	)
	canvas.style.touchAction = 'pan-y'

	return controls
}

export function updateControls(delta) {
	if (controls) controls.update(delta)
}
