<script>
	import { onMount } from 'svelte'
	import * as THREE from 'three'
	import { loadSatellite } from '$lib/three/Satellite.js'
	import { rotateSatellite } from '$lib/three/Satellite.js'

	let canvas

	onMount(() => {
		// Scene
		const scene = new THREE.Scene()

		// Lights
		scene.add(new THREE.AmbientLight(0xffffff, 1))

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
		directionalLight.position.set(5, 5, 5)
		scene.add(directionalLight)

		const fillLight = new THREE.DirectionalLight(0xffffff, 0.5)
		fillLight.position.set(-5, 2, -5)
		scene.add(fillLight)

		// Camera
		const camera = new THREE.PerspectiveCamera(
			45,
			canvas.clientWidth / canvas.clientHeight,
			0.1,
			1000
		)

		camera.position.z = 6

		// Renderer
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
		})

		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		renderer.setSize(canvas.clientWidth, canvas.clientHeight)

		// Model
		loadSatellite(scene)

		// Resize handler
		function handleResize() {
			const width = canvas.clientWidth
			const height = canvas.clientHeight

			camera.aspect = width / height
			camera.updateProjectionMatrix()

			renderer.setSize(width, height)
		}

		window.addEventListener('resize', handleResize)

		// Animation loop
		let frameId

		function animate() {
			frameId = requestAnimationFrame(animate)

			rotateSatellite()
			renderer.render(scene, camera)
		}

		animate()

		// Cleanup
		return () => {
			cancelAnimationFrame(frameId)
			window.removeEventListener('resize', handleResize)
			renderer.dispose()
		}
	})
</script>

<section class="satellite-container">
	<canvas
		bind:this={canvas}
		aria-label="3D model of the NEBULA-Xplorer satellite"></canvas>
</section>

<style>
	.satellite-container {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;

		display: flex;
		justify-content: center;
		align-items: center;

		aspect-ratio: 16 / 10;
	}

	@media (min-width: 800px) {
		.satellite-container {
			aspect-ratio: 1 / 1;
		}
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
