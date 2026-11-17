// Renders stills of the satellite and its parts with the viewer's own scene
// modules: the same models, CAD colours, component mapping, lighting and tone
// mapping as the 3D viewer. Driven by scripts/render-stills.mjs.
import * as THREE from 'three'
import { createLights } from '../../src/lib/scene/lights.js'
import { createStars } from '../../src/lib/scene/objects/star.js'
import {
	getComponentAnchor,
	getComponentFromObject,
	loadInstrument,
	loadSatellite,
	setView,
	showInstrumentInterior,
	showSatellite,
} from '../../src/lib/scene/objects/Satellite.js'
import { createInstrumentComponents } from '../../src/lib/scene/objects/InstrumentComponents.js'
import {
	createOptics,
	createPartViewer,
} from '../../src/lib/scene/objects/Optics.js'

const background = 0x05080e
const canvas = document.querySelector('#still')
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
	alpha: true,
	preserveDrawingBuffer: true,
})
renderer.setPixelRatio(1)
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.9
const scene = new THREE.Scene()
const lights = createLights(scene, renderer)
const camera = new THREE.PerspectiveCamera(20, 1, 0.01, 1000)
const stars = createStars(14000, scene)

let satellite
let assembly
let instrument
let instrumentParts
let optics
let parts
const satelliteVisibility = new Map()

async function load() {
	satellite = await new Promise((resolve, reject) =>
		loadSatellite(scene, { onLoad: resolve, onError: reject }),
	)
	showSatellite()
	satellite.updateMatrixWorld(true)
	satellite.traverse((object) => {
		if (object.isMesh) satelliteVisibility.set(object, object.visible)
	})
	// The CAD assembly is the first node with the top-level parts as children
	assembly = satellite
	while (assembly.children.length === 1) assembly = assembly.children[0]
	instrument = await loadInstrument(scene)
	instrumentParts = createInstrumentComponents(instrument)
	optics = createOptics(scene)
	parts = createPartViewer(scene)
	for (const key of ['primary', 'secondary', 'fpm', 'fpcm'])
		await parts.load(key)
	hideAll()
	return true
}

function hideAll() {
	satellite.visible = false
	instrument.visible = false
	optics.hide()
	parts.hide()
	stars.visible = false
	for (const [mesh, visible] of satelliteVisibility) mesh.visible = visible
}

function topLevelPart(mesh) {
	for (let object = mesh; object; object = object.parent)
		if (object.parent === assembly) return object
	return null
}

// The top-level CAD parts that belong to a satellite component
function componentInstances(component) {
	const instances = new Map()
	satellite.traverse((mesh) => {
		if (!mesh.isMesh || getComponentFromObject(mesh) !== component) return
		const part = topLevelPart(mesh)
		if (!instances.has(part)) instances.set(part, [])
		instances.get(part).push(mesh)
	})
	return [...instances].map(([part, meshes]) => ({
		name: part?.name ?? '',
		meshes,
		box: boxOf(meshes),
	}))
}

function boxOf(meshes) {
	const box = new THREE.Box3()
	for (const mesh of meshes) box.expandByObject(mesh)
	return box
}

function corners(box) {
	const { min, max } = box
	return [0, 1, 2, 3, 4, 5, 6, 7].map(
		(i) =>
			new THREE.Vector3(
				i & 1 ? max.x : min.x,
				i & 2 ? max.y : min.y,
				i & 4 ? max.z : min.z,
			),
	)
}

// World positions of (a sample of) the vertices of the visible meshes
function pointsOf(meshes, limit = 60000) {
	const total = meshes.reduce(
		(sum, mesh) => sum + mesh.geometry.attributes.position.count,
		0,
	)
	const step = Math.max(1, Math.floor(total / limit))
	const points = []
	const point = new THREE.Vector3()
	for (const mesh of meshes) {
		const position = mesh.geometry.attributes.position
		for (let i = 0; i < position.count; i += step)
			points.push(
				point
					.fromBufferAttribute(position, i)
					.applyMatrix4(mesh.matrixWorld)
					.clone(),
			)
	}
	return points
}

