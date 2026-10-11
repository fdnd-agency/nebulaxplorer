import * as THREE from 'three'
import { createRenderQuality } from './scene/renderQuality.js'
import TWEEN from 'three/examples/jsm/libs/tween.module.js'
import { createScene } from './scene/scene.js'
import { createCamera } from './scene/camera.js'
import { createRenderer } from './scene/renderer.js'
import { createControls, updateControls } from './scene/controls.js'
import { createLights } from './scene/lights.js'
import { createViewerState } from './app/viewerState.js'
import { createDomBindings } from './ui/domBindings.js'
import {
	updateInstrumentStatus,
	updateRotationLabel,
	updateSelectionStatus,
} from './ui/selection.js'
import {
	frameModelRoot,
	getSatellite,
	getSatelliteMaterialMap,
	getInstrument,
	getComponentFromObject,
	getComponentFocus,
	getSelectableComponentMeshes,
	highlightComponent,
	loadInstrument,
	loadSatellite,
	resetSatellite,
	showSatellite,
	showSatelliteInterior,
	showInstrument,
	showInstrumentInterior,
	getCurrentView,
} from './scene/objects/Satellite.js'
import { createStars } from './scene/objects/star.js'
import { stopCameraTween, updateCamera } from './scene/updateCamera.js'

function isObjectVisible(object) {
	for (let current = object; current; current = current.parent)
		if (!current.visible) return false
	return true
}

