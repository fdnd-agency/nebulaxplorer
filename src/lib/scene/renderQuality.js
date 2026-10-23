export function createRenderQuality(
	renderer,
	devicePixelRatio = window.devicePixelRatio,
) {
	const stillRatio = Math.min(devicePixelRatio, 1.5)
	const motionRatio = Math.min(devicePixelRatio, 1)
	const minimumRatio = Math.min(devicePixelRatio, 0.5)
	let adaptiveRatio = motionRatio
	let average = 20
	let samples = 0
	let lastMoving = false
	return {
		update(frameMs, moving, interacting) {
			if (!lastMoving) {
				average = 20
				samples = 0
			}
			if (moving && lastMoving && frameMs > 0) {
				average += (Math.min(frameMs, 200) - average) * 0.2
				samples++
				if (
					samples >= 6 &&
					average > 25 &&
					adaptiveRatio > minimumRatio
				) {
					adaptiveRatio = Math.max(minimumRatio, adaptiveRatio - 0.15)
					samples = 0
				} else if (
					samples >= 180 &&
					average < 18 &&
					adaptiveRatio < motionRatio
				) {
					adaptiveRatio = Math.min(motionRatio, adaptiveRatio + 0.05)
					samples = 0
				}
			}
			lastMoving = moving
			const ratio = moving ? adaptiveRatio : stillRatio
			if (Math.abs(renderer.getPixelRatio() - ratio) > 0.01)
				renderer.setPixelRatio(ratio)
		},
	}
}
