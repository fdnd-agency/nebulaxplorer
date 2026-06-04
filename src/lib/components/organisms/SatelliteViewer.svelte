<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

let satellite = null

export function loadSatellite(scene) {
	const loader = new GLTFLoader()

	loader.load('/NebulaXplorer.glb', (glb) => {
		satellite = glb.scene

		// basic setup (NO animation yet)
		satellite.position.set(0, 0, 0)
		satellite.scale.set(0.1, 0.1, 0.1)

		scene.add(satellite)
	})
}
</script>