// Places the camera along `direction` so the points fill the frame with
// `margin`, centred on what is actually visible from that side
function frameBox(box, direction, { margin = 0.82, aspect, points }) {
	const radius = box.getBoundingSphere(new THREE.Sphere()).radius
	const dir = new THREE.Vector3(...direction).normalize()
	const samples = points ?? corners(box)
	let center = box.getCenter(new THREE.Vector3())
	camera.aspect = aspect
	camera.up.set(0, 1, 0)
	if (Math.abs(dir.y) > 0.98) camera.up.set(0, 0, -1)
	const tanY = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * margin
	const tanX = tanY * aspect
	let distance = radius * 4
	// Two passes: centre on the projected extent, then fit the distance
	for (let pass = 0; pass < 3; pass++) {
		camera.position.copy(center).addScaledVector(dir, distance)
		camera.lookAt(center)
		camera.updateMatrixWorld()
		const inverse = camera.matrixWorldInverse
		const centerView = center.clone().applyMatrix4(inverse)
		let minX = Infinity
		let maxX = -Infinity
		let minY = Infinity
		let maxY = -Infinity
		const offsets = samples.map((sample) => {
			const offset = sample.clone().applyMatrix4(inverse).sub(centerView)
			// Perspective position at the current distance
			const scale = distance / (distance - offset.z)
			minX = Math.min(minX, offset.x * scale)
			maxX = Math.max(maxX, offset.x * scale)
			minY = Math.min(minY, offset.y * scale)
			maxY = Math.max(maxY, offset.y * scale)
			return offset
		})
		const right = new THREE.Vector3().setFromMatrixColumn(
			camera.matrixWorld,
			0,
		)
		const up = new THREE.Vector3().setFromMatrixColumn(
			camera.matrixWorld,
			1,
		)
		center = center
			.clone()
			.addScaledVector(right, (minX + maxX) / 2)
			.addScaledVector(up, (minY + maxY) / 2)
		const shiftX = (minX + maxX) / 2
		const shiftY = (minY + maxY) / 2
		distance = 0
		for (const offset of offsets) {
			// offset.z > 0 means the point is closer to the camera than the centre
			distance = Math.max(
				distance,
				Math.abs(offset.x - shiftX) / tanX + offset.z,
				Math.abs(offset.y - shiftY) / tanY + offset.z,
			)
		}
	}
	camera.position.copy(center).addScaledVector(dir, distance)
	camera.near = Math.max(distance - radius * 2, distance * 0.02)
	camera.far = distance + radius * 4 + 1000
	camera.lookAt(center)
	camera.updateProjectionMatrix()
	lights.update(camera, center)
	return { center, distance }
}

function draw(
	width,
	height,
	{
		opaque = false,
		type = 'image/png',
		color = background,
		studio = false,
	} = {},
) {
	renderer.setSize(width, height, false)
	renderer.setClearColor(color, opaque ? 1 : 0)
	scene.background = studio ? studioBackdrop(width, height) : null
	renderer.render(scene, camera)
	scene.background?.dispose?.()
	scene.background = null
	return canvas.toDataURL(type, 0.95)
}

// A quiet, light studio backdrop for close-ups, so dark sensors and the
// edges of mirrors stay visible
function studioBackdrop(width, height) {
	const backdrop = document.createElement('canvas')
	backdrop.width = width
	backdrop.height = height
	const context = backdrop.getContext('2d')
	const gradient = context.createRadialGradient(
		width * 0.5,
		height * 0.42,
		0,
		width * 0.5,
		height * 0.5,
		Math.hypot(width, height) * 0.62,
	)
	gradient.addColorStop(0, '#eef0f3')
	gradient.addColorStop(0.6, '#dde1e7')
	gradient.addColorStop(1, '#c4cad4')
	context.fillStyle = gradient
	context.fillRect(0, 0, width, height)
	const texture = new THREE.CanvasTexture(backdrop)
	texture.colorSpace = THREE.SRGBColorSpace
	return texture
}

