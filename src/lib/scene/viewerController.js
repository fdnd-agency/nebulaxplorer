import * as THREE from 'three'
import TWEEN from 'three/examples/jsm/libs/tween.module.js'
import { readLayoutMode } from '../utils/layoutMode.js'
import { createMarkers } from './markers.js'
import { createCamera } from './camera.js'
import { createControls, updateControls } from './controls.js'
import { createExplorerScene, getRepresentation } from './explorerScene.js'
import { createLights } from './lights.js'
import { createMotionDetail } from './objects/MotionDetail.js'
import {
	getComponentFromObject,
	getModelStats,
	loadSatellite,
} from './objects/Satellite.js'
import { createStars } from './objects/star.js'
import { createRenderQuality } from './renderQuality.js'
import { createScene } from './scene.js'
import { isCameraMoving, stopCameraTween } from './updateCamera.js'
import { createViewOffset } from './viewOffset.js'
import { createCameraOrbit } from './cameraOrbit.js'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const orbitResumeDelay = 3500

function wait(milliseconds) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export function prefersReducedData() {
	return (
		window.matchMedia('(prefers-reduced-data: reduce)').matches ||
		navigator.connection?.saveData === true ||
		(import.meta.env.DEV &&
			new URLSearchParams(window.location.search).has('reduced-data'))
	)
}

