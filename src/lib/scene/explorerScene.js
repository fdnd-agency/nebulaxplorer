import {
	getComponentAnchor,
	getComponentFocus,
	getComponentFromObject,
	getInstrument,
	getModelFraming,
	getSatellite,
	getSelectableComponentMeshes,
	highlightComponent,
	loadInstrument,
	previewComponent,
	showInstrument,
	showInstrumentInterior,
	showSatellite,
	showSatelliteInterior,
} from './objects/Satellite.js'
import { opticalComponents } from './objects/OpticalComponents.js'
import { moveCamera, updateCamera } from './updateCamera.js'

const representationsByScene = {
	satellite: 'satellite',
	'satellite-component': 'satellite',
	instrument: 'instrument',
	'instrument-component': 'instrument',
	optics: 'optics',
	'optical-path': 'optics',
	'optical-component': 'optics',
	'cad-parts': 'optics',
	'cad-part': 'part',
}

const orbitDefaults = { period: 46, easeIn: 3 }
const componentOrbits = {
	xrayInstrument: { azimuth: 14, elevation: 4 },
	sunSensor: { azimuth: 16, elevation: 4 },
	solarPanel: { azimuth: 20, elevation: 5 },
}

export function getOrbitSettings(item) {
	const scene = item.scene
	let settings = null
	if (scene === 'satellite-component')
		settings = componentOrbits[item.component] ?? {
			azimuth: 24,
			elevation: 5,
		}
	else if (scene === 'instrument') settings = { azimuth: 28, elevation: 6 }
	else if (scene === 'instrument-component')
		settings = { azimuth: 18, elevation: 4 }
	else if (scene === 'cad-part')
		settings = { azimuth: 40, elevation: 8, period: 56 }
	return settings ? { ...orbitDefaults, ...settings } : null
}

const satelliteFraming = { padding: 1.12, direction: [0.8, 0.5, 1] }
const instrumentFraming = { padding: 1.24, direction: [0.9, -0.25, 1] }
const opticsFraming = { padding: 1.28 }
const partFraming = { padding: 1.1 }

function isObjectVisible(object) {
	for (let current = object; current; current = current.parent)
		if (!current.visible) return false
	return true
}

export const explorerScenes = Object.keys(representationsByScene)

export function getRepresentation(item) {
	return representationsByScene[item.scene] ?? 'satellite'
}

