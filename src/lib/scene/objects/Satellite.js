import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'
import { createSelectionHighlight } from './SelectionHighlight.js'
import { computeRenderableBounds } from '../bounds.js'

const satelliteModelUrl = new URL(
	'../../assets/models/satellite/Satellite.viewer.glb',
	import.meta.url,
).href
const instrumentModelUrl = new URL(
	'../../assets/models/instrument/Instrument.viewer.glb',
	import.meta.url,
).href

let satelliteRoot = null
let instrumentRoot = null
let instrumentLoadPromise = null
let currentView = 'satellite'
let satelliteMaterialMap = []
let satelliteHighlight = null

const componentMeshNames = {
	xrayInstrument: [
		'Instrument19-6_C',
		'InstrumentHexa_B',
		'Concentrator_Sunshields',
		'Concentrator_Sunshades',
		'Instrument_Electronics_Module',
	],
	starTrackerModule: [
		'ST-16RT2-LRB',
		'StarTracker_Mounting',
		'StarTracker_BracketPlate_C4',
		'StarTracker_Cap_C4',
		'Mounting_Bracket_1(STBT)',
	],
	dawn4UCubeDrive: [
		'PropulsionModule',
		'PropulsionModule_Box_SD5_1',
		'PropulsionModule_FuelTank_SD5_1',
		'PropulsionModule_OxidizerTank_SD5_1',
		'PropulsionModule_MountingPlate_SD5_1',
	],
	sBandAntenna: [
		'S-Band_PatchAntenna_ISISpace',
		'S-BandQuadPatchAntenna',
		'S-Band_Diplexer',
	],
	sunSensor: ['SunSensor_Bison64'],
	magnetorquers: ['MagnetoTorquer_MT10-2-H'],
	solarPanel: [
		'Solar Panels_step',
		'Solar Panels',
		'Deployed 910x570 Sparkwing',
		'SARA_',
		'SARA_Mounting_SolarArray',
		'SARA-v02.01.00.001_CASING_REV00_stp_1',
	],
}

export const satelliteComponents = Object.keys(componentMeshNames)

const satelliteInteriorHideNames = [
	'Top_Side_Panel',
	'Upper_Side_Panel',
	'Lower_Side_Panel',
	'Bottom_Side_Panel',
	'Solar Panels_step',
	'Solar Panels',
	'Deployed 910x570 Sparkwing',
	'SARA_',
	'SARA_Mounting_SolarArray',
	'SARA-v02.01.00.001_CASING_REV00_stp_1',
	'Side_Panel',
	'side_panel',
	'Panel',
	'Concentrator_Sunshades_step',
]

const meshComponents = new Map()
const componentMeshes = new Map()

const visualCategories = {
	BODY_DARK: new THREE.MeshStandardMaterial({
		name: 'Nebula Xplorer Base / BODY_DARK',
		color: 0x404348,
		metalness: 0.2824,
		roughness: 0.3872727155685425,
		side: THREE.DoubleSide,
	}),
	SOLAR_CELL_BLUE: new THREE.MeshStandardMaterial({
		name: 'Nebula Xplorer Solar Panel / SOLAR_CELL_BLUE',
		color: 0x174172,
		emissive: 0x174172,
		emissiveIntensity: 0.3,
		metalness: 0.4471,
		roughness: 0.307272732257843,
		side: THREE.DoubleSide,
	}),
	SOLAR_FRAME_METAL: new THREE.MeshStandardMaterial({
		name: 'Nebula Xplorer Solar Panel / SOLAR_FRAME_METAL',
		color: 0x404348,
		metalness: 0.2824,
		roughness: 0.307272732257843,
		side: THREE.DoubleSide,
	}),
	STRUCTURE_ALUMINIUM: new THREE.MeshStandardMaterial({
		name: 'Nebula Xplorer Base / STRUCTURE_ALUMINIUM',
		color: 0xcacaca,
		metalness: 0.7921,
		roughness: 0.3872727155685425,
		side: THREE.DoubleSide,
	}),
	INSTRUMENT_METAL: new THREE.MeshStandardMaterial({
		name: 'Nebula Xplorer Base / INSTRUMENT_METAL',
		color: 0xcacaca,
		metalness: 0.7921,
		roughness: 0.3872727155685425,
		side: THREE.DoubleSide,
	}),
	GOLD_EDGE: new THREE.MeshStandardMaterial({
		name: 'Nebula Xplorer Base / GOLD_EDGE',
		color: 0x918d47,
		metalness: 0.2745,
		roughness: 0.3872727155685425,
		side: THREE.DoubleSide,
	}),
	SENSOR: new THREE.MeshStandardMaterial({
		name: 'Nebula Xplorer Base / SENSOR',
		color: 0xa5a5a5,
		metalness: 0.6476,
		roughness: 0.3872727155685425,
		side: THREE.DoubleSide,
	}),
}