export function createViewerController(
	explorer,
	{ renderer, viewer, canvas, visibleArea, markersElement },
) {
	const { state, tree } = explorer
	const reducedData = prefersReducedData()
	const scene = createScene(requestRender, { loadBackground: !reducedData })
	const camera = createCamera()
	const controls = createControls(camera, renderer)
	const lighting = createLights(scene, renderer)
	const renderQuality = createRenderQuality(renderer)
	const motionDetail = createMotionDetail()
	const viewOffset = createViewOffset(camera)
	const cameraOrbit = createCameraOrbit(camera, controls)
	const explorerScene = createExplorerScene({ scene, camera, controls })
	const starfield = createStars(14000, scene)
	const raycaster = new THREE.Raycaster()
	const pointer = new THREE.Vector2()
	const viewerSize = { width: 1, height: 1 }
	const runtime = {
		interacting: false,
		lastInteractionTime: -Infinity,
		viewRequest: 0,
		frameRequest: null,
		lastFrameTime: null,
		pointerStart: null,
		pointerDragged: false,
	}
	const markers = createMarkers(markersElement, {
		onPreview: (id) => explorer.setPreview(id),
		onSelect: (id) => explorer.navigate(id, { source: 'marker' }),
	})
	const cleanups = []
	let markerCenter = null
	let cadStateKey = null
	let resizeObserver = null
	raycaster.layers.enable(1)
	controls.autoRotateSpeed = 0.32

	function getSelectedItem() {
		return tree.get(state.selectedId)
	}

	function listen(target, type, handler, options) {
		target.addEventListener(type, handler, options)
		cleanups.push(() => target.removeEventListener(type, handler, options))
	}

	function syncLayout() {
		const nextMode = readLayoutMode()
		document.documentElement.dataset.layout = nextMode
		if (nextMode === state.layoutMode) return
		state.layoutMode = nextMode
		if (state.satelliteReady && !state.cameraAdjusted) reframeSelection()
	}

	function reframeSelection() {
		const result = explorerScene.apply(
			getSelectedItem(),
			getSceneOptions(600),
		)
		cameraOrbit.setSettings(result.orbit)
		updateMarkers(getSelectedItem())
		requestRender()
	}

	function requestRender() {
		if (runtime.frameRequest !== null || document.hidden) return
		runtime.frameRequest = requestAnimationFrame(renderFrame)
	}

	function renderFrame(time) {
		runtime.frameRequest = null
		if (document.hidden) return
		const frameMs =
			runtime.lastFrameTime === null ? 0 : time - runtime.lastFrameTime
		const delta = Math.min(frameMs / 1000, 0.1)
		runtime.lastFrameTime = time
		TWEEN.update(time)
		const tweening = TWEEN.getAll().some((tween) => tween.isPlaying())
		const ambientMotionAllowed =
			state.satelliteReady &&
			!state.rotationPaused &&
			!runtime.interacting &&
			!reduceMotion.matches &&
			!tweening &&
			time - runtime.lastInteractionTime > orbitResumeDelay
		controls.autoRotate =
			ambientMotionAllowed && getSelectedItem().scene === 'satellite'
		const orbiting = cameraOrbit.update(
			Math.min(frameMs / 1000, 0.25),
			ambientMotionAllowed,
		)
		updateControls(delta)
		const offsetMoving = viewOffset.update(delta || 1 / 60)
		const moving =
			controls.autoRotate ||
			orbiting ||
			runtime.interacting ||
			tweening ||
			offsetMoving ||
			explorerScene.isAnimating()
		renderQuality.update(frameMs, moving, runtime.interacting)
		const nextCadStateKey = [
			state.selectedId,
			state.previewId,
			state.outerPanelsVisible,
			explorerScene.getCurrentRepresentation(),
		].join('|')
		if (nextCadStateKey !== cadStateKey) {
			for (const root of explorerScene.getRoots())
				root?.userData.cadInstances?.sync()
			cadStateKey = nextCadStateKey
		}
		motionDetail.update(explorerScene.getRoots(), moving)
		lighting.update(camera, controls.target)
		explorerScene.update(time)
		renderer.render(scene, camera)
		markers.setHidden(isCameraMoving())
		markers.update(
			camera,
			viewerSize.width,
			viewerSize.height,
			markerCenter,
		)
		if (moving) requestRender()
	}

	function updateViewOffsetTarget(immediate = false) {
		const viewerBounds = viewer.getBoundingClientRect()
		const visibleBounds = visibleArea.getBoundingClientRect()
		viewOffset.setTarget(
			{
				left: Math.max(0, visibleBounds.left - viewerBounds.left),
				bottom: Math.max(0, viewerBounds.bottom - visibleBounds.bottom),
			},
			immediate || reduceMotion.matches,
		)
		requestRender()
	}

	function updateMarkers(item) {
		const anchors = explorerScene.getMarkerAnchors(
			tree.getChildren(item.id),
		)
		markers.set(
			anchors.map(({ id, position }) => ({
				id,
				position,
				number: tree.getNumber(id),
				label: explorer.getFullTitle(id),
			})),
		)
		const activeObject = explorerScene.getActiveObject()
		markerCenter =
			anchors.length && activeObject
				? getModelStats(activeObject).center
				: null
	}

	function updateMarkerLabels() {
		markers.setLabels(explorer.getFullTitle)
	}

	function preview(id) {
		markers.setPreview(id)
		explorerScene.preview(id ? tree.get(id) : null)
		requestRender()
	}

	function getSceneOptions(duration) {
		return {
			outerPanelsVisible: state.outerPanelsVisible,
			raysPlaying: state.raysPlaying && !reduceMotion.matches,
			duration: reduceMotion.matches ? 0 : duration,
			aspect: viewOffset.getVisibleAspect(),
		}
	}

	async function applySceneState() {
		if (!state.satelliteReady) return
		const request = ++runtime.viewRequest
		const item = getSelectedItem()
		state.outerPanelsVisible = false
		state.cameraAdjusted = false
		state.previewId = null
		markers.set([])
		const currentRepresentation = explorerScene.getCurrentRepresentation()
		const switching =
			currentRepresentation !== null &&
			(getRepresentation(item) !== currentRepresentation ||
				item.scene === 'cad-part')
		if (!explorerScene.isReady(item)) state.status = 'loading'
		try {
			await explorerScene.prepare(item)
		} catch (error) {
			console.error('3D view failed to load', error)
			if (request === runtime.viewRequest) state.status = 'error'
			return
		}
		if (request !== runtime.viewRequest) return
		state.status = null
		if (switching && !reduceMotion.matches) {
			state.switching = true
			await wait(180)
			if (request !== runtime.viewRequest) return
		}
		stopCameraTween()
		const result = explorerScene.apply(item, getSceneOptions(1000))
		cameraOrbit.setSettings(result.orbit)
		state.switching = false
		state.representation = result.representation
		state.availableControls = result.controls
		updateMarkers(item)
		requestRender()
	}

	function resetView() {
		state.cameraAdjusted = false
		reframeSelection()
		runtime.lastInteractionTime = -Infinity
		requestRender()
	}

	function toggleRotation() {
		state.rotationPaused = !state.rotationPaused
		requestRender()
	}

	function toggleOuterPanels() {
		const item = getSelectedItem()
		state.outerPanelsVisible = !state.outerPanelsVisible
		explorerScene.setOuterPanels(item, state.outerPanelsVisible)
		updateMarkers(item)
		requestRender()
	}

	function toggleRays() {
		state.raysPlaying = !state.raysPlaying
		explorerScene.setRaysPlaying(state.raysPlaying && !reduceMotion.matches)
		requestRender()
	}

	function bindCanvasEvents() {
		controls.addEventListener('start', () => {
			stopCameraTween()
			runtime.interacting = true
			runtime.lastInteractionTime = performance.now()
			state.cameraAdjusted = true
			state.hintDismissed = true
			requestRender()
		})
		controls.addEventListener('end', () => {
			runtime.interacting = false
			runtime.lastInteractionTime = performance.now()
			setTimeout(requestRender, orbitResumeDelay + 50)
			requestRender()
		})
		controls.addEventListener('change', requestRender)
		listen(canvas, 'pointerdown', (event) => {
			runtime.pointerStart = { x: event.clientX, y: event.clientY }
			runtime.pointerDragged = false
		})
		listen(canvas, 'pointermove', (event) => {
			if (!runtime.pointerStart) return
			runtime.pointerDragged ||=
				Math.hypot(
					event.clientX - runtime.pointerStart.x,
					event.clientY - runtime.pointerStart.y,
				) > 6
		})
		listen(canvas, 'pointercancel', () => {
			runtime.pointerStart = null
			runtime.pointerDragged = false
		})
		listen(canvas, 'click', (event) => {
			const shouldSelect = !runtime.pointerDragged
			runtime.pointerStart = null
			runtime.pointerDragged = false
			if (!shouldSelect || !state.satelliteReady) return
			const bounds = canvas.getBoundingClientRect()
			pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
			pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
			raycaster.setFromCamera(pointer, camera)
			const target = explorerScene.pick(raycaster, getSelectedItem())
			const item = target && tree.find(target.scene, target.component)
			if (item && item.id !== state.selectedId)
				explorer.navigate(item.id, { source: 'canvas' })
		})
	}

	function bindRenderPipeline() {
		listen(document, 'visibilitychange', () => {
			runtime.lastFrameTime = null
			requestRender()
		})
		listen(reduceMotion, 'change', () => {
			explorerScene.setRaysPlaying(
				state.raysPlaying && !reduceMotion.matches,
			)
			requestRender()
		})
		listen(window, 'resize', syncLayout)
		const resizeRenderer = () => {
			const { width, height } = viewer.getBoundingClientRect()
			if (width === 0 || height === 0) return
			viewerSize.width = width
			viewerSize.height = height
			camera.aspect = width / height
			renderer.setSize(width, height, false)
			viewOffset.setSize(width, height)
			syncLayout()
			updateViewOffsetTarget(true)
		}
		resizeObserver = new ResizeObserver(resizeRenderer)
		resizeObserver.observe(viewer)
		resizeRenderer()
	}

	function activateFallback() {
		document.documentElement.classList.remove('js-enhanced')
		state.enhanced = false
		state.fallback = true
		markers.set([])
		state.status = null
	}

	function loadInitialSatellite() {
		state.status = 'loading'
		loadSatellite(scene, {
			onLoad: async (satellite) => {
				const bounds = getModelStats(satellite)
				starfield.position.copy(bounds.center)
				starfield.scale.setScalar(bounds.radius / 4.5)
				try {
					const { createCadInstances } =
						await import('./objects/CadInstances.js')
					satellite.userData.cadInstances = createCadInstances(
						satellite,
						getComponentFromObject,
					)
				} catch (error) {
					console.error('CAD batching unavailable', error)
				}
				state.satelliteReady = true
				state.status = null
				applySceneState()
			},
			onError: activateFallback,
		})
	}

	function loadModel() {
		state.posterVisible = false
		scene.userData.loadBackground()
		loadInitialSatellite()
		requestAnimationFrame(() =>
			document.querySelector('.explorer-toggle')?.focus(),
		)
	}

	function start() {
		bindCanvasEvents()
		bindRenderPipeline()
		if (reducedData) state.posterVisible = true
		else loadInitialSatellite()
		requestRender()
		if (import.meta.env.DEV)
			window.__nebulaDebug = {
				scene,
				camera,
				controls,
				renderer,
				motionDetail,
				cameraOrbit,
				state,
				tree,
			}
	}

	function destroy() {
		resizeObserver?.disconnect()
		for (const cleanup of cleanups) cleanup()
		if (runtime.frameRequest !== null)
			cancelAnimationFrame(runtime.frameRequest)
		controls.dispose?.()
		renderer.dispose()
	}

	return {
		start,
		destroy,
		applySceneState,
		preview,
		updateMarkerLabels,
		updateViewOffsetTarget,
		resetView,
		toggleRotation,
		toggleOuterPanels,
		toggleRays,
		loadModel,
	}
}
