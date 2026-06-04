import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

let satellite = null

export function loadSatellite(scene) {
	const loader = new GLTFLoader()

	loader.load('/NebulaXplorer.glb', (glb) => {
		console.log('MODEL LOADED')

		satellite = glb.scene

		satellite.scale.set(0.20, 0.20, 0.20)

		scene.add(satellite)
	})
}