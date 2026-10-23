import { Vector3 } from 'three'

const projected = new Vector3()
const toAnchor = new Vector3()
const toCamera = new Vector3()

export function createMarkers(container, { onPreview, onSelect }) {
	let markers = []

	function createMarkerElement({ id, number, label }) {
		const element = document.createElement('a')
		element.className = 'viewer-marker'
		element.href = `#${id}`
		element.tabIndex = -1
		const badge = document.createElement('span')
		badge.className = 'viewer-marker-number'
		badge.textContent = number
		const name = document.createElement('span')
		name.className = 'viewer-marker-label'
		name.textContent = label
		element.append(badge, name)
		element.addEventListener('pointerenter', () => onPreview(id))
		element.addEventListener('pointerleave', () => onPreview(null))
		element.addEventListener('click', (event) => {
			event.preventDefault()
			onSelect(id)
		})
		return element
	}

	return {
		set(nextMarkers) {
			markers = nextMarkers.map((marker) => ({
				...marker,
				element: createMarkerElement(marker),
			}))
			container.replaceChildren(
				...markers.map((marker) => marker.element),
			)
		},
		setLabels(getLabel) {
			for (const marker of markers)
				marker.element.querySelector(
					'.viewer-marker-label',
				).textContent = getLabel(marker.id)
		},
		setPreview(id) {
			for (const marker of markers)
				marker.element.classList.toggle(
					'is-previewed',
					marker.id === id,
				)
		},
		setHidden(hidden) {
			container.classList.toggle('is-hidden', hidden)
		},
		update(camera, width, height, center) {
			for (const marker of markers) {
				projected.copy(marker.position).project(camera)
				const visible =
					projected.z < 1 &&
					Math.abs(projected.x) <= 1.02 &&
					Math.abs(projected.y) <= 1.02
				marker.element.hidden = !visible
				if (!visible) continue
				const x = ((projected.x + 1) / 2) * width
				const y = ((1 - projected.y) / 2) * height
				marker.element.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
				if (center) {
					toAnchor.copy(marker.position).sub(center)
					toCamera.copy(camera.position).sub(center)
					marker.element.classList.toggle(
						'is-behind',
						toAnchor.lengthSq() > 1e-6 &&
							toAnchor.dot(toCamera) < 0,
					)
				}
			}
		},
	}
}
