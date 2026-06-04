<script>
	import { onMount } from 'svelte'
	import * as THREE from 'three'
	import { loadSatellite } from '$lib/three/Satellite.js'

	let canvas

	onMount(() => {
		// Scene
		const scene = new THREE.Scene()

		// Light
		const light = new THREE.AmbientLight(0xffffff, 0.5)
		scene.add(light)

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
		directionalLight.position.set(5, 5, 5)
		scene.add(directionalLight)

		// Camera (UI component → use canvas size)
		const width = canvas.clientWidth
		const height = canvas.clientHeight

		const camera = new THREE.PerspectiveCamera(
			45,
			width / height,
			0.1,
			1000
		)
		camera.position.z = 5

		// Renderer (use canvas directly)
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
		})

		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		renderer.setSize(width, height)
		renderer.setClearColor(0x0b0f1a, 1)

		// Load model
		loadSatellite(scene)

		// Render loop
		function animate() {
			requestAnimationFrame(animate)
			renderer.render(scene, camera)
		}

		animate()

		// Resize (UI component safe)
		window.addEventListener('resize', () => {
			const width = canvas.clientWidth
			const height = canvas.clientHeight

			camera.aspect = width / height
			camera.updateProjectionMatrix()
			renderer.setSize(width, height)
		})
	})
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		width: 100%;
		height: 400px;
		display: block;
	}
</style>
