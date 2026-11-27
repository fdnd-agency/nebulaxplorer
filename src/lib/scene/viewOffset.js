export function createViewOffset(camera) {
	// The space the explorer covers on each side of the 3D view
	const current = { left: 0, right: 0, bottom: 0 }
	const target = { left: 0, right: 0, bottom: 0 }
	let width = 1
	let height = 1

	function applyOffset() {
		camera.setViewOffset(
			width,
			height,
			(current.right - current.left) / 2,
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
		setTarget({ left = 0, right = 0, bottom = 0 }, immediate = false) {
			target.left = left
			target.right = right
			target.bottom = bottom
			if (immediate) {
				current.left = left
				current.right = right
				current.bottom = bottom
				applyOffset()
			}
		},
		update(delta) {
			const amount = 1 - Math.exp(-delta * 12)
			let moving = false
			for (const key of ['left', 'right', 'bottom']) {
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
				Math.max(1, width - target.left - target.right) /
				Math.max(1, height - target.bottom)
			)
		},
	}
}