// Selection colour: a restrained cool blue, the same in every location view
const selectionColor = new THREE.Color(0x8ab4ff)
const dimColor = new THREE.Color(0x181932)

// Keeps `meshes` in their own CAD colours and dims everything else towards
// the navy of the page: matte and darker, so reflections on metal parts do
// not compete with the selection. With `ghost` the rest becomes see-through
// instead, like the viewer's own selection inside the instrument, whose
// parts are mostly white. Returns a function that undoes it.
function emphasise(meshes, { ghost = false } = {}) {
	const keep = new Set(meshes)
	const dimmed = new Map()
	const undo = []
	const dim = (original) => {
		if (!dimmed.has(original)) {
			const material = original.clone()
			material.color?.lerp(dimColor, ghost ? 0.55 : 0.86)
			if (material.emissive) material.emissive.setScalar(0)
			if ('metalness' in material) material.metalness = 0
			if ('roughness' in material) material.roughness = 0.95
			material.envMapIntensity = 0.25
			if (ghost) {
				material.transparent = true
				material.opacity = 0.16
				material.depthWrite = false
			}
			dimmed.set(original, material)
		}
		return dimmed.get(original)
	}
	scene.traverse((mesh) => {
		if (!mesh.isMesh || keep.has(mesh)) return
		const original = mesh.material
		mesh.material = Array.isArray(original)
			? original.map(dim)
			: dim(original)
		undo.push(() => (mesh.material = original))
	})
	return () => {
		for (const step of undo) step()
		for (const material of dimmed.values()) material.dispose()
	}
}

// Renders which pixels belong to the visible part of `meshes` (white) and
// which to everything else (black), so the halo follows what is in front.
// Without `occlude` the rest is left out, for see-through surroundings.
function selectionMask(meshes, width, height, { occlude = true } = {}) {
	const keep = new Set(meshes)
	const white = new THREE.MeshBasicMaterial({ color: 0xffffff })
	const black = new THREE.MeshBasicMaterial({ color: 0x000000 })
	const restore = []
	scene.traverse((mesh) => {
		if (!mesh.isMesh) return
		restore.push([mesh, mesh.material, mesh.visible])
		mesh.material = keep.has(mesh) ? white : black
		if (!occlude && !keep.has(mesh)) mesh.visible = false
	})
	const toneMapping = renderer.toneMapping
	renderer.toneMapping = THREE.NoToneMapping
	renderer.setSize(width, height, false)
	renderer.setClearColor(0x000000, 1)
	renderer.render(scene, camera)
	const mask = document.createElement('canvas')
	mask.width = width
	mask.height = height
	mask.getContext('2d').drawImage(canvas, 0, 0)
	renderer.toneMapping = toneMapping
	for (const [mesh, material, visible] of restore) {
		mesh.material = material
		mesh.visible = visible
	}
	white.dispose()
	black.dispose()
	return mask
}

// Draws a cool-blue ring around the visible outline of the selection on top
// of the render, so even a small part stands out without changing its colours
async function withHalo(png, mask, ring) {
	const { width, height } = mask
	const image = new Image()
	image.src = png
	await image.decode()
	const alpha = document.createElement('canvas')
	alpha.width = width
	alpha.height = height
	const alphaContext = alpha.getContext('2d')
	alphaContext.drawImage(mask, 0, 0)
	const pixels = alphaContext.getImageData(0, 0, width, height)
	const [r, g, b] = selectionColor.toArray().map((c) => Math.round(c * 255))
	for (let i = 0; i < pixels.data.length; i += 4) {
		const value = pixels.data[i]
		pixels.data[i] = r
		pixels.data[i + 1] = g
		pixels.data[i + 2] = b
		pixels.data[i + 3] = value
	}
	alphaContext.putImageData(pixels, 0, 0)
	// Grow the selection: blur it, then make the blurred edge solid
	const halo = document.createElement('canvas')
	halo.width = width
	halo.height = height
	const haloContext = halo.getContext('2d')
	haloContext.filter = `blur(${ring}px)`
	for (let pass = 0; pass < 3; pass++) haloContext.drawImage(alpha, 0, 0)
	haloContext.filter = 'none'
	const grown = haloContext.getImageData(0, 0, width, height)
	for (let i = 3; i < grown.data.length; i += 4)
		grown.data[i] = grown.data[i] > 18 ? 235 : grown.data[i] * 10
	haloContext.putImageData(grown, 0, 0)
	// Keep only the ring outside the part itself
	haloContext.globalCompositeOperation = 'destination-out'
	haloContext.drawImage(alpha, 0, 0)
	const out = document.createElement('canvas')
	out.width = width
	out.height = height
	const outContext = out.getContext('2d')
	outContext.drawImage(image, 0, 0, width, height)
	outContext.drawImage(halo, 0, 0)
	return out.toDataURL('image/png')
}