const bodyMeshNames = new Set([
	'sidepanel_c4',
	'mirrored_sidepanel_c4',
	'lv_adapter_panel_c4',
	'part104',
	'part264',
	'part266',
	'part268',
	'part272',
	'part272_1',
	'p2',
	'p2_1',
	'p3',
	'p3_1',
	'p6',
	'p12',
	'six_ob_b',
	'concentrator_sunshades_step',
])

function getVisualCategory(object) {
	const name = object.parent?.name?.toLowerCase() ?? ''
	if (/^solar_panels_step/.test(name)) return 'SOLAR_CELL_BLUE'
	if (/^deployed_910x570_sparkwing|^sara[-_]|^simplified_sara/.test(name))
		return 'SOLAR_FRAME_METAL'
	if (bodyMeshNames.has(name)) return 'BODY_DARK'
	if (
		/^(sixfp|dh-|pa210|pa-230|sdd_to|collimator|fe55|backplatefe55|caltube|rib|con_work_e)/.test(
			name,
		)
	)
		return 'INSTRUMENT_METAL'
	if (
		/startracker|st-16rt2|sensor|antenna|diplexer|magnetometer|magnetotorquer/.test(
			name,
		)
	)
		return 'SENSOR'
	if (
		/ansi_|iso_|din_|bracket|brkt|mounting|rod|frame|shaft|casing|hinge|screw|bolt|washer|nut|bshcs|fshcs|fastener|propulsion|tank|thruster|rocketlab/.test(
			name,
		)
	)
		return 'STRUCTURE_ALUMINIUM'
	return 'OTHER'
}

function getObjectPath(object) {
	const names = []
	let current = object
	while (current) {
		if (current.name)
			names.push(current.name.toLowerCase().replace(/[\s:.-]+/g, '_'))
		current = current.parent
	}
	return names.join(' ')
}

function matchesComponentName(name, candidates) {
	if (!name) return false
	const pathTokens = name.split(' ')
	return candidates.some(
		(candidate) =>
			candidate &&
			pathTokens.some(
				(token) => token === candidate || token.startsWith(candidate),
			),
	)
}

function matchesInteriorHideName(name, candidates) {
	return candidates.some((candidate) => candidate && name.includes(candidate))
}

function registerMeshComponent(object, root) {
	if (!object.isMesh || root.name !== 'NebulaSatellite') return
	const objectPath = getObjectPath(object)
	for (const [component, names] of Object.entries(componentMeshNames)) {
		if (
			matchesComponentName(
				objectPath,
				names.map((name) =>
					name.toLowerCase().replace(/[\s:.-]+/g, '_'),
				),
			)
		) {
			meshComponents.set(object, component)
			if (!componentMeshes.has(component))
				componentMeshes.set(component, [])
			componentMeshes.get(component).push(object)
			break
		}
	}
}

function prepareModelMaterials(root, applyReferenceAppearance) {
	const report = []
	const displayMaterials = new Map()
	root.updateWorldMatrix(true, true)

	root.traverse((object) => {
		if (!object.isMesh || !object.material) return
		const importedMaterials = Array.isArray(object.material)
			? object.material
			: [object.material]
		const category = applyReferenceAppearance
			? getVisualCategory(object)
			: 'OTHER'
		const bounds =
			object.geometry.boundingBox ??
			object.geometry.computeBoundingBox() ??
			object.geometry.boundingBox
		const worldBounds = bounds?.clone().applyMatrix4(object.matrixWorld)

		report.push({
			meshName: object.name,
			parentName: object.parent?.name ?? '',
			existingMaterialName: importedMaterials
				.map((material) => material.name || '(unnamed)')
				.join(', '),
			boundingBox: worldBounds
				? {
						min: worldBounds.min.toArray(),
						max: worldBounds.max.toArray(),
					}
				: null,
			assignedVisualCategory: category,
		})

		if (category !== 'OTHER') object.material = visualCategories[category]
		else {
			const materials = importedMaterials.map((source) => {
				if (!displayMaterials.has(source)) {
					const material = source.clone()
					const { r, g, b } = material.color
					const neutral =
						Math.max(r, g, b) - Math.min(r, g, b) < 0.035
					const dark = Math.max(r, g, b) < 0.08
					material.metalness = neutral && !dark ? 0.72 : 0.28
					material.roughness = dark ? 0.46 : neutral ? 0.3 : 0.4
					material.envMapIntensity = 0.9

					displayMaterials.set(source, material)
				}
				return displayMaterials.get(source)
			})
			object.material = Array.isArray(object.material)
				? materials
				: materials[0]
		}
		registerMeshComponent(object, root)
	})

	return report
}

