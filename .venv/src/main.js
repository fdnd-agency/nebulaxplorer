import * as THREE from "three";
import { createOptics, createPartViewer } from "./components/objects/Optics.js";
import { createInstrumentComponents } from "./components/objects/InstrumentComponents.js";
import { createCadInstances } from "./components/objects/CadInstances.js";
import { createRenderQuality } from "./setup/renderQuality.js";
import TWEEN from "three/examples/jsm/libs/tween.module.js";
import { createScene } from "./setup/scene.js";
import { createCamera } from "./setup/camera.js";
import { createRenderer } from "./setup/renderer.js";
import { createControls, updateControls } from "./setup/controls.js";
import { createLights } from "./components/lights/lights.js";
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
} from "./components/objects/Satellite.js";
import { createStars } from "./components/objects/star.js";
import { stopCameraTween, updateCamera } from "./scripts/updateCamera.js";

function isObjectVisible(object) {
 for (let current = object; current; current = current.parent) if (!current.visible) return false;
 return true;
}

function initializeExperience() {
	const visualization = document.querySelector(".visualization");
	const renderer = createRenderer();

	if (!visualization || !renderer) return;

	const scene = createScene(requestRender);
	const camera = createCamera();
	const canvas = renderer.domElement;
	const componentLinks = [...document.querySelectorAll("[data-3d-object]")];
	const componentDetails = [...document.querySelectorAll("[data-component-info]")];
	const componentDetailsPanel = document.querySelector(".component-details");
	const instrumentLinks = [...document.querySelectorAll("[data-instrument-component]")];
	const instrumentDetails = [...document.querySelectorAll("[data-instrument-info]")];
	const instrumentDetailsPanel = document.querySelector(".instrument-details");
	const instrumentNavigation = document.querySelector(".instrument-navigation");
	let instrumentComponents = null;
	let selectedInstrumentComponent = null;
	const selectionStatus = document.querySelector(".selection-status");
	const experienceModeLinks = [...document.querySelectorAll("[data-experience-mode]")];
	const languageButtons = [...document.querySelectorAll("[data-language]")];
	const translatableElements = [...document.querySelectorAll("[data-i18n-nl]")];
	const englishCopy = new Map(translatableElements.map((element) => [element, element.textContent]));
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	const raycaster = new THREE.Raycaster();
	raycaster.layers.enable(1);
	const pointer = new THREE.Vector2();
	const viewButtons = [...document.querySelectorAll("[data-view]")];
	const controls = createControls(camera, renderer);
	const lighting = createLights(scene, renderer);
	controls.addEventListener("start", stopCameraTween);
	let pointerStart = null;
	let pointerDragged = false;
	let selectedComponent = null;
	let activeLanguage = "en";
	let frameRequest = null;
	let viewerInViewport = true;
	let viewRequest = 0;
 let activeView = "satellite";
 const optics = createOptics(scene);
 const parts = createPartViewer(scene);
 const opticsPanel = document.querySelector(".optics-panel");
 const partSelect = document.querySelector("#cad-part");
 const playButton = document.querySelector("#ray-play");
 let rayPlaying = false;
 let lastFrameTime = null;
 let interacting = false;
 let rotationPaused = false;
 const renderQuality = createRenderQuality(renderer);
 const toolbar = document.querySelector(".view-switcher");
 visualization.parentElement.append(toolbar, opticsPanel);
 controls.autoRotateSpeed = 0.32;
 controls.addEventListener("start", () => { interacting = true; requestRender(); });
 controls.addEventListener("end", () => { interacting = false; requestRender(); });


	function requestRender() {
		if (frameRequest !== null || document.hidden || !viewerInViewport) return;
		frameRequest = requestAnimationFrame(renderFrame);
	}

	function renderFrame(time) {
		frameRequest = null;
		if (document.hidden || !viewerInViewport) return;
  const frameMs = lastFrameTime === null ? 0 : time - lastFrameTime;
  const delta = Math.min(frameMs / 1000, 0.1);
  lastFrameTime = time;
  TWEEN.update(time);
  controls.autoRotate = !rotationPaused && !interacting && !reduceMotion.matches && !TWEEN.getAll().some(tween => tween.isPlaying());
  updateControls(delta);
		const moving = controls.autoRotate || interacting || optics.isAnimating() || TWEEN.getAll().some(tween => tween.isPlaying());
		renderQuality.update(frameMs, moving, interacting);
		getSatellite()?.userData.cadInstances?.sync();
		getInstrument()?.userData.cadInstances?.sync();
		lighting.update(camera, controls.target);
		optics.update(optics.isAnimating() ? time : 0);
		renderer.render(scene, camera);
		if (controls.autoRotate || optics.isAnimating() || TWEEN.getAll().some((tween) => tween.isPlaying())) requestRender();
	}

	controls.addEventListener("change", requestRender);
	document.addEventListener("visibilitychange", () => { lastFrameTime = null; requestRender(); });
	new IntersectionObserver(([entry]) => {
		viewerInViewport = entry.isIntersecting;
		if (viewerInViewport) requestRender();
	}).observe(visualization);


	if (import.meta.env.DEV) {
		window.__nebulaDebug = { scene, camera, controls, renderer };
	}

	function frameCurrentModel(viewName) {
		if (viewName === "instrument" || viewName === "instrument-interior") {
			const instrument = getInstrument();
			if (instrument) frameModelRoot(camera, controls, instrument, { padding: 1.1, direction: [0.9, -0.25, 1] });
			return;
		}

		const satellite = getSatellite();
		if (satellite) {
			frameModelRoot(camera, controls, satellite, { padding: 1.12, direction: [0.8, 0.5, 1] });
		}
	}

	async function applyView(viewName) {
		const request = ++viewRequest;
		highlightComponent(null);
		selectedComponent = null;
		componentLinks.forEach(link => link.removeAttribute("aria-current"));
		componentDetails.forEach(detail => { detail.hidden = true; });
		componentDetailsPanel.classList.remove("has-selection");
		stopCameraTween();
		optics.hide();
		parts.hide();
		instrumentComponents?.clearHighlight();
		selectedInstrumentComponent = null;
		instrumentLinks.forEach(link => link.removeAttribute("aria-current"));
		instrumentDetails.forEach(detail => { detail.hidden = true; });
		instrumentDetailsPanel.classList.remove("has-selection");
		rayPlaying = false;
		playButton.setAttribute("aria-pressed", "false");
		if (viewName === "satellite") {
			showSatellite();
			frameCurrentModel(viewName);
		} else if (viewName === "interior") {
			showSatelliteInterior();
			frameCurrentModel(viewName);
		} else if (viewName === "instrument" || viewName === "instrument-interior") {
			await loadInstrument(scene);
			if (request !== viewRequest) return;
			instrumentComponents ??= createInstrumentComponents(getInstrument());
			getInstrument().userData.cadInstances ??= createCadInstances(getInstrument(), instrumentComponents.getComponent);
			highlightComponent(null);
			if (viewName === "instrument-interior") showInstrumentInterior();
			else showInstrument();
			frameCurrentModel(viewName);
  } else if (viewName === "mirror" || viewName === "rays") {
   if (getSatellite()) getSatellite().visible = false;
   if (getInstrument()) getInstrument().visible = false;
   optics.show(viewName === "rays");
   rayPlaying = viewName === "rays" && !reduceMotion.matches;
   optics.setPlaying(rayPlaying);
   playButton.setAttribute("aria-pressed", String(rayPlaying));
   frameModelRoot(camera, controls, optics.root, {padding:1.1});
  } else if (viewName === "parts") {
   const part = await parts.load(partSelect.value);
   if (request !== viewRequest) return;
   if (getSatellite()) getSatellite().visible = false;
   if (getInstrument()) getInstrument().visible = false;
   parts.show(part);
	parts.highlightAll();
   frameModelRoot(camera, controls, part, {padding:1.1});
  }
  activeView = viewName;
		const instrumentView = ["instrument", "instrument-interior"].includes(viewName);
		instrumentNavigation.hidden = !instrumentView;
		instrumentDetailsPanel.hidden = !instrumentView;
		document.querySelector(".experience").classList.toggle("instrument-view", instrumentView);
  opticalSelection.hidden = true;
  opticsPanel.querySelector('.optical-components').hidden = !["mirror","rays"].includes(viewName);
  const optical = ["mirror", "rays", "parts"].includes(viewName);
  opticsPanel.hidden = !optical;
  document.querySelector(".experience").classList.toggle("optical-view", optical);
  playButton.hidden = viewName !== "rays";
  partSelect.hidden = viewName !== "parts";
  opticsPanel.querySelector('label').hidden = viewName !== "parts";
  document.querySelector("#cad-note").hidden = viewName !== "parts";
  opticsPanel.querySelectorAll('p:not(#cad-note):not(#optical-selection)').forEach(p => p.hidden = viewName === "parts");
		if (viewName === "parts") {
			opticalSelection.textContent = `CAD part: ${partSelect.selectedOptions[0]?.textContent ?? "Selected part"}.`;
			opticalSelection.hidden = false;
		}

		viewButtons.forEach((button) => {
			button.setAttribute("aria-pressed", String(button.dataset.view === viewName));
		});
		requestRender();
	}

	loadSatellite(scene, {
		onLoad: (satelliteModel) => {
			if (!satelliteModel) return;
			satelliteModel.userData.cadInstances = createCadInstances(satelliteModel, getComponentFromObject);
			if (import.meta.env.DEV) {
				window.__nebulaDebug.materialMap = getSatelliteMaterialMap();
			}
			console.log("[satellite] loaded and framed", satelliteModel.name);
			if (viewRequest === 0) applyView("satellite");
			else {
				satelliteModel.visible = ["satellite", "interior"].includes(activeView);
				if (activeView === "interior") showSatelliteInterior();
				requestRender();
			}
		},
		onError: activateFallback,
	});

	createStars(6500, scene);

	function resizeRenderer() {
		const { width, height } = visualization.getBoundingClientRect();
		if (width === 0 || height === 0) return;
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height, false);
		requestRender();
	}

	new ResizeObserver(resizeRenderer).observe(visualization);
	resizeRenderer();

	requestRender();

	function selectComponent(component, object) {
		const link = componentLinks.find((item) => item.dataset["3dObject"] === component);
		if (!link) return;
		if (!["satellite", "interior"].includes(activeView)) applyView("satellite");

		selectedComponent = component;
		// Preserve the current viewer's automatic reveal of the X-ray assembly.
		if (component === "xrayInstrument") {
			showSatelliteInterior();
			activeView = "interior";
		} else if (component === "solarPanel" && getCurrentView() === "interior") {
			showSatellite();
			activeView = "satellite";
		}
		viewButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.view === activeView)));
		highlightComponent(component);
		const focus = getComponentFocus(component, { camera, object });
		if (focus) updateCamera(controls, camera, focus, reduceMotion.matches ? 0 : 1100);

		componentLinks.forEach((item) => item.removeAttribute("aria-current"));
		link.setAttribute("aria-current", "true");
		componentDetails.forEach((detail) => {
			detail.hidden = detail.id !== link.hash.slice(1);
		});
		componentDetailsPanel.classList.add("has-selection");
		setExperienceMode("explore");

		updateSelectionStatus(component);
		requestRender();
	}

	function updateSelectionStatus(component) {
		if (!component) {
			selectionStatus.textContent = activeLanguage === "nl" ? "Verkenningsmodus actief." : "Exploration mode active.";
			return;
		}

		const link = componentLinks.find((item) => item.dataset["3dObject"] === component);
		const label = link?.querySelector(".component-label")?.textContent ?? "";
		selectionStatus.textContent = activeLanguage === "nl" ? `${label} geselecteerd.` : `${label} selected.`;
	}

	function selectInstrumentComponent(component) {
		const link = instrumentLinks.find(item => item.dataset.instrumentComponent === component);
		if (!link || !instrumentComponents) return;
		selectedInstrumentComponent = component;
		instrumentComponents.highlight(component);
		const focus = instrumentComponents.getFocus(component, camera, controls.target);
		if (focus) updateCamera(controls, camera, focus, reduceMotion.matches ? 0 : 850);
		instrumentLinks.forEach(item => {
			if (item === link) item.setAttribute("aria-current", "true");
			else item.removeAttribute("aria-current");
		});
		instrumentDetails.forEach(detail => { detail.hidden = detail.id !== link.hash.slice(1); });
		instrumentDetailsPanel.classList.add("has-selection");
		updateInstrumentStatus();
		requestRender();
	}

	function updateInstrumentStatus() {
		const link = instrumentLinks.find(item => item.dataset.instrumentComponent === selectedInstrumentComponent);
		const label = link?.querySelector(".component-label").textContent;
		document.querySelector(".instrument-status").textContent = label
			? `${label} ${activeLanguage === "nl" ? "geselecteerd." : "selected."}` : "";
	}

	function setLanguage(language) {
		activeLanguage = language;
		document.documentElement.lang = language;
		translatableElements.forEach((element) => {
			element.textContent = language === "nl" ? element.dataset.i18nNl : englishCopy.get(element);
		});
		languageButtons.forEach((button) => {
			button.setAttribute("aria-pressed", String(button.dataset.language === language));
		});
		updateSelectionStatus(selectedComponent);
		updateInstrumentStatus();
		updateRotationLabel();
	}

	function setExperienceMode(mode) {
		experienceModeLinks.forEach((link) => {
			if (link.dataset.experienceMode === mode) link.setAttribute("aria-current", "true");
			else link.removeAttribute("aria-current");
		});
	}

	function resetExperience() {
		optics.hide();
		parts.hide();
		activeView = "satellite";
		instrumentComponents?.clearHighlight();
		instrumentNavigation.hidden = true;
		instrumentDetailsPanel.hidden = true;
		document.querySelector(".experience").classList.remove("instrument-view");
		opticsPanel.hidden = true;
		document.querySelector(".experience").classList.remove("optical-view");
		viewRequest += 1;
		stopCameraTween();
		selectedComponent = null;
		highlightComponent(null);
		resetSatellite(reduceMotion.matches ? 0 : 1100);
		showSatellite();
		frameCurrentModel("satellite");
		viewButtons.forEach((button) => {
			button.setAttribute("aria-pressed", String(button.dataset.view === "satellite"));
		});
		componentLinks.forEach((link) => link.removeAttribute("aria-current"));
		componentDetails.forEach((detail) => (detail.hidden = true));
		componentDetailsPanel.classList.remove("has-selection");
		setExperienceMode("explore");
		updateSelectionStatus(null);
		requestRender();
	}

	function activateFallback() {
		document.documentElement.classList.remove("js-enhanced");
		visualization.classList.add("model-unavailable");
		componentDetails.forEach((detail) => (detail.hidden = false));
		instrumentDetails.forEach((detail) => (detail.hidden = false));
	}

	document.documentElement.classList.add("js-enhanced");
	componentDetails.forEach((detail) => (detail.hidden = true));

	componentLinks.forEach((link) => {
		link.addEventListener("click", (event) => {
			event.preventDefault();
			history.replaceState(null, "", link.hash);
			selectComponent(link.dataset["3dObject"]);
		});
	});
	instrumentLinks.forEach(link => link.addEventListener("click", event => {
		if (!document.documentElement.classList.contains("js-enhanced")) return;
			event.preventDefault();
			selectInstrumentComponent(link.dataset.instrumentComponent);
	}));

	experienceModeLinks.forEach((link) => {
		link.addEventListener("click", (event) => {
			event.preventDefault();
			if (link.dataset.experienceMode === "explore") {
				history.replaceState(null, "", window.location.pathname);
				resetExperience();
			}
		});
	});

	viewButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const viewName = button.dataset.view;
			applyView(viewName).catch((error) => {
				console.error("View failed", error);
				selectionStatus.textContent = activeLanguage === "nl" ? "Model laden mislukt. Probeer opnieuw." : "Model loading failed. Please try again.";
			});
		});
	});

	languageButtons.forEach((button) => {
		button.addEventListener("click", () => {
			setLanguage(button.dataset.language);
			requestRender();
		});
	});

 const rotationButton = document.querySelector("#rotation-toggle");
 function updateRotationLabel() {
  rotationButton.textContent = activeLanguage === "nl"
   ? (rotationPaused ? "Draaien hervatten" : "Draaien pauzeren")
   : (rotationPaused ? "Resume rotation" : "Pause rotation");
 }
 rotationButton.addEventListener("click", () => { rotationPaused = !rotationPaused;rotationButton.setAttribute("aria-pressed",String(rotationPaused));updateRotationLabel();requestRender(); });
 const opticalCopy = {
 primary: ["Primary mirror", "The first shallow-angle reflection redirects incoming X-rays toward the secondary mirror."],
 secondary: ["Secondary mirror", "The second reflection directs the X-rays toward the focal point on the detector."],
 detector: ["Detector", "At the focal point the detector records the arriving X-rays."],
 tube: ["Stray-light tube", "This tube helps block light entering from the side before the X-rays reach the detector."],
 rays: ["X-ray path", "Yellow lines explain the radiation path: incoming rays, first reflection, second reflection, detector. This is a schematic, not visible light."]
 };
 const opticalSelection = document.querySelector("#optical-selection");
 function explainOptics(key) { const copy=opticalCopy[key];if(!copy)return;opticalSelection.textContent=copy[0]+": "+copy[1];opticalSelection.hidden=false; }
 function selectOpticalComponent(key) { optics.select(key); explainOptics(key); requestRender(); }
 document.querySelectorAll("[data-optical-component]").forEach(button => button.addEventListener("click",()=>selectOpticalComponent(button.dataset.opticalComponent)));
 partSelect.addEventListener("change", () => applyView("parts").catch(() => { selectionStatus.textContent = "CAD part could not be loaded."; }));
 playButton.addEventListener("click", () => {
  rayPlaying = !rayPlaying;
  optics.setPlaying(rayPlaying && !reduceMotion.matches);
  playButton.setAttribute("aria-pressed", String(rayPlaying && !reduceMotion.matches));
  requestRender();
 });
 reduceMotion.addEventListener("change", () => { if (reduceMotion.matches) { optics.setPlaying(false);rayPlaying=false;playButton.setAttribute("aria-pressed","false");requestRender(); } });

	canvas.addEventListener("pointerdown", (event) => {
		pointerStart = { x: event.clientX, y: event.clientY };
		pointerDragged = false;
	});

	canvas.addEventListener("pointermove", (event) => {
		if (!pointerStart) return;
		pointerDragged ||= Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 6;
	});

	canvas.addEventListener("pointercancel", () => {
		pointerStart = null;
		pointerDragged = false;
	});

	canvas.addEventListener("click", (event) => {
		const shouldSelect = !pointerDragged;
		pointerStart = null;
		pointerDragged = false;
		if (!shouldSelect) return;

		const satellite = getSatellite();

		const bounds = canvas.getBoundingClientRect();
		pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
		pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
		raycaster.setFromCamera(pointer, camera);
  if (["mirror","rays"].includes(activeView)) {
   raycaster.params.Line.threshold = .035;
   const hit=raycaster.intersectObject(optics.root,true).find(hit=>isObjectVisible(hit.object) && hit.object.userData.component);
	if(hit)selectOpticalComponent(hit.object.userData.component);
   return;
  }
  if(["instrument","instrument-interior"].includes(activeView)) {
   const root=getInstrument();
   if(!root)return;
   const hit=raycaster.intersectObject(root,true).find(hit=>isObjectVisible(hit.object));
   const component=hit && instrumentComponents?.getComponent(hit.object);
   if(component)selectInstrumentComponent(component);
   return;
  }
  if(activeView==="parts") {
   const root=parts.getActive();
   if(!root)return;
   const hit=raycaster.intersectObject(root,true).find(hit=>isObjectVisible(hit.object));
	if(hit){parts.highlight([hit.object]);opticsPanel.hidden=false;opticsPanel.querySelectorAll('p:not(#optical-selection),label,select,.optical-components,#ray-play').forEach(element=>element.hidden=true);opticalSelection.hidden=false;opticalSelection.textContent="CAD part: "+(hit.object.name||hit.object.parent?.name||"Unnamed part")+". Name from the supplied CAD model.";requestRender();}
   return;
  }
  if (!satellite) return;
		const hit = raycaster.intersectObjects(getSelectableComponentMeshes(), false).find(hit => isObjectVisible(hit.object));
		const component = hit && getComponentFromObject(hit.object);
		if (component) selectComponent(component, hit.object);
	});
}

try {
	initializeExperience();
} catch {
	document.documentElement.classList.remove("js-enhanced");
}