export function createExplorerScene({ scene, camera, controls }) {
	let representation = null
	let activeObject = null
	let optics = null
	let parts = null
	let instrumentComponents = null
	let opticsPromise = null
	let instrumentPromise = null

	function loadOptics() {
		opticsPromise ??= import('./objects/Optics.js')
			.then(({ createOptics, createPartViewer }) => {
				optics = createOptics(scene)
				parts = createPartViewer(scene)
			})
			.catch((error) => {
				opticsPromise = null
				throw error
			})
		return opticsPromise
	}

	function loadInstrumentView() {
		instrumentPromise ??= Promise.all([
			loadInstrument(scene),
			import('./objects/InstrumentComponents.js'),
			import('./objects/CadInstances.js'),
		])
			.then(
				([
					instrument,
					{ createInstrumentComponents },
					{ createCadInstances },
				]) => {
					instrumentComponents =
						createInstrumentComponents(instrument)
					instrument.userData.cadInstances = createCadInstances(
						instrument,
						instrumentComponents.getComponent,
					)
				},
			)
			.catch((error) => {
				instrumentPromise = null
				throw error
			})
		return instrumentPromise
	}

	function isReady(item) {
		const next = getRepresentation(item)
		if (next === 'instrument') return Boolean(instrumentComponents)
		if (next === 'optics') return Boolean(optics)
		if (next === 'part') return Boolean(parts?.isLoaded(item.component))
		return Boolean(getSatellite())
	}

	async function prepare(item) {
		const next = getRepresentation(item)
		if (next === 'instrument') await loadInstrumentView()
		if (next === 'optics' || next === 'part') await loadOptics()
		if (next === 'part') await parts.load(item.component)
	}

	function hideModels() {
		const satellite = getSatellite()
		const instrument = getInstrument()
		if (satellite) satellite.visible = false
		if (instrument) instrument.visible = false
	}

	function clearHighlights() {
		highlightComponent(null)
		instrumentComponents?.clearHighlight()
		optics?.clearSelection()
		parts?.clearSelection()
	}

	function frame(object, options, duration, aspect) {
		object.userData.cadInstances?.sync()
		const framing = getModelFraming(camera, object, { ...options, aspect })
		if (framing) moveCamera(controls, camera, framing, duration)
	}

	function setOuterPanels(item, visible) {
		if (item.scene === 'satellite-component') {
			if (visible) showSatellite()
			else showSatelliteInterior()
		} else if (getRepresentation(item) === 'instrument') {
			if (visible) showInstrument()
			else showInstrumentInterior()
		}
	}

	function hasOuterPanels(item) {
		return (
			(item.scene === 'satellite-component' &&
				item.component === 'xrayInstrument') ||
			getRepresentation(item) === 'instrument'
		)
	}

	function applySatellite(item, { outerPanelsVisible, duration, aspect }) {
		const satellite = getSatellite()
		if (item.scene === 'satellite') {
			showSatellite()
			frame(satellite, satelliteFraming, duration, aspect)
			return
		}
		if (item.component === 'xrayInstrument')
			setOuterPanels(item, outerPanelsVisible)
		else showSatellite()
		highlightComponent(item.component)
		const focus = getComponentFocus(item.component, { camera })
		if (focus) updateCamera(controls, camera, focus, duration, { aspect })
	}

	function applyInstrument(item, { outerPanelsVisible, duration, aspect }) {
		setOuterPanels(item, outerPanelsVisible)
		const instrument = getInstrument()
		if (item.scene === 'instrument') {
			frame(instrument, instrumentFraming, duration, aspect)
			return
		}
		instrumentComponents.highlight(item.component)
		const focus = instrumentComponents.getFocus(
			item.component,
			camera,
			controls.target,
		)
		if (focus)
			updateCamera(controls, camera, focus, Math.min(duration, 850), {
				aspect,
			})
	}

	function applyOptics(item, { raysPlaying, duration, aspect }) {
		hideModels()
		const showRays = ['optical-path', 'optical-component'].includes(
			item.scene,
		)
		if (!optics.root.visible || optics.hasRays() !== showRays)
			optics.show(showRays)
		optics.setPlaying(showRays && raysPlaying)
		if (item.scene === 'optical-component') optics.select(item.component)
		frame(optics.root, opticsFraming, duration, aspect)
	}

	function apply(item, options) {
		const next = getRepresentation(item)
		const switching =
			next !== representation ||
			(next === 'part' &&
				activeObject?.userData.opticalComponent !== item.component)
		const duration = options.duration
		clearHighlights()
		if (next !== 'optics') optics?.hide()
		if (next !== 'part') parts?.hide()

		if (next === 'satellite') {
			if (switching && item.scene !== 'satellite')
				frame(getSatellite(), satelliteFraming, 0, options.aspect)
			applySatellite(item, {
				...options,
				duration:
					switching && item.scene === 'satellite' ? 0 : duration,
			})
			activeObject = getSatellite()
		} else if (next === 'instrument') {
			if (switching) {
				showInstrumentInterior()
				frame(getInstrument(), instrumentFraming, 0, options.aspect)
			}
			applyInstrument(item, {
				...options,
				duration:
					switching && item.scene === 'instrument' ? 0 : duration,
			})
			activeObject = getInstrument()
		} else if (next === 'optics') {
			applyOptics(item, {
				...options,
				duration: switching ? 0 : duration,
			})
			activeObject = optics.root
		} else if (next === 'part') {
			hideModels()
			const part = parts.getLoaded(item.component)
			parts.show(part)
			parts.clearSelection()
			frame(part, partFraming, 0, options.aspect)
			activeObject = part
		}

		representation = next
		return {
			representation: next,
			orbit: getOrbitSettings(item),
			controls: {
				rotation:
					item.scene === 'satellite' ||
					Boolean(getOrbitSettings(item)),
				outerPanels: hasOuterPanels(item),
				rays: ['optical-path', 'optical-component'].includes(
					item.scene,
				),
			},
		}
	}

	function getAnchor(child) {
		if (child.scene === 'satellite-component')
			return getComponentAnchor(child.component, camera)
		if (child.scene === 'instrument')
			return getComponentAnchor('xrayInstrument', camera)
		if (child.scene === 'instrument-component')
			return instrumentComponents?.getAnchor(child.component) ?? null
		if (child.scene === 'optical-component' || child.scene === 'cad-part')
			return optics?.getAnchor(child.component) ?? null
		return null
	}

	function getMarkerAnchors(children) {
		return children
			.map((child) => ({ id: child.id, position: getAnchor(child) }))
			.filter((marker) => marker.position)
	}

	function preview(item) {
		previewComponent(null)
		instrumentComponents?.preview(null)
		optics?.preview(null)
		if (!item) return
		if (representation === 'satellite') {
			if (item.scene === 'satellite-component')
				previewComponent(item.component)
			else if (item.scene === 'instrument')
				previewComponent('xrayInstrument')
		} else if (
			representation === 'instrument' &&
			item.scene === 'instrument-component'
		) {
			instrumentComponents.preview(item.component)
		} else if (
			representation === 'optics' &&
			['optical-component', 'cad-part'].includes(item.scene)
		) {
			optics.preview(item.component)
		}
	}

	function pick(raycaster, item) {
		if (representation === 'satellite') {
			const hit = raycaster
				.intersectObjects(getSelectableComponentMeshes(), false)
				.find((intersection) => isObjectVisible(intersection.object))
			const component = hit && getComponentFromObject(hit.object)
			return component
				? { scene: 'satellite-component', component }
				: null
		}
		if (representation === 'instrument') {
			const hit = raycaster
				.intersectObject(getInstrument(), true)
				.find((intersection) => isObjectVisible(intersection.object))
			const component =
				hit && instrumentComponents.getComponent(hit.object)
			return component
				? { scene: 'instrument-component', component }
				: null
		}
		if (representation === 'optics') {
			raycaster.params.Line.threshold = 0.035
			const hit = raycaster
				.intersectObject(optics.root, true)
				.find(
					(intersection) =>
						isObjectVisible(intersection.object) &&
						intersection.object.userData.component,
				)
			const component = hit?.object.userData.component
			if (!component) return null
			if (item.scene === 'cad-parts')
				return opticalComponents[component]?.cadPart
					? { scene: 'cad-part', component }
					: null
			return { scene: 'optical-component', component }
		}
		return null
	}

	return {
		apply,
		getMarkerAnchors,
		getRepresentation,
		hasOuterPanels,
		isReady,
		pick,
		prepare,
		preview,
		setOuterPanels,
		getActiveObject: () => activeObject,
		getCurrentRepresentation: () => representation,
		getRoots: () => [getSatellite(), getInstrument()],
		isAnimating: () => Boolean(optics?.isAnimating()),
		setRaysPlaying: (playing) => optics?.setPlaying(playing),
		update: (time) => {
			if (optics?.isAnimating()) optics.update(time)
		},
	}
}
