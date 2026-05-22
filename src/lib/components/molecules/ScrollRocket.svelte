<script>
	import rocket from '$lib/assets/logos/Scroll-rocket.svg'

	let isScrolling = false
	let timer

	function handleScroll() {
		isScrolling = true

		clearTimeout(timer)
		timer = setTimeout(() => {
			isScrolling = false
		}, 200)
	}
</script>

<svelte:window on:scroll={handleScroll} />

<div class="scroll-track">
	<div class="scroll-track-line"></div>
	<div class="scroll-track-fill"></div>

	<div class="rocket-wrapper {isScrolling ? 'is-scrolling' : ''}">
		<img src={rocket} alt="" class="rocket" />
	</div>
</div>

<style>
	.scroll-track {
		position: fixed;
		right: 0;
		top: 0;
		height: 100vh;
		width: 40px;
		pointer-events: none;
		z-index: 1;
		display: none;

		view-transition-name: scroll-track;

		/* if animation timeline is supported, show the rocket */
		@supports (animation-timeline: scroll(root)) {
			display: block;
		}
	}

	@media (min-width: 768px) {
		.scroll-track {
			width: 60px;
			right: 0;
			z-index: 100;
		}
	}

	/* basic line */
	.scroll-track-line {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 1px;
		background: rgba(255, 255, 255, 0.15);
		transform: translateX(-50%);
	}

	/* colored line */
	.scroll-track-fill {
		position: absolute;
		left: 50%;
		top: 0;
		width: 2px;
		height: 100%;
		transform: translateX(-50%) scaleY(0);
		transform-origin: bottom;
		background: linear-gradient(to bottom, #343434, #9d5d54);
		animation: fillLine linear both;
		animation-timeline: scroll(root);
		animation-range: 0% 100%;
	}

	/* rocket */
	.rocket-wrapper {
		position: absolute;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
		animation: rocketMove linear both;
		animation-timeline: scroll(root);
		animation-range: 0% 100%;

		view-transition-name: rocket;
	}

	/* glow */
	.rocket-wrapper::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%) translateY(25%);
		width: 30px;
		height: 110px;
		background: radial-gradient(
			circle,
			rgba(221, 91, 74, 0.9) 0%,
			rgba(157, 93, 84, 0) 70%
		);
		filter: blur(8px);
		z-index: -1;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	/* glow active while scrolling */
	.rocket-wrapper.is-scrolling::after {
		opacity: 1;
	}

	/* rocket movement */
	@keyframes rocketMove {
		from {
			transform: translateX(-50%) translateY(0);
		}
		to {
			transform: translateX(-50%) translateY(calc(100vh - 20px));
		}
	}

	@keyframes fillLine {
		from {
			transform: translateX(-50%) scaleY(1);
		}
		to {
			transform: translateX(-50%) scaleY(0);
		}
	}

	.rocket {
		width: 26px;
		display: block;
	}

	@media (min-width: 768px) {
		.rocket {
			width: 40px;
		}
	}

	/* Prefers Reduced Motion */
	@media (prefers-reduced-motion: reduce) {
		.scroll-track {
			display: none;
		}
	}
</style>