// Where the label points: inside the largest visible area of the selection,
// as fractions of the image size
function maskAnchor(mask) {
	const step = 8
	const columns = Math.floor(mask.width / step)
	const rows = Math.floor(mask.height / step)
	const small = document.createElement('canvas')
	small.width = columns
	small.height = rows
	const context = small.getContext('2d')
	context.drawImage(mask, 0, 0, columns, rows)
	const data = context.getImageData(0, 0, columns, rows).data
	const on = (i) => data[i * 4] > 40
	const seen = new Uint8Array(columns * rows)
	let best = []
	for (let start = 0; start < columns * rows; start++) {
		if (seen[start] || !on(start)) continue
		const cells = []
		const queue = [start]
		seen[start] = 1
		while (queue.length) {
			const cell = queue.pop()
			cells.push(cell)
			const x = cell % columns
			const y = (cell - x) / columns
			for (const [dx, dy] of [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1],
			]) {
				const nx = x + dx
				const ny = y + dy
				if (nx < 0 || ny < 0 || nx >= columns || ny >= rows) continue
				const next = ny * columns + nx
				if (!seen[next] && on(next)) {
					seen[next] = 1
					queue.push(next)
				}
			}
		}
		if (cells.length > best.length) best = cells
	}
	if (!best.length) return null
	let cx = 0
	let cy = 0
	for (const cell of best) {
		cx += cell % columns
		cy += Math.floor(cell / columns)
	}
	cx /= best.length
	cy /= best.length
	// The cell of the area closest to its centre, so the point is on the part
	let nearest = best[0]
	let distance = Infinity
	for (const cell of best) {
		const d =
			((cell % columns) - cx) ** 2 +
			(Math.floor(cell / columns) - cy) ** 2
		if (d < distance) {
			distance = d
			nearest = cell
		}
	}
	const round = (value) => Math.round(value * 10000) / 10000
	return [
		round(((nearest % columns) + 0.5) / columns),
		round((Math.floor(nearest / columns) + 0.5) / rows),
	]
}

// Removes only the hull panels between the camera and the satellite centre;
// the solar panels, the far side and the instrument's own walls stay
function cutaway(center) {
	setView('interior')
	const toCamera = camera.position.clone().sub(center).normalize()
	const box = new THREE.Box3()
	satellite.traverse((mesh) => {
		if (!mesh.isMesh || !mesh.userData.wasHiddenByInterior) return
		let keep = false
		for (let node = mesh; node; node = node.parent) {
			if (/solar|sara|sparkwing|instrumenthexa/i.test(node.name))
				keep = true
		}
		const offset = box.setFromObject(mesh).getCenter(new THREE.Vector3())
		offset.sub(center)
		if (offset.dot(toCamera) < 0.02) keep = true
		if (keep) mesh.visible = true
	})
}

// A world position as a fraction of the image width and height
function project(point) {
	const p = point.clone().project(camera)
	const round = (value) => Math.round(value * 10000) / 10000
	return [round((p.x + 1) / 2), round((1 - p.y) / 2)]
}

