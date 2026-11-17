import { BufferAttribute } from 'three'

export function createMotionDetail() {
	let worker
	try {
		worker = new Worker(new URL('./simplify.worker.js', import.meta.url), {
			type: 'module',
		})
	} catch {
		return { update() {} }
	}
	const records = new Map()
	const queue = []
	let active = null
	let nextId = 0
	let stopped = false
	function pump() {
		if (active || stopped || !queue.length) return
		active = queue.shift()
		const { geometry, id, full } = active
		const position = geometry.attributes.position
		const normal = geometry.attributes.normal
		const positions = new Float32Array(position.count * 3)
		const normals = new Float32Array(normal.count * 3)
		for (let i = 0; i < position.count; i++) {
			positions.set(
				[position.getX(i), position.getY(i), position.getZ(i)],
				i * 3,
			)
			normals.set([normal.getX(i), normal.getY(i), normal.getZ(i)], i * 3)
		}
		const indices = new Uint32Array(full.array)
		worker.postMessage({ id, positions, normals, indices }, [
			positions.buffer,
			normals.buffer,
			indices.buffer,
		])
	}
	function schedule() {
		if (typeof requestIdleCallback === 'function')
			requestIdleCallback(pump, { timeout: 1000 })
		else setTimeout(pump, 0)
	}
	worker.onmessage = ({ data }) => {
		if (active?.id !== data.id) return
		if (data.indices && data.indices.length < active.full.count)
			active.motion = new BufferAttribute(data.indices, 1)
		active = null
		schedule()
	}
	worker.onerror = () => {
		stopped = true
		active = null
		queue.length = 0
		worker.terminate()
	}
	return {
		getStats() {
			return {
				pending: queue.length + (active ? 1 : 0),
				geometries: records.size,
				ready: [...records.values()].filter((r) => r.motion).length,
			}
		},
		update(roots, moving) {
			for (const root of roots) {
				if (!root?.visible) continue
				root.userData.cadInstances?.renderRoot.traverse((mesh) => {
					if (
						!mesh.isMesh ||
						!mesh.visible ||
						mesh.userData.cadComponent === 'solarPanel'
					)
						return
					const geometry = mesh.geometry
					let record = records.get(geometry)
					if (
						!record &&
						(!geometry.index ||
							!geometry.attributes.normal ||
							geometry.index.count < 300)
					)
						return
					if (!record) {
						record = {
							geometry,
							id: nextId++,
							full: geometry.index,
							motion: null,
						}
						records.set(geometry, record)
						queue.push(record)
						schedule()
						geometry.addEventListener('dispose', () => {
							records.delete(geometry)
							const index = queue.indexOf(record)
							if (index >= 0) queue.splice(index, 1)
						})
					}
					geometry.setIndex(
						moving && record.motion ? record.motion : record.full,
					)
				})
			}
		},
	}
}
