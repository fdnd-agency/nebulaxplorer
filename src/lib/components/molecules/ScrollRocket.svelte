<script>
	import rocket from '$lib/assets/logos/Scroll-rocket.svg';
</script>

<div class="scroll-track">
	<!-- grijze basis -->
	<div class="vertical-line"></div>

	<!-- gekleurde progress -->
	<div class="vertical-fill"></div>

	<!-- rocket -->
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
	z-index: 100;

	@media (min-width: 768px) {
		width: 60px;
		right: 0;
	}
}

/* basislijn */
.vertical-line {
	position: absolute;
	left: 50%;
	top: 0;
	bottom: 0;
	width: 1px;
	background: rgba(255,255,255,0.15);

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

	background: linear-gradient(
		to bottom,
		#343434,
		#9d5d54
	);

	/* box-shadow:
		0 0 10px rgba(139,233,253,0.7),
		0 0 20px rgba(79,70,229,0.5); */

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
        /* Start bovenaan wanneer de lijn 100% is */
        transform: translateX(-50%) translateY(0);
    }

    to {
        /* Eindig onderaan wanneer de lijn naar 0% is gekrompen */
        transform: translateX(-50%) translateY(calc(100vh - 100%));
    }
}

/* Lijn krimpt van 1 naar 0 naar de bodem toe */
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