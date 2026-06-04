<script>
	import { onMount } from 'svelte'
	import * as THREE from 'three'
	import { loadSatellite } from '$lib/three/Satellite.js'

	let container
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

		// Camera
		const camera = new THREE.PerspectiveCamera(
			45,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		)
		camera.position.z = 5

		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
		})

		renderer.setSize(container.clientWidth, container.clientHeight)
		renderer.setClearColor(0x0b0f1a, 1)

		// 🛰️ Load satellite
		loadSatellite(scene)

		// 🔁 Render loop
		function animate() {
			requestAnimationFrame(animate)
			renderer.render(scene, camera)
		}

		animate()

		// 🧹 resize fix (IMPORTANT)
		window.addEventListener('resize', () => {
			const width = container.clientWidth
			const height = container.clientHeight

			camera.aspect = width / height
			camera.updateProjectionMatrix()
			renderer.setSize(width, height)
		})
	})
</script>

<div bind:this={container} class="scene">
	<canvas bind:this={canvas}></canvas>
</div>