function setInstrumentInteriorVisibility(isInterior) {
	if (!satelliteRoot) return
	satelliteRoot.traverse((object) => {
		if (!object.isMesh) return
		const instrumentWall =
			object.parent?.name.startsWith('InstrumentHexa_B') &&
			/^(?:P2|P3|P6|P12)\d*$/.test(object.name)
		const shouldHide =
			isInterior &&
			(instrumentWall ||
				matchesInteriorHideName(
					getObjectPath(object),
					satelliteInteriorHideNames.map((name) =>
						name.toLowerCase().replace(/[\s:.-]+/g, '_'),
					),
				))
		if (shouldHide) {
			object.userData.wasHiddenByInterior = true
			object.visible = false
			return
		}
		if (object.userData.wasHiddenByInterior) {
			object.visible = true
			delete object.userData.wasHiddenByInterior
		}
	})
}

function loadModel(url, modelName, applyReferenceAppearance = false) {
	return new Promise((resolve, reject) => {
		const loader = new GLTFLoader()
		loader.setMeshoptDecoder(MeshoptDecoder)
		loader.load(
			url,
			(glbData) => {
				const root = glbData.scene || glbData.scenes?.[0]
				if (!root) {
					reject(new Error(`No scene found for ${modelName}`))
					return
				}

				root.name = modelName
				root.visible = true
				const materialMap = prepareModelMaterials(
					root,
					applyReferenceAppearance,
				)
				root.traverse((object) => {
					if (object === root) return
					object.updateMatrix()
					object.matrixAutoUpdate = false
				})
				if (modelName === 'NebulaSatellite')
					satelliteMaterialMap = materialMap

				resolve(root)
			},
			undefined,
			(error) => {
				console.error(`Error loading ${modelName} GLB:`, url, error)
				reject(error)
			},
		)
	})
}

export function getModelStats(object) {
	if (!object) return null
	object.updateMatrixWorld(true, true)
	const box = computeRenderableBounds(object)
	const size = box.getSize(new THREE.Vector3())
	const center = box.getCenter(new THREE.Vector3())
	const radius = box.getBoundingSphere(new THREE.Sphere()).radius
	return {
		box,
		center,
		size,
		radius,
		maxDimension: Math.max(size.x, size.y, size.z),
	}
}

export function getModelFraming(
	camera,
	object,
	{ padding = 1.6, direction, aspect = camera.aspect } = {},
) {
	const stats = getModelStats(object)
	if (!stats) return null
	const verticalFov = THREE.MathUtils.degToRad(camera.fov)
	const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect)
	const limitingFov = Math.min(verticalFov, horizontalFov)
	const distance = (stats.radius / Math.sin(limitingFov / 2)) * padding
	const cameraOffset = direction
		? new THREE.Vector3(...direction).normalize().multiplyScalar(distance)
		: new THREE.Vector3(0, stats.radius * 0.18, distance)
	const target = stats.center.clone()
	return {
		stats,
		target,
		position: target.clone().add(cameraOffset),
		minDistance: distance * 0.25,
		maxDistance: distance * 1.55,
		near: Math.max(0.1, stats.radius * 0.02),
		far: distance + stats.radius * 10,
	}
}

export function frameModelRoot(camera, controls, object, options = {}) {
	if (!object || !camera || !controls) return null
	const framing = getModelFraming(camera, object, options)
	if (!framing) return null
	camera.position.copy(framing.position)
	controls.target.copy(framing.target)
	controls.minDistance = framing.minDistance
	controls.maxDistance = framing.maxDistance
	camera.near = framing.near
	camera.far = framing.far
	camera.updateProjectionMatrix()
	const damping = controls.enableDamping
	const autoRotate = controls.autoRotate
	controls.enableDamping = false
	controls.autoRotate = false
	controls.update()
	camera.position.copy(framing.position)
	controls.target.copy(framing.target)
	controls.update()
	controls.enableDamping = damping
	controls.autoRotate = autoRotate
	return framing.stats
}

