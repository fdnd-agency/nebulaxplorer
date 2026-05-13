<script>
	import rocket from '$lib/assets/logos/Scroll-rocket.svg'
	import { ScrollRocket } from '$lib'
</script>

<div class="scroll-track">
	<div class="vertical-line"></div>
	<div class="vertical-fill"></div>
	<div class="rocket-wrapper">
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

		@media (min-width: 768px) {
			width: 60px;
			right: 0;
			z-index: 100;
		}
	}

	/* basislijn */
	.vertical-line {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 1px;
		background: rgba(255, 255, 255, 0.15);
		transform: translateX(-50%);
	}

	/* gekleurde lijn */
	.vertical-fill {
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
	}

	/* rocket movement */
	@keyframes rocketMove {
		from {
			transform: translateX(-50%) translateY(0);
		}

		to {
			transform: translateX(-50%) translateY(calc(100vh - 100%));
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

		@media (min-width: 768px) {
			width: 40px;
		}
	}
</style>
