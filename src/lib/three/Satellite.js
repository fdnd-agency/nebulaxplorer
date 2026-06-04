import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

let satellite = null

export function loadSatellite(scene) {
	const loader = new GLTFLoader()

	loader.load('/NebulaXplorer.glb', (glb) => {
		console.log('MODEL LOADED')

		satellite = glb.scene

		satellite.scale.set(0.2, 0.2, 0.2)

		scene.add(satellite)
	})
}

export function rotateSatellite() {
	if (satellite) {
		satellite.rotation.y += 0.002
	}
}
