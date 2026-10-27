import fs from 'node:fs/promises'
import assert from 'node:assert/strict'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'
import { createCadInstances } from '../../src/lib/scene/objects/CadInstances.js'
import { createInstrumentComponents } from '../../src/lib/scene/objects/InstrumentComponents.js'
import { createRenderQuality } from '../../src/lib/scene/renderQuality.js'
import {
	loadSatellite,
	getSatellite,
	loadInstrument,
	getComponentFromObject,
	highlightComponent,
	showSatellite,
	showSatelliteInterior,
	showInstrument,
	showInstrumentInterior,
} from '../../src/lib/scene/objects/Satellite.js'
globalThis.ProgressEvent = class {
	constructor(type, init) {
		Object.assign(this, init)
	}
}
globalThis.self = globalThis
const nativeFetch = globalThis.fetch
globalThis.fetch = async (request) => {
	const url = typeof request === 'string' ? request : request.url
	return url.startsWith('file:')
		? new Response(await fs.readFile(new URL(url)))
		: nativeFetch(request)
}
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder)
const scene = new THREE.Scene()
await new Promise((resolve, reject) =>
	loadSatellite(scene, { onLoad: resolve, onError: reject }),
)
const root = getSatellite()
const originals = []
root.traverse((mesh) => {
	if (mesh.isMesh) originals.push(mesh)
})
const triangles = (mesh) =>
	(mesh.geometry.index?.count ?? mesh.geometry.attributes.position.count) / 3
const sum = (meshes) =>
	meshes.reduce((total, mesh) => total + triangles(mesh), 0)
const originalSource = (
	await loader.loadAsync(
		new URL(
			'../../src/lib/assets/models/source/Satellite.source-colors.glb',
			import.meta.url,
		).href,
	)
).scene
const sourceMeshes = []
originalSource.traverse((mesh) => {
	if (mesh.isMesh) sourceMeshes.push(mesh)
})
assert.equal(originals.length, sourceMeshes.length)
const colors = (meshes) =>
	new Set(
		meshes.flatMap((mesh) =>
			[]
				.concat(mesh.material)
				.map((material) => material.color.getHexString()),
		),
	)
assert.deepEqual(colors(originals), colors(sourceMeshes))
assert(sum(originals) <= sum(sourceMeshes))
const originalBounds = new THREE.Box3().setFromObject(originalSource),
	viewerBounds = new THREE.Box3().setFromObject(root)
assert(originalBounds.min.distanceTo(viewerBounds.min) < 0.003)
assert(originalBounds.max.distanceTo(viewerBounds.max) < 0.003)
const savedMaterials = new Map(originals.map((mesh) => [mesh, mesh.material]))
const instances = createCadInstances(root, getComponentFromObject)
function renderMeshes(model) {
	const rendered = []
	model.traverse((mesh) => {
		if (!mesh.isMesh || !mesh.layers.isEnabled(0)) return
		for (let node = mesh; node; node = node.parent)
			if (!node.visible) return
		rendered.push(mesh)
	})
	return rendered
}
function renderTriangles(model) {
	return renderMeshes(model).reduce(
		(total, mesh) =>
			total + triangles(mesh) * (mesh.isInstancedMesh ? mesh.count : 1),
		0,
	)
}
assert.equal(renderTriangles(root), sum(originals))
const fullCalls = renderMeshes(root).length
assert(fullCalls < originals.length * 0.2)
showSatelliteInterior()
instances.sync()
assert.equal(
	renderTriangles(root),
	sum(originals.filter((mesh) => mesh.visible)),
)
highlightComponent('starTrackerModule')
instances.sync()
for (const mesh of renderMeshes(root)) {
	const component = mesh.userData.renderBatch
		? mesh.userData.cadComponent
		: getComponentFromObject(mesh)
	assert.equal(
		Boolean(mesh.material.userData.selectionHighlight),
		component === 'starTrackerModule',
	)
	if (component !== 'starTrackerModule') {
		assert(mesh.material.isMeshStandardMaterial)
		assert.equal(mesh.material.opacity, 0.12)
	}
}
const sensor = originals.find(
	(mesh) => getComponentFromObject(mesh) === 'sunSensor',
)
assert(sensor.layers.isEnabled(1))
const box = new THREE.Box3().setFromObject(sensor),
	center = box.getCenter(new THREE.Vector3())
