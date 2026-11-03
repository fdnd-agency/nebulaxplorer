import fs from 'node:fs/promises'
import assert from 'node:assert/strict'
import * as THREE from 'three'
import { opticalComponents } from '../../src/lib/scene/objects/OpticalComponents.js'
import {
	createOptics,
	createPartViewer,
} from '../../src/lib/scene/objects/Optics.js'
globalThis.self = globalThis
globalThis.ProgressEvent = class {
	constructor(type, init) {
		Object.assign(this, init)
	}
}
const nativeFetch = globalThis.fetch
globalThis.fetch = async (r) => {
	const url = typeof r === 'string' ? r : r.url
	return url.startsWith('file:')
		? new Response(await fs.readFile(new URL(url)))
		: nativeFetch(r)
}
const scene = new THREE.Scene()
const optics = createOptics(scene)
assert(!optics.root.visible)
optics.show(true)
optics.setPlaying(true)
assert(optics.isAnimating())
optics.update(900)
let rays = 0
optics.root.traverse((o) => {
	if (o.isLine) {
		rays++
		const a = o.geometry.attributes.position
		assert.equal(a.count, 4)
		assert.equal(a.getX(3), 0)
		assert.equal(a.getY(3), -2.5)
	}
})
assert.equal(rays, 6)
optics.root.updateMatrixWorld(true)
const tube = optics.root.children.find(
	(object) => object.userData.component === 'tube',
)
const tubeVertex = new THREE.Vector3()
const tubeRadiusAt = (height) => {
	let radius = 0
	const position = tube.geometry.attributes.position
	for (let index = 0; index < position.count; index++) {
		tubeVertex
			.fromBufferAttribute(position, index)
			.applyMatrix4(tube.matrixWorld)
		if (Math.abs(tubeVertex.y - height) < 1e-4)
			radius = Math.max(radius, Math.hypot(tubeVertex.x, tubeVertex.z))
	}
	return radius
}
const tubeBounds = new THREE.Box3().setFromObject(tube)
const tubeTop = tubeRadiusAt(tubeBounds.max.y)
const tubeBottom = tubeRadiusAt(tubeBounds.min.y)
assert(tubeTop > tubeBottom, 'stray-light tube must narrow toward the detector')
const detector = optics.root.children.find(
	(object) => object.userData.component === 'fpm',
)
assert(tubeBounds.min.y > detector.position.y, 'tube sits above the detector')
let rayChecks = 0
optics.root.traverse((object) => {
	if (!object.isLine) return
	const a = object.geometry.attributes.position
	const start = new THREE.Vector3().fromBufferAttribute(a, 2)
	const end = new THREE.Vector3().fromBufferAttribute(a, 3)
	for (let step = 0; step <= 20; step++) {
		const height = THREE.MathUtils.lerp(
			tubeBounds.min.y,
			tubeBounds.max.y,
			step / 20,
		)
		const t = (height - start.y) / (end.y - start.y)
		const radius = Math.abs(THREE.MathUtils.lerp(start.x, end.x, t))
		const wall = THREE.MathUtils.lerp(tubeBottom, tubeTop, step / 20)
		assert(
			radius <= wall + 1e-6,
			'X-ray path must pass inside the stray-light tube',
		)
		rayChecks++
	}
})
assert.equal(rayChecks, 6 * 21)
optics.select('tube')
assert(
	tube.material.userData.selectionHighlight,
	'tube highlight targets the tube mesh',
)
optics.clearSelection()
const tubeAnchor = optics.getAnchor('tube')
assert(tubeAnchor.y <= tubeBounds.max.y && tubeAnchor.y >= tubeBounds.min.y)
optics.hide()
assert(!optics.isAnimating())
const parts = createPartViewer(scene)
for (const key of ['primary', 'secondary', 'fpm', 'fpcm']) {
	const root = await parts.load(key)
	assert(!root.visible)
	parts.show(root)
	assert(root.visible)
	assert.equal(opticalComponents[key].cadPart, key)
	const meshes = []
	root.traverse((mesh) => {
		if (mesh.isMesh) {
			meshes.push(mesh)
			assert.equal(parts.getComponent(mesh), key)
		}
	})
	const originals = meshes.map((mesh) => mesh.material)
	parts.highlightAll()
	assert(meshes.every((mesh, i) => mesh.material !== originals[i]))
	parts.clearSelection()
	assert(meshes.every((mesh, i) => mesh.material === originals[i]))
	assert(
		optics.root
			.getObjectsByProperty('isMesh', true)
			.some((mesh) => mesh.userData.component === key),
	)
	parts.hide()
	assert(!root.visible)
	const bounds = new THREE.Box3().setFromObject(root)
	assert(!bounds.isEmpty())
}
console.log(
	'PASS: six paths with two bends terminate at detector and pass inside the narrowing stray-light tube; animation/visibility; four CAD assets decode, frame and hide.',
)
