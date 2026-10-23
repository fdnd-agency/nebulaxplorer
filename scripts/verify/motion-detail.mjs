import assert from 'node:assert/strict'
import { BoxGeometry, Group, Mesh } from 'three'
import { createMotionDetail } from '../../src/lib/scene/objects/MotionDetail.js'

const previousWorker = globalThis.Worker
globalThis.Worker = class {
	postMessage({ id, indices }) {
		queueMicrotask(() =>
			this.onmessage({ data: { id, indices: indices.slice(0, 12) } }),
		)
	}
	terminate() {}
}
try {
	const geometry = new BoxGeometry(1, 1, 1, 8, 8, 8)
	const source = new Mesh(geometry)
	const rendered = new Mesh(geometry.clone())
	const root = new Group(),
		renderRoot = new Group()
	root.add(source, renderRoot)
	renderRoot.add(rendered)
	root.userData.cadInstances = { renderRoot }
	const full = rendered.geometry.index
	const pickingIndex = source.geometry.index
	const detail = createMotionDetail()
	detail.update([root], false)
	while (detail.getStats().pending)
		await new Promise((resolve) => setTimeout(resolve, 1))
	assert.equal(detail.getStats().ready, 1)
	detail.update([root], true)
	assert.equal(rendered.geometry.index.count, 12)
	assert.equal(source.geometry.index, pickingIndex)
	assert.equal(source.geometry.index.count, 2304)
	detail.update([root], false)
	assert.equal(rendered.geometry.index, full)
	detail.update([root], true)
	detail.update([root], false)
	assert.equal(rendered.geometry.index.count, 2304)
	rendered.geometry.dispose()
	assert.equal(detail.getStats().geometries, 0)
	globalThis.Worker = class {
		constructor() {
			throw new Error('Workers unavailable')
		}
	}
	assert.doesNotThrow(() => createMotionDetail().update([root], true))
	console.log(
		'PASS: motion detail, exact restoration below 300 indices, unchanged picking geometry, disposal and worker fallback.',
	)
} finally {
	globalThis.Worker = previousWorker
}
