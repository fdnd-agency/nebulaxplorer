<script>
	import { onMount } from 'svelte';
	import rocket from '$lib/assets/logos/Scroll-rocket.svg';

	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let rocketEl;

	onMount(() => {
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

		<div class="flame"></div>
	</div>
</div>

<style>
:global(html, body) {
	margin: 0;
	padding: 0;
	overflow-x: hidden;
	scrollbar-width: none;
	-ms-overflow-style: none;
}

:global(body::-webkit-scrollbar) {
	display: none;
}

.scroll-track {
	position: fixed;
	right: 0;
	top: 0;
	height: 100vh;
	width: 36px;
	pointer-events: none;
	z-index: 9999;
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
	will-change: transform;
}

.rocket {
	width: 26px;
	display: block;
}

/* flame */
.flame {
	width: 6px;
	height: 18px;
	background: orange;
	border-radius: 50%;
	filter: blur(3px);
	margin-top: -4px;
	opacity: 0.8;
	animation: flicker 0.12s infinite alternate;
}

@keyframes flicker {
	from {
		transform: scaleY(1);
		opacity: 0.6;
	}

	to {
		transform: scaleY(1.4);
		opacity: 1;
	}
}

@media (min-width: 768px) {
	.scroll-track {
		width: 50px;
	}

	.rocket {
		width: 40px;
	}

	.flame {
		width: 10px;
		height: 28px;
	}
}
</style>