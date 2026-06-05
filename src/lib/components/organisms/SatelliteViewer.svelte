<script>
	import { onMount } from 'svelte'
	import * as THREE from 'three'
	import { loadSatellite, rotateSatellite } from '$lib/three/Satellite.js'

	import nebulaSatellite from '$lib/assets/images/nebula-satellite.png'

	let container
	let canvas
	let isLoaded = false

	onMount(() => {
		const scene = new THREE.Scene()

		scene.add(new THREE.AmbientLight(0xffffff, 1))

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
		directionalLight.position.set(5, 5, 5)
		scene.add(directionalLight)

		const fillLight = new THREE.DirectionalLight(0xffffff, 0.5)
		fillLight.position.set(-5, 2, -5)
		scene.add(fillLight)

		const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
		camera.position.z = 3.5

		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
		})

		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		loadSatellite(scene)

		// mark as loaded (for fallback switch)
		isLoaded = true

		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const { width, height } = entry.contentRect

				camera.aspect = width / height
				camera.updateProjectionMatrix()

				renderer.setSize(width, height, false)
			}
		})

		resizeObserver.observe(container)

		let frameId

		function animate() {
			frameId = requestAnimationFrame(animate)
			rotateSatellite()
			renderer.render(scene, camera)
		}

		animate()

		return () => {
			cancelAnimationFrame(frameId)
			resizeObserver.disconnect()
			renderer.dispose()
		}
	})
</script>

<section class="satellite-container" bind:this={container}>
	<img
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

	@media (min-width: 800px) {
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
