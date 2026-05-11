<script>
	import { onMount } from 'svelte';
	import rocket from '$lib/assets/logos/Scroll-rocket.svg';

	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let rocketEl;

	onMount(() => {
		console.log('GSAP loaded');
		gsap.registerPlugin(ScrollTrigger);

		gsap.to(rocketEl, {
			y: () => window.innerHeight - 100,
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
		<img src={rocket} alt="Rocket" class="rocket" />
	</div>
</div>

<style>

.scroll-track {
	position: fixed;
	right: 0;
	top: 0;
	height: 100vh;
	width: 36px;
	pointer-events: none;
	z-index: 9999;
}

/* vertical guide line */
.vertical-line {
	position: absolute;
	left: 50%;
	top: 0;
	bottom: 0;
	width: 1px;
	background: rgba(255, 255, 255, 0.15);
	transform: translateX(-50%);
}

/* rocket container */
.rocket-wrapper {
	position: absolute;
	left: 50%;
	top: 0;
	transform: translateX(-50%);
	will-change: transform;
	display: flex;
	flex-direction: column;
	align-items: center;
}

/* rocket image */
.rocket {
	width: 26px;
	display: block;
}

/* =========================
   DESKTOP
========================= */
@media (min-width: 768px) {
	.scroll-track {
		width: 50px;
	}

	.rocket {
		width: 40px;
	}
}
</style>