const ray = new THREE.Raycaster(
	center.clone().add(new THREE.Vector3(0, 1, 0)),
	new THREE.Vector3(0, -1, 0),
)
ray.layers.enable(1)
assert(ray.intersectObject(sensor, false).some((hit) => hit.object === sensor))
highlightComponent(null)
showSatellite()
instances.sync()
assert.equal(renderTriangles(root), sum(originals))
for (const mesh of originals)
	assert.equal(mesh.material, savedMaterials.get(mesh))
instances.dispose()
assert.equal(renderMeshes(root).length, originals.length)
const instrument = await loadInstrument(scene)
showInstrument()
const instrumentSources = []
instrument.traverse((mesh) => {
	if (mesh.isMesh) instrumentSources.push(mesh)
})
const components = createInstrumentComponents(instrument),
	instrumentInstances = createCadInstances(
		instrument,
		components.getComponent,
	)
assert.equal(renderTriangles(instrument), sum(instrumentSources))
const instrumentCalls = renderMeshes(instrument).length
assert(instrumentCalls < instrumentSources.length * 0.25)
showInstrumentInterior()
instrumentInstances.sync()
assert.equal(
	renderTriangles(instrument),
	sum(instrumentSources.filter((mesh) => mesh.visible)),
)
components.highlight('detectors')
instrumentInstances.sync()
for (const mesh of renderMeshes(instrument)) {
	const component = mesh.userData.renderBatch
		? mesh.userData.cadComponent
		: components.getComponent(mesh)
	assert.equal(
		Boolean(mesh.material.userData.selectionHighlight),
		component === 'detectors',
	)
}
components.clearHighlight()
showInstrument()
instrumentInstances.sync()
assert.equal(renderTriangles(instrument), sum(instrumentSources))
instrumentInstances.dispose()
let ratio = 2
const quality = createRenderQuality(
	{
		getPixelRatio: () => ratio,
		setPixelRatio: (value) => {
			ratio = value
		},
	},
	2,
)
const frames = (count, frameMs, moving = true) => {
	for (let i = 0; i < count; i++) quality.update(frameMs, moving)
}
// Slow frames while loading and right after it, and single hitches,
// keep full sharpness
frames(1, 0)
for (let i = 0; i < 100; i++) quality.update(60, true, false)
frames(50, 45)
frames(200, 16.7)
assert.equal(ratio, 2)
for (let i = 0; i < 60; i++) frames(1, i % 10 === 0 ? 180 : 16.7)
assert.equal(ratio, 2)
// Something else briefly using the GPU lowers the ratio, which recovers afterwards
frames(300, 40)
assert(ratio < 2)
frames(5000, 16.7)
assert.equal(ratio, 2)
// A 60 Hz device whose frame cost grows with the pixels settles at the sharpest
// ratio that keeps up, and retries a sharper one less and less often
const device = createRenderQuality(
	{
		getPixelRatio: () => ratio,
		setPixelRatio: (value) => {
			ratio = value
		},
	},
	2,
)
const deviceFrame = () => Math.ceil((10 * ratio ** 2) / 16.7) * 16.7
const run = (count) => {
	const changes = []
	for (let i = 0; i < count; i++) {
		const before = ratio
		device.update(deviceFrame(), true)
		if (ratio !== before) changes.push(i)
	}
	return changes
}
device.update(0, true)
run(1000)
assert.equal(ratio, 1.25)
// Ten minutes of motion: a handful of short retries, not constant switching
const changes = run(36000)
assert(changes.length <= 16, `${changes.length} ratio changes`)
assert([1.25, 1.5].includes(ratio))
// Still frames are always fully sharp
device.update(0, false)
assert.equal(ratio, 2)
// Consistently missed frames go down step by step, not below 0.75
device.update(0, true)
for (let i = 0; i < 500; i++) device.update(60, true)
assert.equal(ratio, 0.75)
console.log(
	JSON.stringify({
		sourceTriangles: sum(sourceMeshes),
		viewerTriangles: sum(originals),
		satelliteCalls: fullCalls,
		instrumentCalls,
		sourceColors: colors(originals).size,
		instancing: instances.stats,
		checks: 'geometry coverage, CAD colors/bounds, source picking, highlights, cutaways/restoration, disposal, adaptive/still resolution',
	}),
)
