<script>
	import rocket from '$lib/assets/logos/Scroll-rocket.svg';
</script>

<div class="scroll-track">
	<div class="vertical-line"></div>

	<div class="rocket-wrapper">
		<img src={rocket} alt="Rocket" class="rocket" />
	</div>
</div>

<style>
.scroll-track {
	position: fixed;
	right: 0;
	top: 0;
	height: 100vh;
	width: 50px;
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
	top: 20px;
	transform: translateX(-50%);
}

.rocket {
	width: 26px;
}

@media (min-width: 768px) {
	.scroll-track {
		width: 50px;
	}

	.rocket {
		width: 40px;
	}
}
</style>