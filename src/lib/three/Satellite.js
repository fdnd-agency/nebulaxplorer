import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// Stores the loaded satellite model globally in this module
let satellite = null

// ==============================
// 📦 Load 3D satellite model
// ==============================
export function loadSatellite(scene) {
	// Create a GLTF loader
	const loader = new GLTFLoader()
	// Load the 3D model file
	loader.load('/NebulaXplorer.glb', (glb) => {
		// Extract the 3D scene from the loaded file
		satellite = glb.scene
		// Scale the model down so it fits in the camera view
		satellite.scale.set(0.3, 0.3, 0.3)
		// Add the model to the main Three.js scene
		scene.add(satellite)
	})
}

// ==============================
// 🔄 Rotate satellite animation
// ==============================
export function rotateSatellite() {
	// Only rotate if the model is already loaded
	if (satellite) {
		// Slowly rotate around the Y-axis (left/right spin)
		satellite.rotation.y += 0.003
	}
}
