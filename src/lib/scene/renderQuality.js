const sampleSize = 30
const warmupFrames = 60
const raiseAfterFrames = 120
const stepSize = 0.25
const firstRetryMs = 10000
const longestRetryMs = 120000
// Below 50 fps motion starts to feel sluggish; faster screens are not chased
const slowestFrameMs = 1000 / 50

function percentile(values, fraction) {
	const sorted = [...values].sort((a, b) => a - b)
	return sorted[Math.floor((sorted.length - 1) * fraction)]
}

// Still frames always render at full sharpness and full detail. While the
// camera moves, quality only steps down when most recent frames are too slow
// (the first frames after loading and single hitches do not count): first to
// simplified meshes, which are hard to see in motion, then to a lower pixel
// ratio. It steps up again while frames keep up with the display. A step that
// was too slow is only retried after a wait that doubles every time it fails
// again, so it cannot flicker.
export function createRenderQuality(
	renderer,
	devicePixelRatio = window.devicePixelRatio,
) {
	const fullRatio = Math.min(devicePixelRatio, 2)
	const minimumRatio = Math.min(devicePixelRatio, 0.75)
	// Step 0 is full detail, step 1 simplified meshes, every further step a
	// lower pixel ratio
	const lowestStep = 1 + Math.ceil((fullRatio - minimumRatio) / stepSize - 1e-9)
	const ratioAt = (step) =>
		Math.max(minimumRatio, fullRatio - stepSize * Math.max(0, step - 1))
	const frames = []
	let step = 0
	// Per step that was too slow: how long to wait and when to retry it
	const retryWaits = new Map()
	const retryTimes = new Map()
	// Time spent moving, the clock for retries
	let movingMs = 0
	// Assume 60 Hz until faster frames show a higher refresh rate
	let frameInterval = 1000 / 60
	let measuredFrames = 0
	let fastFrames = 0
	let lastMoving = false

	function lower() {
		const previousWait = retryWaits.get(step)
		const wait = previousWait
			? Math.min(longestRetryMs, previousWait * 2)
			: firstRetryMs
		retryWaits.set(step, wait)
		retryTimes.set(step, movingMs + wait)
		step++
		frames.length = 0
		fastFrames = 0
	}

	function measure(frameMs) {
		measuredFrames++
		movingMs += frameMs
		if (measuredFrames <= warmupFrames) return
		frames.push(frameMs)
		if (frames.length > sampleSize) frames.shift()
		if (frames.length < sampleSize) return
		frameInterval = Math.max(
			4,
			Math.min(frameInterval, percentile(frames, 0.1)),
		)
		const budget = Math.max(slowestFrameMs, frameInterval * 1.4)
		const typical = percentile(frames, 0.5)
		if (typical > budget) {
			if (step < lowestStep) lower()
			return
		}
		const allowed = movingMs >= (retryTimes.get(step - 1) ?? 0)
		if (step > 0 && allowed && typical < frameInterval * 1.15) fastFrames++
		else fastFrames = 0
		if (fastFrames >= raiseAfterFrames) {
			step--
			frames.length = 0
			fastFrames = 0
		}
	}

	return {
		// True once this device needs simplified meshes while moving fast
		isReduced() {
			return step > 0
		},
		// `measurable` is false while models are still loading
		update(frameMs, moving, measurable = true) {
			if (!moving || !lastMoving) frames.length = 0
			else if (frameMs > 0 && measurable) measure(frameMs)
			lastMoving = moving
			const ratio = moving ? ratioAt(step) : fullRatio
			if (Math.abs(renderer.getPixelRatio() - ratio) > 0.01)
				renderer.setPixelRatio(ratio)
		},
	}
}
