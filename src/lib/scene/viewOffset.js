export function createViewOffset(camera) {
	const current = { left: 0, bottom: 0 }
	const target = { left: 0, bottom: 0 }
	let width = 1
	let height = 1

	function applyOffset() {
		camera.setViewOffset(
			width,
			height,
			-current.left / 2,
			current.bottom / 2,
			width,
			height,
		)
	}

	return {
		setSize(nextWidth, nextHeight) {
			width = nextWidth
			height = nextHeight
			applyOffset()
		},
		setTarget({ left = 0, bottom = 0 }, immediate = false) {
			target.left = left
			target.bottom = bottom
			if (immediate) {
				current.left = left
				current.bottom = bottom
				applyOffset()
			}
		},
		update(delta) {
			const amount = 1 - Math.exp(-delta * 12)
			let moving = false
			for (const key of ['left', 'bottom']) {
				const distance = target[key] - current[key]
				if (Math.abs(distance) < 0.5) current[key] = target[key]
				else {
					current[key] += distance * amount
					moving = true
				}
			}
			applyOffset()
			return moving
		},
		getVisibleAspect() {
			return (
				Math.max(1, width - target.left) /
				Math.max(1, height - target.bottom)
			)
		},
	}
}