export function loadSatellite(scene, { onLoad, onError } = {}) {
	loadModel(satelliteModelUrl, 'NebulaSatellite', false)
		.then((satellite) => {
			satelliteRoot = satellite
			satelliteHighlight = createSelectionHighlight(satelliteRoot)
			setView('satellite')

			scene.add(satelliteRoot)

			onLoad?.(satelliteRoot, getModelStats(satelliteRoot))
		})
		.catch((error) => {
			console.error('[scene] model failure', error)
			onError?.(error)
		})
}

export function loadInstrument(scene) {
	if (instrumentRoot) return Promise.resolve(instrumentRoot)
	if (instrumentLoadPromise) return instrumentLoadPromise

	instrumentLoadPromise = loadModel(instrumentModelUrl, 'InstrumentAssembly')
		.then((instrument) => {
			instrumentRoot = instrument
			instrumentRoot.visible = false
			scene.add(instrumentRoot)
			return instrumentRoot
		})
		.catch((error) => {
			instrumentLoadPromise = null
			throw error
		})

	return instrumentLoadPromise
}

export function getSatellite() {
	return satelliteRoot
}

export function getInstrument() {
	return instrumentRoot
}

export function getSatelliteMaterialMap() {
	return satelliteMaterialMap
}

export function getCurrentView() {
	return currentView
}

export function setView(viewName) {
	const nextView =
		viewName === 'interior'
			? 'interior'
			: viewName === 'instrument'
				? 'instrument'
				: 'satellite'
	currentView = nextView

	if (satelliteRoot) {
		satelliteRoot.visible = nextView !== 'instrument'
		if (nextView === 'interior') {
			setInstrumentInteriorVisibility(true)
		} else {
			setInstrumentInteriorVisibility(false)
		}
	}

	if (instrumentRoot) {
		instrumentRoot.visible = nextView === 'instrument'
	}

	return nextView
}

export function showSatellite() {
	setView('satellite')
}

export function showSatelliteInterior() {
	setView('interior')
}

export function showInstrument() {
	setView('instrument')
	setInstrumentPanels(false)
}

function setInstrumentPanels(hidden) {
	if (!instrumentRoot) return
	instrumentRoot.traverse((object) => {
		if (!object.isMesh) return
		const path = getObjectPath(object)
		if (
			![
				'top_side_panel',
				'upper_side_panel',
				'lower_side_panel',
				'bottom_side_panel',
			].some((name) => path.includes(name))
		)
			return
		object.visible = !hidden
	})
}

export function showInstrumentInterior() {
	setView('instrument')
	setInstrumentPanels(true)
}

export function getComponentFromObject(object) {
	let current = object
	while (current) {
		const component = meshComponents.get(current)
		if (component) return component
		current = current.parent
	}
	return null
}

export function getSelectableComponentMeshes() {
	return [...meshComponents.keys()]
}

