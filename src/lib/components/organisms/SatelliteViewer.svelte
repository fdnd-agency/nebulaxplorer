<script>
	import { onMount } from 'svelte'
	import * as THREE from 'three'

	let container

	onMount(() => {
		// Scene
		const scene = new THREE.Scene()

		// Render loop (empty scene for now)
		function animate() {
			requestAnimationFrame(animate)
		}

		animate()
	})
</script>

<div bind:this={container} class="scene"></div>

<style>
	.scene {
		width: 100%;
		height: 500px;
		background: black;
	}
</style>