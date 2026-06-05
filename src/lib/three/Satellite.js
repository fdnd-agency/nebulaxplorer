import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

let satellite = null

export function loadSatellite(scene) {
	const loader = new GLTFLoader()

	loader.load('/NebulaXplorer.glb', (glb) => {

		satellite = glb.scene

		satellite.scale.set(0.3, 0.3, 0.3)

		scene.add(satellite)
	})
}

export function rotateSatellite() {
	if (satellite) {
		satellite.rotation.y += 0.003
	}
}