function visibleCenter(meshes) {
	return boxOf(meshes.filter((mesh) => mesh.visible)).getCenter(
		new THREE.Vector3(),
	)
}

// Meshes and lines that will be drawn (stars are points and are left out)
function visibleMeshes() {
	const meshes = []
	scene.traverse((object) => {
		if (!object.isMesh && !object.isLine) return
		for (let node = object; node; node = node.parent)
			if (!node.visible) return
		meshes.push(object)
	})
	return meshes
}

let satellitePoints = null

function isolate(meshes) {
	const keep = new Set(meshes)
	for (const mesh of satelliteVisibility.keys())
		mesh.visible = keep.has(mesh) && satelliteVisibility.get(mesh)
}

function show(job) {
	hideAll()
	if (job.type === 'satellite') {
		setView('satellite')
		satellite.visible = true
		stars.visible = Boolean(job.stars)
		return boxOf(
			[...satelliteVisibility.keys()].filter((mesh) => mesh.visible),
		)
	}
	if (job.type === 'satellite-component') {
		setView('satellite')
		satellite.visible = true
		const instances = componentInstances(job.component)
		// `instance` names the top-level CAD parts to show, by name prefix
		const wanted =
			job.instance === undefined ? null : [].concat(job.instance)
		const chosen = wanted
			? instances.filter((instance) =>
					wanted.some((prefix) => instance.name.startsWith(prefix)),
				)
			: instances
		if (!chosen.length)
			throw new Error(`No ${job.instance} in ${job.component}`)
		const meshes = chosen.flatMap((instance) => instance.meshes)
		isolate(meshes)
		return boxOf(meshes)
	}
	if (job.type === 'instrument' || job.type === 'instrument-component') {
		showInstrumentInterior()
		instrument.visible = true
		if (job.type === 'instrument') {
			const visible = []
			instrument.traverse((mesh) => {
				if (mesh.isMesh && mesh.visible) visible.push(mesh)
			})
			return boxOf(visible)
		}
		const meshes = new Set(instrumentParts.getMeshes(job.component))
		const restore = []
		instrument.traverse((mesh) => {
			if (!mesh.isMesh) return
			restore.push([mesh, mesh.visible])
			if (!meshes.has(mesh)) mesh.visible = false
		})
		job.restore = () => {
			for (const [mesh, visible] of restore) mesh.visible = visible
		}
		return boxOf([...meshes].filter((mesh) => mesh.visible))
	}
	if (job.type === 'cad-part') {
		const part = parts.getLoaded(job.part)
		parts.show(part)
		return new THREE.Box3().setFromObject(part)
	}
	if (job.type === 'optics') {
		optics.show(true)
		optics.update(job.time ?? 600)
		return new THREE.Box3().setFromObject(optics.root)
	}
	throw new Error(`Unknown job ${job.type}`)
}

