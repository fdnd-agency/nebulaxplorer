// Keep DOM text sharp while adjusting only the WebGL drawing resolution.
export function createRenderQuality(renderer, devicePixelRatio = window.devicePixelRatio) {
	const stillRatio = Math.min(devicePixelRatio, 2);
	const motionRatio = Math.min(devicePixelRatio, 1.5);
	const minimumRatio = Math.min(devicePixelRatio, 0.8);
	let adaptiveRatio = motionRatio;
	let average = 20;
	let samples = 0;
	let lastMoving = false;

	return {
		update(frameMs, moving, interacting) {
			if (!lastMoving) { average = 20; samples = 0; }
			if (moving && lastMoving && frameMs > 0) {
				average += (Math.min(frameMs, 200) - average) * 0.15;
				samples++;
				if (samples >= 20 && average > 28 && adaptiveRatio > minimumRatio) {
					adaptiveRatio = Math.max(minimumRatio, adaptiveRatio - 0.15);
					samples = 0;
				} else if (samples >= 120 && average < 18 && adaptiveRatio < motionRatio) {
					adaptiveRatio = Math.min(motionRatio, adaptiveRatio + 0.05);
					samples = 0;
				}
			}
			lastMoving = moving;
			const ratio = moving ? Math.min(adaptiveRatio, interacting ? 1.25 : motionRatio) : stillRatio;
			if (Math.abs(renderer.getPixelRatio() - ratio) > 0.01) renderer.setPixelRatio(ratio);
		},
	};
}
