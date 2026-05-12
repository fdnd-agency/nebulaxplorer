<script>
	import rocket from '$lib/assets/logos/Scroll-rocket.svg';
	import { ScrollRocket } from '$lib'
</script>

<div class="scroll-track">
	<div class="vertical-line"></div>

	<div class="rocket-wrapper">
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

/* lijn in het midden */
.vertical-line {
	position: absolute;
	left: 50%;
	top: 0;
	bottom: 0;
	width: 1px;
	background: rgba(255, 255, 255, 0.15);
	transform: translateX(-50%);
}

/* 🚀 ROCKET ANIMATION (scroll-driven) */
.rocket-wrapper {
	position: absolute;
	left: 50%;
	top: 0;
	transform: translateX(-50%);

	animation: rocketMove linear both;
	animation-timeline: scroll(root);
	animation-range: 0% 100%;
}

/* beweging van top → bottom van viewport */
@keyframes rocketMove {
	from {
		transform: translateX(-50%) translateY(0);
	}

	to {
		transform: translateX(-50%) translateY(calc(100vh - 20px));
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