export function getComponentFocus(component, { camera, object } = {}) {
	if (!satelliteRoot) return null

	satelliteRoot.updateWorldMatrix(true, true)
	if (component === 'sunSensor') {
		const sensors = new Set()
		for (const mesh of componentMeshes.get(component) ?? []) {
			for (
				let node = mesh;
				node && node !== satelliteRoot;
				node = node.parent
			) {
				if (node.name.startsWith('SunSensor_Bison64')) {
					sensors.add(node)
					break
				}
			}
		}
		const satelliteBox = new THREE.Box3().setFromObject(satelliteRoot)
		const satelliteCenter = satelliteBox.getCenter(new THREE.Vector3())
		const viewDirection = camera
			? camera.position.clone().sub(satelliteCenter).normalize()
			: new THREE.Vector3(0.8, 0.5, 1).normalize()
		let clickedSensor = object
		while (clickedSensor && !sensors.has(clickedSensor))
			clickedSensor = clickedSensor.parent
		let bestFocus = null
		let bestScore = -Infinity
		for (const sensor of sensors) {
			const box = new THREE.Box3().setFromObject(sensor)
			const size = box.getSize(new THREE.Vector3())
			const center = box.getCenter(new THREE.Vector3())
			const axis = [0, 1, 2].reduce((a, b) =>
				size.getComponent(a) < size.getComponent(b) ? a : b,
			)
			const normal = new THREE.Vector3().setComponent(
				axis,
				Math.sign(
					center.getComponent(axis) -
						satelliteCenter.getComponent(axis),
				) || 1,
			)
			const score =
				sensor === clickedSensor ? 2 : normal.dot(viewDirection)
			if (score <= bestScore) continue
			bestScore = score
			const tangent = viewDirection
				.clone()
				.addScaledVector(normal, -viewDirection.dot(normal))
			bestFocus = {
				componentCenter: center,
				direction: normal.addScaledVector(tangent, 0.45).normalize(),
				componentRadius: size.length() / 2,
				satelliteRadius: satelliteBox.getBoundingSphere(
					new THREE.Sphere(),
				).radius,
				detailView: true,
				focusedObject: sensor,
			}
		}
		return bestFocus
	}
	const componentBox = new THREE.Box3().makeEmpty()
	let meshCount = 0

	for (const mesh of componentMeshes.get(component) ?? []) {
		if (!mesh.visible) continue
		componentBox.expandByObject(mesh)
		meshCount += 1
	}

	if (meshCount === 0 || componentBox.isEmpty()) return null

	const satelliteBox = new THREE.Box3().setFromObject(satelliteRoot)
	const componentCenter = componentBox.getCenter(new THREE.Vector3())
	const satelliteCenter = satelliteBox.getCenter(new THREE.Vector3())
	const direction = componentCenter.clone().sub(satelliteCenter)

	if (direction.lengthSq() === 0)
		direction.set(0, 0, 1).applyQuaternion(satelliteRoot.quaternion)
	direction.normalize()
	direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.35)
	direction.y = Math.max(direction.y, 0.22)
	direction.normalize()

	const componentRadius =
		componentBox.getSize(new THREE.Vector3()).length() / 2
	const satelliteRadius =
		satelliteBox.getSize(new THREE.Vector3()).length() / 2

	return { componentCenter, direction, componentRadius, satelliteRadius }
}

export function highlightComponent(component) {
	satelliteHighlight?.apply(componentMeshes.get(component) ?? [])
}

export function previewComponent(component) {
	satelliteHighlight?.preview(componentMeshes.get(component) ?? [])
}

const componentAnchorPaths = {
	xrayInstrument: 'concentrator_sunshades',
}

const componentsAnchoredOnLargestPart = new Set(['solarPanel'])

function getLargestMeshCenter(meshes) {
	let largest = null
	let largestVolume = -1
	const box = new THREE.Box3()
	const size = new THREE.Vector3()
	for (const mesh of meshes) {
		if (!mesh.visible) continue
		box.setFromObject(mesh).getSize(size)
		const volume = size.x * size.y + size.y * size.z + size.x * size.z
		if (volume > largestVolume) {
			largestVolume = volume
			largest = box.getCenter(new THREE.Vector3())
		}
	}
	return largest
}

function getSurfaceDistance(halfSize, direction) {
	let distance = Infinity
	for (const axis of ['x', 'y', 'z']) {
		const component = Math.abs(direction[axis])
		if (component > 1e-6)
			distance = Math.min(distance, halfSize[axis] / component)
	}
	return Number.isFinite(distance) ? distance : 0
}

export function getComponentAnchor(component, camera) {
	if (!satelliteRoot) return null
	if (component === 'sunSensor')
		return getComponentFocus(component, { camera })?.componentCenter ?? null
	satelliteRoot.updateWorldMatrix(true, true)
	if (componentsAnchoredOnLargestPart.has(component))
		return getLargestMeshCenter(componentMeshes.get(component) ?? [])
	const meshes = (componentMeshes.get(component) ?? []).filter(
		(mesh) => mesh.visible,
	)
	const anchorPath = componentAnchorPaths[component]
	const anchorMeshes = anchorPath
		? meshes.filter((mesh) => getObjectPath(mesh).includes(anchorPath))
		: []
	const box = new THREE.Box3()
	for (const mesh of anchorMeshes.length ? anchorMeshes : meshes)
		box.expandByObject(mesh)
	if (box.isEmpty()) return null
	const center = box.getCenter(new THREE.Vector3())
	if (anchorPath) return center
	const satelliteCenter = getModelStats(satelliteRoot).center
	const direction = center.clone().sub(satelliteCenter)
	if (direction.lengthSq() < 1e-8) return center
	direction.normalize()
	const halfSize = box.getSize(new THREE.Vector3()).multiplyScalar(0.5)
	return center.addScaledVector(
		direction,
		getSurfaceDistance(halfSize, direction),
	)
}
