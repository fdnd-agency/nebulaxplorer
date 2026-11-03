import fs from 'node:fs/promises'
import assert from 'node:assert/strict'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'

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

async function load(path) {
	return (await loader.loadAsync(new URL(path, import.meta.url).href)).scene
}

function collect(root) {
	const meshes = []
	const paths = []
	const colors = new Set()
	let triangles = 0
	root.updateWorldMatrix(true, true)
	root.traverse((object) => {
		if (!object.isMesh) return
		meshes.push(object)
		const ancestry = []
		for (let node = object; node; node = node.parent)
			ancestry.push(node.name ?? '')
		paths.push(ancestry.reverse().join('/'))
		triangles +=
			(object.geometry.index?.count ??
				object.geometry.attributes.position.count) / 3
		for (const material of [].concat(object.material)) {
			if (material?.color) colors.add(material.color.getHexString())
		}
	})
	const box = new THREE.Box3().setFromObject(root)
	return { meshes, paths, colors, triangles, box }
}

async function verifyPair(sourcePath, viewerPath, expectedColors) {
	const [source, viewer] = await Promise.all([
		load(sourcePath),
		load(viewerPath),
	])
	const a = collect(source)
	const b = collect(viewer)

	assert.equal(b.meshes.length, a.meshes.length, 'mesh count changed')
	assert.deepEqual(b.paths, a.paths, 'named mesh hierarchy changed')
	assert.deepEqual(
		[...b.colors].sort(),
		[...a.colors].sort(),
		'source color set changed',
	)
	assert.equal(b.colors.size, expectedColors, 'unexpected source color count')
	assert(b.triangles < a.triangles, 'viewer asset did not reduce triangles')
	assert(
		a.box.min.distanceTo(b.box.min) < 0.003,
		'minimum bounds changed too much',
	)
	assert(
		a.box.max.distanceTo(b.box.max) < 0.003,
		'maximum bounds changed too much',
	)

	return {
		sourcePath,
		viewerPath,
		meshes: b.meshes.length,
		colors: b.colors.size,
		sourceTriangles: a.triangles,
		viewerTriangles: b.triangles,
		reduction: 1 - b.triangles / a.triangles,
	}
}

const satellite = await verifyPair(
	'../../src/lib/assets/models/source/Satellite.source-colors.glb',
	'../../src/lib/assets/models/satellite/Satellite.viewer.glb',
	50,
)
const instrument = await verifyPair(
	'../../src/lib/assets/models/source/Instrument.source-colors.glb',
	'../../src/lib/assets/models/instrument/Instrument.viewer.glb',
	21,
)

console.log(JSON.stringify({ satellite, instrument }, null, 2))
