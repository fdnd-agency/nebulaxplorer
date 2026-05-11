<script>
	import { onMount } from 'svelte';
	import rocket from '$lib/assets/logos/Scroll-rocket.svg';

	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let rocketEl;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.to(rocketEl, {
			y: () => window.innerHeight - 20,
			ease: 'none',
			scrollTrigger: {
				trigger: document.body,
				start: 'top top',
				end: 'bottom bottom',
				scrub: true
			}
		});
	});
</script>

<div class="scroll-track">
	<div class="vertical-line"></div>

	<div class="rocket-wrapper" bind:this={rocketEl}>
		<img src={rocket} alt="" class="rocket" />
	</div>
</div>

<style>
.scroll-track {
	position: fixed;
	right: 16px;
	top: 0;
	height: 100vh;
	width: 40px;
	pointer-events: none;
	z-index: 1;

	@media (min-width: 768px) {
		width: 60px;
		right: 0;
	}
}

.vertical-line {
	position: absolute;
	left: 50%;
	top: 0;
	bottom: 0;
	width: 1px;
	background: rgba(255, 255, 255, 0.15);
	transform: translateX(-50%);
}

.rocket-wrapper {
	position: absolute;
	left: 50%;
	top: 0;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.rocket {
	width: 26px;
	display: block;

	@media (min-width: 768px) {
		width: 40px;
	}
}
</style>