import assert from 'node:assert/strict'
import * as THREE from 'three'
import { createCadInstances } from '../../src/lib/scene/objects/CadInstances.js'
const root = new THREE.Group()
root.position.set(7, 8, 9)
const material = new THREE.MeshStandardMaterial({ color: 0x8899aa })
const source = []
for (let i = 0; i < 2; i++) {
	const geometry = new THREE.BufferGeometry()
	geometry.setAttribute(
		'position',
		new THREE.Int16BufferAttribute(
			[0, 0, 0, 32767, 0, 0, 0, 32767, 0],
			3,
			true,
		),
	)
	geometry.setAttribute(
		'normal',
		new THREE.Int16BufferAttribute(
			[0, 0, 32767, 0, 0, 32767, 0, 0, 32767],
			3,
			true,
		),
	)
	geometry.setIndex([0, 1, 2])
	const mesh = new THREE.Mesh(geometry, material)
	mesh.position.set(2 + i, 3 + i, 4)
	mesh.rotation.y = i * 0.3
	root.add(mesh)
	source.push(mesh)
}
root.updateMatrixWorld(true)
const expected = source.flatMap((mesh) =>
	Array.from({ length: 3 }, (_, i) =>
		new THREE.Vector3()
			.fromBufferAttribute(mesh.geometry.attributes.position, i)
			.applyMatrix4(mesh.matrixWorld),
	),
)
const masks = source.map((m) => m.layers.mask)
const batches = createCadInstances(root, () => 'structure')
root.updateMatrixWorld(true)
assert.equal(batches.renderRoot.children.length, 1)
const rendered = batches.renderRoot.children[0],
	positions = rendered.geometry.attributes.position
assert(positions.array instanceof Float32Array)
for (let i = 0; i < positions.count; i++) {
	const actual = new THREE.Vector3()
		.fromBufferAttribute(positions, i)
		.applyMatrix4(rendered.matrixWorld)
	assert(
		actual.distanceTo(expected[i]) < 1e-6,
		'Compressed coordinates were distorted while batching',
	)
	assert(
		Math.abs(
			new THREE.Vector3()
				.fromBufferAttribute(rendered.geometry.attributes.normal, i)
				.length() - 1,
		) < 1e-6,
	)
}
for (const mesh of source)
	assert(mesh.geometry.attributes.position.array instanceof Int16Array)
batches.dispose()
assert.deepEqual(
	source.map((m) => m.layers.mask),
	masks,
)
console.log(
	'PASS: normalized CAD coordinates decoded before transforms, exact placement/normals, original buffers and picking layers preserved.',
)