window.stills = {
	ready: load(),
	instances(component) {
		return componentInstances(component).map(({ name, meshes, box }) => ({
			name,
			meshes: meshes.length,
			center: box.getCenter(new THREE.Vector3()).toArray(),
			size: box.getSize(new THREE.Vector3()).toArray(),
		}))
	},
	satelliteBox() {
		const box = show({ type: 'satellite' })
		return {
			center: box.getCenter(new THREE.Vector3()).toArray(),
			size: box.getSize(new THREE.Vector3()).toArray(),
		}
	},
	// One still: `job` picks what is shown, `direction` the camera side
	render(job) {
		const box = show(job)
		const [width, height] = job.size
		frameBox(box, job.direction, {
			margin: job.margin,
			aspect: width / height,
			points: pointsOf(visibleMeshes()),
		})
		const image = draw(width, height, {
			opaque: job.opaque,
			studio: job.studio,
		})
		job.restore?.()
		return image
	},
	// The whole satellite (or the opened instrument, for its parts) with one
	// component emphasised, and where to point the label at it
	async location(job) {
		hideAll()
		let meshes
		if (job.type === 'satellite') {
			setView('satellite')
			satellite.visible = true
			meshes = componentInstances(job.component).flatMap(
				(instance) => instance.meshes,
			)
		} else {
			showInstrumentInterior()
			instrument.visible = true
			meshes = instrumentParts.getMeshes(job.component)
		}
		// Frame the whole model first, so every view shows all of it
		const solid = visibleMeshes().filter((mesh) => mesh.isMesh)
		const [width, height] = job.size
		const { center } = frameBox(boxOf(solid), job.direction, {
			margin: job.margin ?? 0.84,
			aspect: width / height,
			points: pointsOf(solid),
		})
		if (job.cutaway) cutaway(boxOf(solid).getCenter(new THREE.Vector3()))
		meshes = meshes.filter((mesh) => mesh.visible)
		const ghost = job.type === 'instrument'
		const mask = selectionMask(meshes, width, height, { occlude: !ghost })
		const fallback =
			(job.type === 'satellite' &&
				getComponentAnchor(job.component, camera)) ||
			visibleCenter(meshes)
		lights.update(camera, center)
		const undo = emphasise(meshes, { ghost })
		const image = draw(width, height)
		undo()
		if (job.cutaway) setView('satellite')
		return {
			image: await withHalo(image, mask, job.ring ?? 5),
			anchor: maskAnchor(mask) ?? project(fallback),
		}
	},
	// The opened instrument on the studio backdrop, with where each of its
	// parts sits in the image
	map(job) {
		hideAll()
		showInstrumentInterior()
		instrument.visible = true
		const solid = visibleMeshes().filter((mesh) => mesh.isMesh)
		const [width, height] = job.size
		frameBox(boxOf(solid), job.direction, {
			margin: job.margin ?? 0.84,
			aspect: width / height,
			points: pointsOf(solid),
		})
		// Each label points at the largest visible area of its part
		const anchors = {}
		for (const [id, component] of Object.entries(job.parts)) {
			const meshes = instrumentParts
				.getMeshes(component)
				.filter((mesh) => mesh.visible)
			anchors[id] =
				maskAnchor(selectionMask(meshes, width, height)) ??
				project(visibleCenter(meshes))
		}
		return { image: draw(width, height, { studio: true }), anchors }
	},
	// Frames of a slow turn around the whole satellite
	// A frame of a slow sway around the `angle` composition: at progress 0 and
	// 1 the camera is exactly there, so the loop has no seam and its first
	// frame is the poster
	turnFrame({ size, angle: rest, sway, progress, margin, elevation, color }) {
		const box = show({ type: 'satellite', stars: true })
		const [width, height] = size
		const angle = THREE.MathUtils.degToRad(
			rest + sway * Math.sin(progress * Math.PI * 2),
		)
		// One distance for the whole sway: the widest view along the way, so
		// both solar panels stay in frame and the size does not change
		satellitePoints ??= pointsOf(visibleMeshes())
		let distance = 0
		for (let step = 0; step <= 12; step++) {
			const sample = THREE.MathUtils.degToRad(
				rest - sway + (2 * sway * step) / 12,
			)
			const framed = frameBox(
				box,
				[Math.sin(sample), elevation, Math.cos(sample)],
				{ margin, aspect: width / height, points: satellitePoints },
			)
			distance = Math.max(distance, framed.distance)
		}
		const restAngle = THREE.MathUtils.degToRad(rest)
		const { center } = frameBox(
			box,
			[Math.sin(restAngle), elevation, Math.cos(restAngle)],
			{ margin, aspect: width / height, points: satellitePoints },
		)
		const direction = new THREE.Vector3(
			Math.sin(angle),
			elevation,
			Math.cos(angle),
		).normalize()
		camera.position.copy(center).addScaledVector(direction, distance)
		camera.lookAt(center)
		camera.updateMatrixWorld()
		lights.update(camera, center)
		return draw(width, height, { opaque: true, type: 'image/jpeg', color })
	},
}
