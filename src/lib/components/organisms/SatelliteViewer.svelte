<script>
	import { onMount } from 'svelte'
	import * as THREE from 'three'
	import { loadSatellite, rotateSatellite } from '$lib/three/Satellite.js'

	import nebulaSatellite from '$lib/assets/images/nebula-satellite.png'

	let container
	let canvas
	let isLoaded = false
	let shouldReduceMotion = false

	onMount(() => {
		// ==============================
		//  1. Scene setup
		// ==============================
		const scene = new THREE.Scene()
		
		// Ambient light = basic global lighting (makes everything visible)
		scene.add(new THREE.AmbientLight(0xffffff, 1))

		// Main directional light like sun comes from top-right
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
		directionalLight.position.set(5, 5, 5)
		scene.add(directionalLight)

		// Fill light is a softens shadows from the main light
		const fillLight = new THREE.DirectionalLight(0xffffff, 0.5)
		fillLight.position.set(-5, 2, -5)
		scene.add(fillLight)

		// ==============================
		// 📷 2. Camera (user view)
		// ==============================
		// Perspective camera = realistic 3D perspective
		const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
		
		// Move camera back so the model is visible
		camera.position.z = 3.5

		// ==============================
		// 🖥️ 3. Renderer (draws 3D to canvas)
		// ==============================
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,// smooth edges
			alpha: true,// transparent background
		})

		// Improves sharpness on high-DPI screens
		// capped at 2 to avoid performance issues
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		// ==============================
		// 4. Accessibility: reduced motion
		// ==============================
		// Detects if user prefers less animation
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

		// Updates value if user changes system setting
		const update = (e) => {
			shouldReduceMotion = e.matches
		}

		shouldReduceMotion = mediaQuery.matches
		mediaQuery.addEventListener('change', update)
		
		// ==============================
		// 5. Load 3D model
		// ==============================
		loadSatellite(scene)

		// mark as loaded (switch from fallback img to canvas)
		isLoaded = true

		// ==============================
		// 6. Responsive resizing (ResizeObserver)
		// ==============================
		// Automatically detects size changes of the container
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const { width, height } = entry.contentRect

				// Update camera aspect ratio to prevents distortion)
				camera.aspect = width / height
				camera.updateProjectionMatrix()

				// Resize renderer to match container size
				renderer.setSize(width, height, false)
			}
		})
		// Start observing the container element
		resizeObserver.observe(container)

		// ==============================
		// 7. Animation loop
		// ==============================
		let frameId

		function animate() {
			// requestAnimationFrame = browser-optimized 60fps loop
			frameId = requestAnimationFrame(animate)
			if (!shouldReduceMotion) {
				rotateSatellite()
			}
			// Only rotate model if user does NOT prefer reduced motion
			renderer.render(scene, camera)
		}
		// Start animation loop
		animate()

		// ==============================
		// 8. Cleanup (very important)
		// ==============================
		return () => {
			// Stop listening to reduced-motion changes
			mediaQuery.removeEventListener('change', update)
			// Stop animation loop to prevent memory leaks
			cancelAnimationFrame(frameId)
			// Stop resize observer
			resizeObserver.disconnect()
			// Free WebGL resources
			renderer.dispose()
		}
	})
</script>

<section class="satellite-container" bind:this={container}>
	<enhanced:img
		src={nebulaSatellite}
		alt="NEBULA-Xplorer satellite illustration"
		class="satellite-fallback"
		class:hidden={isLoaded} />

	<canvas bind:this={canvas} class:hidden={!isLoaded}></canvas>

	<p class="visually-hidden">
		3D model of the NEBULA-Xplorer satellite showing a rotating space
		object.
	</p>
</section>

<style>
	.satellite-container {
		position: relative;
		width: min(1100px, 90vw);
		width: 90%;
		margin: 0 auto; /* Centers it on mobile */
		aspect-ratio: 16 / 10;
		overflow: hidden;
	}

	@media (min-width: 50rem) {
		.satellite-container {
			aspect-ratio: 4 / 3;
			margin: 0;
		}
	}

	canvas,
	.satellite-fallback {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: top;
	}

	.hidden {
		display: none;
	}
</style>
