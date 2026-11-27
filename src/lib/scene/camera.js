import * as THREE from 'three'

// A narrow lens (20° vertical) keeps the CAD model's straight edges straight,
// like a product photo; the explorer frames the satellite by moving the camera
// back instead of widening the lens. The model is in metres (the satellite is
// about 1.75 m tall), so 0.1-1000 covers close-ups and the star background.
export function createCamera() {
	const camera = new THREE.PerspectiveCamera(20, 1, 0.1, 1000)

	camera.position.z = 5
	camera.up.set(0, 1, 0)

	return camera
}