function initializeViewer() {
	const visualization = document.querySelector('.visualization')
	const renderer = createRenderer()

	if (!visualization || !renderer) return

	const dom = createDomBindings()
	dom.viewerSidebarToggle.hidden = false
	let sidebarOpen = true
	function setSidebarOpen(isOpen) {
		sidebarOpen = isOpen
		dom.viewerRoot.classList.toggle('sidebar-closed', !isOpen)
		dom.viewerSidebar.inert = !isOpen
		updateSidebarToggleLabel(dom.viewerSidebarToggle, isOpen)
	}
	const mobileViewport = window.matchMedia('(max-width: 899px)')
	let sidebarHideTimeout
	function scheduleSidebarHide() {
		if (!mobileViewport.matches) return
		window.clearTimeout(sidebarHideTimeout)
		sidebarHideTimeout = window.setTimeout(() => {
			if (mobileViewport.matches) setSidebarOpen(false)
		}, 750)
	}
	dom.viewerSidebar.addEventListener('click', (event) => {
		if (
			event.target.closest(
				'[data-view], [data-3d-object], [data-instrument-component], [data-optical-component]',
			)
		)
			scheduleSidebarHide()
	})
	dom.partSelect.addEventListener('change', scheduleSidebarHide)

	dom.viewerSidebarToggle.addEventListener('click', () => {
		setSidebarOpen(!sidebarOpen)
	})
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && sidebarOpen) setSidebarOpen(false)
	})
	window
		.matchMedia('(min-width: 900px)')
		.addEventListener('change', (event) => {
			if (event.matches) {
				window.clearTimeout(sidebarHideTimeout)
				setSidebarOpen(true)
			}
		})

	const scene = createScene(requestRender)
	const camera = createCamera()
	const canvas = renderer.domElement
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
	const raycaster = new THREE.Raycaster()
	raycaster.layers.enable(1)
	const pointer = new THREE.Vector2()
	const controls = createControls(camera, renderer)
	const lighting = createLights(scene, renderer)
	const renderQuality = createRenderQuality(renderer)
	const state = createViewerState()
	let optics = null
	let parts = null
	let opticsPromise = null
	let partsPromise = null
	let cadInstancesModulePromise = null
	const opticalCopy = {
		primary: [
			'Primary mirror',
			'The first shallow-angle reflection redirects incoming X-rays toward the secondary mirror.',
		],
		secondary: [
			'Secondary mirror',
			'The second reflection directs the X-rays toward the focal point on the detector.',
		],
		detector: [
			'Detector',
			'At the focal point the detector records the arriving X-rays.',
		],
		tube: [
			'Stray-light tube',
			'This tube helps block light entering from the side before the X-rays reach the detector.',
		],
		rays: [
			'X-ray path',
			'Yellow lines explain the radiation path: incoming rays, first reflection, second reflection, detector. This is a schematic, not visible light.',
		],
	}

	controls.addEventListener('start', stopCameraTween)
	controls.autoRotateSpeed = 0.32
	controls.addEventListener('start', () => {
		state.interacting = true
		requestRender()
	})
	controls.addEventListener('end', () => {
		state.interacting = false
		requestRender()
	})
	bindViewerEvents()
	bindCanvasSelection()
	bindViewModeEvents()
	bindOpticalEvents()
	loadInitialSatellite()
	setupRenderPipeline()
	requestRender()
	updateSidebarToggleLabel(dom.viewerSidebarToggle, sidebarOpen)

	function updateSidebarToggleLabel(button, isOpen) {
		button.textContent = isOpen ? 'Hide panel' : 'Show panel'
	}

	function requestRender() {
		if (
			state.frameRequest !== null ||
			document.hidden ||
			!state.viewerInViewport
		)
			return
		state.frameRequest = requestAnimationFrame(renderFrame)
	}

	function loadOptics() {
		if (!opticsPromise) {
			opticsPromise = import('./scene/objects/Optics.js')
				.then(({ createOptics }) => (optics = createOptics(scene)))
				.catch((error) => {
					opticsPromise = null
					throw error
				})
		}
		return opticsPromise
	}

	function loadParts() {
		if (!partsPromise) {
			partsPromise = import('./scene/objects/Optics.js')
				.then(
					({ createPartViewer }) => (parts = createPartViewer(scene)),
				)
				.catch((error) => {
					partsPromise = null
					throw error
				})
		}
		return partsPromise
	}

	function loadCadInstancesModule() {
		cadInstancesModulePromise ??= import('./scene/objects/CadInstances.js')
		return cadInstancesModulePromise
	}

	function updateCurrentViewLink(viewName) {
		dom.viewLinks.forEach((link) => {
			link.classList.toggle('is-active', link.dataset.view === viewName)
		})
	}

	function setLocationHash(hash) {
		if (window.location.hash !== hash) history.pushState(null, '', hash)
	}

	function selectOpticalComponent(key) {
		optics?.select(key)
		const link = dom.opticalLinks.find(
			(item) => item.dataset.opticalComponent === key,
		)
		if (link) setLocationHash(link.hash)
		const copy = opticalCopy[key]
		if (copy) {
			dom.opticalSelection.textContent = `${copy[0]}: ${copy[1]}`
			dom.opticalSelection.hidden = false
		}
		requestRender()
	}

	function renderFrame(time) {
		state.frameRequest = null
		if (document.hidden || !state.viewerInViewport) return

		const frameMs =
			state.lastFrameTime === null ? 0 : time - state.lastFrameTime
		const delta = Math.min(frameMs / 1000, 0.1)
		state.lastFrameTime = time

		TWEEN.update(time)
		controls.autoRotate =
			!state.rotationPaused &&
			!state.interacting &&
			!reduceMotion.matches &&
			!TWEEN.getAll().some((tween) => tween.isPlaying())
		updateControls(delta)
		const moving =
			controls.autoRotate ||
			state.interacting ||
			optics?.isAnimating() ||
			TWEEN.getAll().some((tween) => tween.isPlaying())
		renderQuality.update(frameMs, moving, state.interacting)
		getSatellite()?.userData.cadInstances?.sync()
		getInstrument()?.userData.cadInstances?.sync()
		lighting.update(camera, controls.target)
		optics?.update(optics.isAnimating() ? time : 0)
		renderer.render(scene, camera)
		if (
			controls.autoRotate ||
			optics?.isAnimating() ||
			TWEEN.getAll().some((tween) => tween.isPlaying())
		)
			requestRender()
	}

	function setupRenderPipeline() {
		controls.addEventListener('change', requestRender)
		document.addEventListener('visibilitychange', () => {
			state.lastFrameTime = null
			requestRender()
		})
		new IntersectionObserver(([entry]) => {
			state.viewerInViewport = entry.isIntersecting
			if (state.viewerInViewport) requestRender()
		}).observe(visualization)
		const resizeRenderer = () => {
			const { width, height } = visualization.getBoundingClientRect()
			if (width === 0 || height === 0) return
			camera.aspect = width / height
			camera.updateProjectionMatrix()
			renderer.setSize(width, height, false)
			requestRender()
		}
		new ResizeObserver(resizeRenderer).observe(visualization)
		resizeRenderer()
		if (import.meta.env.DEV) {
			window.__nebulaDebug = { scene, camera, controls, renderer }
		}
	}

	function frameCurrentModel(viewName) {
		if (viewName === 'instrument' || viewName === 'instrument-interior') {
			const instrument = getInstrument()
			if (instrument)
				frameModelRoot(camera, controls, instrument, {
					padding: 1.1,
					direction: [0.9, -0.25, 1],
				})
			return
		}

		const satellite = getSatellite()
		if (satellite) {
			frameModelRoot(camera, controls, satellite, {
				padding: 1.12,
				direction: [0.8, 0.5, 1],
			})
		}
	}

	async function applyView(viewName) {
		const request = ++state.viewRequest
		highlightComponent(null)
		state.selectedComponent = null
		dom.componentLinks.forEach((link) => link.classList.remove('is-active'))
		dom.componentDetails.forEach((detail) => {
			detail.hidden = true
		})
		dom.componentDetailsPanel.classList.remove('has-selection')
		stopCameraTween()
		optics?.hide()
		parts?.hide()
		state.instrumentComponents?.clearHighlight()
		state.selectedInstrumentComponent = null
		dom.instrumentLinks.forEach((link) =>
			link.classList.remove('is-active'),
		)
		dom.instrumentDetails.forEach((detail) => {
			detail.hidden = true
		})
		dom.instrumentDetailsPanel.classList.remove('has-selection')
		state.rayPlaying = false
		dom.playButton.classList.remove('is-active')

		if (viewName === 'satellite') {
			showSatellite()
			frameCurrentModel(viewName)
		} else if (viewName === 'interior') {
			showSatelliteInterior()
			frameCurrentModel(viewName)
		} else if (
			viewName === 'instrument' ||
			viewName === 'instrument-interior'
		) {
			const [
				instrument,
				{ createInstrumentComponents },
				{ createCadInstances },
			] = await Promise.all([
				loadInstrument(scene),
				import('./scene/objects/InstrumentComponents.js'),
				loadCadInstancesModule(),
			])
			if (request !== state.viewRequest) return
			state.instrumentComponents ??=
				createInstrumentComponents(instrument)
			instrument.userData.cadInstances ??= createCadInstances(
				instrument,
				state.instrumentComponents.getComponent,
			)
			highlightComponent(null)
			if (viewName === 'instrument-interior') showInstrumentInterior()
			else showInstrument()
			frameCurrentModel(viewName)
		} else if (viewName === 'mirror' || viewName === 'rays') {
			await loadOptics()
			if (request !== state.viewRequest) return
			if (getSatellite()) getSatellite().visible = false
			if (getInstrument()) getInstrument().visible = false
			optics.show(viewName === 'rays')
			state.rayPlaying = viewName === 'rays' && !reduceMotion.matches
			optics.setPlaying(state.rayPlaying)
			dom.playButton.classList.toggle('is-active', state.rayPlaying)
			frameModelRoot(camera, controls, optics.root, { padding: 1.1 })
		} else if (viewName === 'parts') {
			const partViewer = await loadParts()
			if (request !== state.viewRequest) return
			const part = await partViewer.load(dom.partSelect.value)
			if (request !== state.viewRequest) return
			if (getSatellite()) getSatellite().visible = false
			if (getInstrument()) getInstrument().visible = false
			partViewer.show(part)
			partViewer.highlightAll()
			frameModelRoot(camera, controls, part, { padding: 1.1 })
		}

		state.activeView = viewName
		updateCurrentViewLink(viewName)
		const instrumentView = ['instrument', 'instrument-interior'].includes(
			viewName,
		)
		dom.instrumentNavigation.hidden = !instrumentView
		dom.instrumentNavigation.open = instrumentView
		dom.instrumentDetailsPanel.hidden = !instrumentView
		dom.viewerRoot.classList.toggle('instrument-view', instrumentView)
		dom.opticalSelection.hidden = true
		dom.opticsPanel.querySelector('.optical-components').hidden = ![
			'mirror',
			'rays',
		].includes(viewName)
		const optical = ['mirror', 'rays', 'parts'].includes(viewName)
		dom.opticsPanel.hidden = !optical
		dom.viewerRoot.classList.toggle('optical-view', optical)
		dom.playButton.hidden = viewName !== 'rays'
		dom.partSelect.hidden = viewName !== 'parts'
		dom.opticsPanel.querySelector('label').hidden = viewName !== 'parts'
		document.querySelector('#cad-note').hidden = viewName !== 'parts'
		dom.opticsPanel
			.querySelectorAll('p:not(#cad-note):not(#optical-selection)')
			.forEach((paragraph) => {
				paragraph.hidden = viewName === 'parts'
			})
		if (viewName === 'parts') {
			dom.opticalSelection.textContent = `CAD part: ${dom.partSelect.selectedOptions[0]?.textContent ?? 'Selected part'}.`
			dom.opticalSelection.hidden = false
		}

		updateCurrentViewLink(viewName)
		requestRender()
	}

	function handleDeepLink(viewLink) {
		const componentLink = dom.componentLinks.find(
			(link) => link.hash === viewLink.hash,
		)
		const instrumentLink = dom.instrumentLinks.find(
			(link) => link.hash === viewLink.hash,
		)
		const opticalLink = dom.opticalLinks.find(
			(link) => link.hash === viewLink.hash,
		)

		applyView(viewLink.dataset.view)
			.then(() => {
				if (componentLink)
					selectComponent(componentLink.dataset['3dObject'])
				else if (instrumentLink)
					selectInstrumentComponent(
						instrumentLink.dataset.instrumentComponent,
					)
				else if (opticalLink)
					selectOpticalComponent(opticalLink.dataset.opticalComponent)
				const target = document.getElementById(viewLink.hash.slice(1))
				if (target && !dom.viewerRoot.contains(target))
					target.scrollIntoView({
						behavior: reduceMotion.matches ? 'auto' : 'smooth',
						block: 'start',
					})
			})
			.catch(showViewError)
	}

	function restoreDeepLink() {
		const viewLink = dom.viewLinks.find(
			(link) => link.hash === window.location.hash,
		)
		if (viewLink) {
			handleDeepLink(viewLink)
			return true
		}

		const componentLink = dom.componentLinks.find(
			(link) => link.hash === window.location.hash,
		)
		if (componentLink) {
			selectComponent(componentLink.dataset['3dObject'])
			return true
		}

		const instrumentLink = dom.instrumentLinks.find(
			(link) => link.hash === window.location.hash,
		)
		if (instrumentLink) {
			applyView('instrument')
				.then(() =>
					selectInstrumentComponent(
						instrumentLink.dataset.instrumentComponent,
					),
				)
				.catch(showViewError)
			return true
		}

		const opticalLink = dom.opticalLinks.find(
			(link) => link.hash === window.location.hash,
		)
		if (opticalLink) {
			const viewName =
				opticalLink.dataset.opticalComponent === 'rays'
					? 'rays'
					: 'mirror'
			applyView(viewName)
				.then(() =>
					selectOpticalComponent(
						opticalLink.dataset.opticalComponent,
					),
				)
				.catch(showViewError)
			return true
		}

		return false
	}

	function showViewError(error) {
		console.error('View failed', error)
		dom.selectionStatus.textContent =
			'Model loading failed. Please try again.'
	}

	function loadInitialSatellite() {
		loadSatellite(scene, {
			onLoad: (satelliteModel) => {
				if (!satelliteModel) return
				loadCadInstancesModule()
					.then(({ createCadInstances }) => {
						satelliteModel.userData.cadInstances =
							createCadInstances(
								satelliteModel,
								getComponentFromObject,
							)
						requestRender()
					})
					.catch((error) => {
						console.error('CAD instancing failed', error)
					})
				if (import.meta.env.DEV) {
					window.__nebulaDebug.materialMap = getSatelliteMaterialMap()
				}
				console.log(
					'[satellite] loaded and framed',
					satelliteModel.name,
				)
				if (state.viewRequest === 0) {
					if (!restoreDeepLink()) {
						frameCurrentModel('satellite')
						requestRender()
					}
				} else {
					satelliteModel.visible = ['satellite', 'interior'].includes(
						state.activeView,
					)
					if (state.activeView === 'interior') showSatelliteInterior()
					requestRender()
				}
			},
			onError: activateFallback,
		})
		createStars(6500, scene)
	}

	function selectComponent(component, object) {
		const link = dom.componentLinks.find(
			(item) => item.dataset['3dObject'] === component,
		)
		if (!link) return
		setLocationHash(link.hash)
		if (!['satellite', 'interior'].includes(state.activeView))
			applyView('satellite')

		state.selectedComponent = component
		if (component === 'xrayInstrument') {
			showSatelliteInterior()
			state.activeView = 'interior'
		} else if (
			component === 'solarPanel' &&
			getCurrentView() === 'interior'
		) {
			showSatellite()
			state.activeView = 'satellite'
		}
		updateCurrentViewLink(state.activeView)
		highlightComponent(component)
		const focus = getComponentFocus(component, { camera, object })
		if (focus)
			updateCamera(
				controls,
				camera,
				focus,
				reduceMotion.matches ? 0 : 1100,
			)

		dom.componentLinks.forEach((item) => item.classList.remove('is-active'))
		link.classList.add('is-active')
		dom.componentDetails.forEach((detail) => {
			detail.hidden = detail.id !== link.hash.slice(1)
		})
		dom.componentDetails
			.find((detail) => detail.id === link.hash.slice(1))
			?.scrollIntoView({
				behavior: reduceMotion.matches ? 'auto' : 'smooth',
				block: 'nearest',
			})
		dom.componentDetailsPanel.classList.add('has-selection')
		updateSelectionStatus({ dom, state }, component)
		requestRender()
	}

	function selectInstrumentComponent(component) {
		const link = dom.instrumentLinks.find(
			(item) => item.dataset.instrumentComponent === component,
		)
		if (!link || !state.instrumentComponents) return
		setLocationHash(link.hash)
		state.selectedInstrumentComponent = component
		state.instrumentComponents.highlight(component)
		const focus = state.instrumentComponents.getFocus(
			component,
			camera,
			controls.target,
		)
		if (focus)
			updateCamera(
				controls,
				camera,
				focus,
				reduceMotion.matches ? 0 : 850,
			)
		dom.instrumentLinks.forEach((item) => {
			item.classList.toggle('is-active', item === link)
		})
		dom.instrumentDetails.forEach((detail) => {
			detail.hidden = detail.id !== link.hash.slice(1)
		})
		dom.instrumentDetails
			.find((detail) => detail.id === link.hash.slice(1))
			?.scrollIntoView({
				behavior: reduceMotion.matches ? 'auto' : 'smooth',
				block: 'nearest',
			})
		dom.instrumentDetailsPanel.classList.add('has-selection')
		updateInstrumentStatus({ dom, state })
		requestRender()
	}

	function resetViewer() {
		optics?.hide()
		parts?.hide()
		state.activeView = 'satellite'
		state.instrumentComponents?.clearHighlight()
		dom.instrumentNavigation.hidden = true
		dom.instrumentDetailsPanel.hidden = true
		dom.viewerRoot.classList.remove('instrument-view')
		dom.opticsPanel.hidden = true
		dom.viewerRoot.classList.remove('optical-view')
		state.viewRequest += 1
		stopCameraTween()
		state.selectedComponent = null
		highlightComponent(null)
		resetSatellite(reduceMotion.matches ? 0 : 1100)
		showSatellite()
		frameCurrentModel('satellite')
		updateCurrentViewLink('satellite')
		dom.componentLinks.forEach((link) => link.classList.remove('is-active'))
		dom.componentDetails.forEach((detail) => (detail.hidden = true))
		dom.componentDetailsPanel.classList.remove('has-selection')
		updateSelectionStatus({ dom, state }, null)
		requestRender()
	}

	function activateFallback() {
		visualization.classList.add('model-unavailable')
		dom.componentDetails.forEach((detail) => (detail.hidden = false))
		dom.instrumentDetails.forEach((detail) => (detail.hidden = false))
	}

	function bindViewerEvents() {
		dom.componentLinks.forEach((link) => {
			link.addEventListener('click', (event) => {
				if (!getSatellite()) return
				event.preventDefault()
				selectComponent(link.dataset['3dObject'])
			})
		})
		dom.instrumentLinks.forEach((link) => {
			link.addEventListener('click', (event) => {
				if (!getSatellite()) return
				event.preventDefault()
				setLocationHash(link.hash)
				if (
					!['instrument', 'instrument-interior'].includes(
						state.activeView,
					)
				) {
					applyView('instrument')
						.then(() =>
							selectInstrumentComponent(
								link.dataset.instrumentComponent,
							),
						)
						.catch(showViewError)
					return
				}
				selectInstrumentComponent(link.dataset.instrumentComponent)
			})
		})
		window.addEventListener('popstate', () => {
			if (!restoreDeepLink()) resetViewer()
		})
		dom.rotationButton.addEventListener('click', () => {
			state.rotationPaused = !state.rotationPaused
			dom.rotationButton.classList.toggle(
				'is-active',
				state.rotationPaused,
			)
			updateRotationLabel({ dom, state })
			requestRender()
		})
	}

	function bindViewModeEvents() {
		dom.viewLinks.forEach((link) => {
			link.addEventListener('click', (event) => {
				if (!getSatellite()) return
				event.preventDefault()
				setLocationHash(link.hash)
				handleDeepLink(link)
			})
		})
	}

	function bindOpticalEvents() {
		dom.opticalLinks.forEach((link) => {
			link.addEventListener('click', (event) => {
				event.preventDefault()
				selectOpticalComponent(link.dataset.opticalComponent)
			})
		})
		dom.partSelect.addEventListener('change', () => {
			applyView('parts').catch(() => {
				dom.selectionStatus.textContent =
					'CAD part could not be loaded.'
			})
		})
		dom.playButton.addEventListener('click', () => {
			state.rayPlaying = !state.rayPlaying
			optics?.setPlaying(state.rayPlaying && !reduceMotion.matches)
			dom.playButton.classList.toggle(
				'is-active',
				state.rayPlaying && !reduceMotion.matches,
			)
			requestRender()
		})
		reduceMotion.addEventListener('change', () => {
			if (reduceMotion.matches) {
				optics?.setPlaying(false)
				state.rayPlaying = false
				dom.playButton.classList.remove('is-active')
				requestRender()
			}
		})
	}

	function bindCanvasSelection() {
		canvas.addEventListener('pointerdown', (event) => {
			state.pointerStart = { x: event.clientX, y: event.clientY }
			state.pointerDragged = false
		})

		canvas.addEventListener('pointermove', (event) => {
			if (!state.pointerStart) return
			state.pointerDragged ||=
				Math.hypot(
					event.clientX - state.pointerStart.x,
					event.clientY - state.pointerStart.y,
				) > 6
		})

		canvas.addEventListener('pointercancel', () => {
			state.pointerStart = null
			state.pointerDragged = false
		})

		canvas.addEventListener('click', (event) => {
			const shouldSelect = !state.pointerDragged
			state.pointerStart = null
			state.pointerDragged = false
			if (!shouldSelect) return

			const satellite = getSatellite()
			const bounds = canvas.getBoundingClientRect()
			pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
			pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
			raycaster.setFromCamera(pointer, camera)
			if (['mirror', 'rays'].includes(state.activeView)) {
				raycaster.params.Line.threshold = 0.035
				const hit =
					optics &&
					raycaster
						.intersectObject(optics.root, true)
						.find(
							(intersection) =>
								isObjectVisible(intersection.object) &&
								intersection.object.userData.component,
						)
				if (hit) selectOpticalComponent(hit.object.userData.component)
				return
			}
			if (
				['instrument', 'instrument-interior'].includes(state.activeView)
			) {
				const root = getInstrument()
				if (!root) return
				const hit = raycaster
					.intersectObject(root, true)
					.find((intersection) =>
						isObjectVisible(intersection.object),
					)
				const component =
					hit && state.instrumentComponents?.getComponent(hit.object)
				if (component) selectInstrumentComponent(component)
				return
			}
			if (state.activeView === 'parts') {
				const root = parts?.getActive()
				if (!root) return
				const hit = raycaster
					.intersectObject(root, true)
					.find((intersection) =>
						isObjectVisible(intersection.object),
					)
				if (hit) {
					parts?.highlight([hit.object])
					dom.opticsPanel.hidden = false
					dom.opticsPanel
						.querySelectorAll(
							'p:not(#optical-selection),label,select,.optical-components,#ray-play',
						)
						.forEach((element) => (element.hidden = true))
					dom.opticalSelection.hidden = false
					dom.opticalSelection.textContent = `CAD part: ${hit.object.name || hit.object.parent?.name || 'Unnamed part'}. Name from the supplied CAD model.`
					requestRender()
				}
				return
			}
			if (!satellite) return
			const hit = raycaster
				.intersectObjects(getSelectableComponentMeshes(), false)
				.find((intersection) => isObjectVisible(intersection.object))
			const component = hit && getComponentFromObject(hit.object)
			if (component) selectComponent(component, hit.object)
		})
	}
}

try {
	initializeViewer()
} catch {}
