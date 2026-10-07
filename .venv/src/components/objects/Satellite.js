// alles v/d sat zit hier
import * as THREE from "three";
import TWEEN from "three/examples/jsm/libs/tween.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { createSelectionHighlight } from "./SelectionHighlight.js";

const satelliteModelUrl = new URL("../../scripts/Satellite.source-colors.glb", import.meta.url).href;
const instrumentModelUrl = new URL("../../scripts/Instrument.source-colors.glb", import.meta.url).href;

let satelliteRoot = null;
let instrumentRoot = null;
let instrumentLoadPromise = null;
let currentView = "satellite";
let satelliteMaterialMap = [];
let satelliteHighlight = null;

const componentMeshNames = {
	xrayInstrument: [
		"Instrument19-6_C",
		"InstrumentHexa_B",
		"Concentrator_Sunshields",
		"Concentrator_Sunshades",
		"Instrument_Electronics_Module",
	],
	starTrackerModule: [
		"ST-16RT2-LRB",
		"StarTracker_Mounting",
		"StarTracker_BracketPlate_C4",
		"StarTracker_Cap_C4",
		"Mounting_Bracket_1(STBT)",
	],
	dawn4UCubeDrive: [
		"PropulsionModule",
		"PropulsionModule_Box_SD5_1",
		"PropulsionModule_FuelTank_SD5_1",
		"PropulsionModule_OxidizerTank_SD5_1",
		"PropulsionModule_MountingPlate_SD5_1",
	],
	sBandAntenna: ["S-Band_PatchAntenna_ISISpace", "S-BandQuadPatchAntenna", "S-Band_Diplexer"],
	sunSensor: ["SunSensor_Bison64"],
	magnetorquers: ["MagnetoTorquer_MT10-2-H"],
	solarPanel: [
		"Solar Panels_step",
		"Solar Panels",
		"Deployed 910x570 Sparkwing",
		"SARA_",
		"SARA_Mounting_SolarArray",
		"SARA-v02.01.00.001_CASING_REV00_stp_1",
	],
};

const satelliteInteriorHideNames = [
	"Top_Side_Panel",
	"Upper_Side_Panel",
	"Lower_Side_Panel",
	"Bottom_Side_Panel",
	"Solar Panels_step",
	"Solar Panels",
	"Deployed 910x570 Sparkwing",
	"SARA_",
	"SARA_Mounting_SolarArray",
	"SARA-v02.01.00.001_CASING_REV00_stp_1",
	"Side_Panel",
	"side_panel",
	"Panel",
	"Concentrator_Sunshades_step",
];

const meshComponents = new Map();
const componentMeshes = new Map();

const visualCategories = {
	BODY_DARK: new THREE.MeshStandardMaterial({
		name: "Nebula Xplorer Base / BODY_DARK",
		color: 0x404348,
		metalness: 0.2824,
		roughness: 0.3872727155685425,
		side: THREE.DoubleSide,
	}),
	SOLAR_CELL_BLUE: new THREE.MeshStandardMaterial({
		name: "Nebula Xplorer Solar Panel / SOLAR_CELL_BLUE",
		color: 0x174172,
		emissive: 0x174172,
		emissiveIntensity: 0.3,
		metalness: 0.4471,
		roughness: 0.307272732257843,
		side: THREE.DoubleSide,
	}),
	SOLAR_FRAME_METAL: new THREE.MeshStandardMaterial({
		name: "Nebula Xplorer Solar Panel / SOLAR_FRAME_METAL",
		color: 0x404348,
		metalness: 0.2824,
		roughness: 0.307272732257843,
		side: THREE.DoubleSide,
	}),
	STRUCTURE_ALUMINIUM: new THREE.MeshStandardMaterial({
		name: "Nebula Xplorer Base / STRUCTURE_ALUMINIUM",
		color: 0xcacaca,
		metalness: 0.7921,
		roughness: 0.3872727155685425,
		side: THREE.DoubleSide,
	}),
	INSTRUMENT_METAL: new THREE.MeshStandardMaterial({
		name: "Nebula Xplorer Base / INSTRUMENT_METAL",
		color: 0xcacaca,
		metalness: 0.7921,
		roughness: 0.3872727155685425,
		side: THREE.DoubleSide,
	}),
	GOLD_EDGE: new THREE.MeshStandardMaterial({
		name: "Nebula Xplorer Base / GOLD_EDGE",
		color: 0x918d47,
		metalness: 0.2745,
		roughness: 0.3872727155685425,
		side: THREE.DoubleSide,
	}),
	SENSOR: new THREE.MeshStandardMaterial({
		name: "Nebula Xplorer Base / SENSOR",
		color: 0xa5a5a5,
		metalness: 0.6476,
		roughness: 0.3872727155685425,
		side: THREE.DoubleSide,
	}),
};

const bodyMeshNames = new Set([
	"sidepanel_c4",
	"mirrored_sidepanel_c4",
	"lv_adapter_panel_c4",
	"part104",
	"part264",
	"part266",
	"part268",
	"part272",
	"part272_1",
	"p2",
	"p2_1",
	"p3",
	"p3_1",
	"p6",
	"p12",
	"six_ob_b",
	"concentrator_sunshades_step",
]);

function getVisualCategory(object) {
	const name = object.parent?.name?.toLowerCase() ?? "";
	if (/^solar_panels_step/.test(name)) return "SOLAR_CELL_BLUE";
	if (/^deployed_910x570_sparkwing|^sara[-_]|^simplified_sara/.test(name)) return "SOLAR_FRAME_METAL";
	if (bodyMeshNames.has(name)) return "BODY_DARK";
	if (/^(sixfp|dh-|pa210|pa-230|sdd_to|collimator|fe55|backplatefe55|caltube|rib|con_work_e)/.test(name)) return "INSTRUMENT_METAL";
	if (/startracker|st-16rt2|sensor|antenna|diplexer|magnetometer|magnetotorquer/.test(name)) return "SENSOR";
	if (/ansi_|iso_|din_|bracket|brkt|mounting|rod|frame|shaft|casing|hinge|screw|bolt|washer|nut|bshcs|fshcs|fastener|propulsion|tank|thruster|rocketlab/.test(name)) return "STRUCTURE_ALUMINIUM";
	return "OTHER";
}

function getObjectPath(object) {
	const names = [];
	let current = object;
	while (current) {
		if (current.name) names.push(current.name.toLowerCase().replace(/[\s:.-]+/g, "_"));
		current = current.parent;
	}
	return names.join(" ");
}

function matchesComponentName(name, candidates) {
	if (!name) return false;
	const pathTokens = name.split(" ");
	return candidates.some((candidate) => candidate && pathTokens.some((token) => token === candidate || token.startsWith(candidate)));
}

function matchesInteriorHideName(name, candidates) {
	return candidates.some((candidate) => candidate && name.includes(candidate));
}

function registerMeshComponent(object, root) {
	if (!object.isMesh || root.name !== "NebulaSatellite") return;
	const objectPath = getObjectPath(object);
	for (const [component, names] of Object.entries(componentMeshNames)) {
		if (matchesComponentName(objectPath, names.map((name) => name.toLowerCase().replace(/[\s:.-]+/g, "_")))) {
			meshComponents.set(object, component);
			if (!componentMeshes.has(component)) componentMeshes.set(component, []);
			componentMeshes.get(component).push(object);
			break;
		}
	}
}

function prepareModelMaterials(root, applyReferenceAppearance) {
	const report = [];
	const displayMaterials = new Map();
	root.updateWorldMatrix(true, true);

	root.traverse((object) => {
		if (!object.isMesh || !object.material) return;
		const importedMaterials = Array.isArray(object.material) ? object.material : [object.material];
		const category = applyReferenceAppearance ? getVisualCategory(object) : "OTHER";
		const bounds = object.geometry.boundingBox ?? object.geometry.computeBoundingBox() ?? object.geometry.boundingBox;
		const worldBounds = bounds?.clone().applyMatrix4(object.matrixWorld);

		report.push({
			meshName: object.name,
			parentName: object.parent?.name ?? "",
			existingMaterialName: importedMaterials.map((material) => material.name || "(unnamed)").join(", "),
			boundingBox: worldBounds ? {
				min: worldBounds.min.toArray(),
				max: worldBounds.max.toArray(),
			} : null,
			assignedVisualCategory: category,
		});

		if (category !== "OTHER") object.material = visualCategories[category];
		else {
			// Keep STEP base colors, but soften its all-metal export defaults.
			const materials = importedMaterials.map((source) => {
				if (!displayMaterials.has(source)) {
					const material = source.clone();
					material.metalness = Math.min(material.metalness, 0.5);
					material.roughness = THREE.MathUtils.clamp(material.roughness, 0.35, 0.46);
					displayMaterials.set(source, material);
				}
				return displayMaterials.get(source);
			});
			object.material = Array.isArray(object.material) ? materials : materials[0];
		}
		registerMeshComponent(object, root);
	});

	return report;
}

function setInstrumentInteriorVisibility(isInterior) {
	if (!satelliteRoot) return;
	satelliteRoot.traverse((object) => {
		if (!object.isMesh) return;
		// P2/P3/P6/P12 are the instrument's six solid enclosure walls.
		// Keep the optical bench, concentrators and mounting hardware visible.
		const instrumentWall = object.parent?.name.startsWith("InstrumentHexa_B")
			&& /^(?:P2|P3|P6|P12)\d*$/.test(object.name);
		const shouldHide = isInterior && (instrumentWall || matchesInteriorHideName(getObjectPath(object), satelliteInteriorHideNames.map((name) => name.toLowerCase().replace(/[\s:.-]+/g, "_"))));
		if (shouldHide) {
			object.userData.wasHiddenByInterior = true;
			object.visible = false;
			return;
		}
		if (object.userData.wasHiddenByInterior) {
			object.visible = true;
			delete object.userData.wasHiddenByInterior;
		}
	});
}

function loadModel(url, modelName, applyReferenceAppearance = false) {
	return new Promise((resolve, reject) => {
		const loader = new GLTFLoader();
		loader.setMeshoptDecoder(MeshoptDecoder);
		loader.load(
			url,
			(glbData) => {
				const root = glbData.scene || glbData.scenes?.[0];
				if (!root) {
					reject(new Error(`No scene found for ${modelName}`));
					return;
				}

				root.name = modelName;
				root.visible = true;
				const materialMap = prepareModelMaterials(root, applyReferenceAppearance);
				// CAD parts stay fixed relative to their assembly. Visibility and
				// materials can still change without rebuilding local matrices.
				root.traverse((object) => {
					if (object === root) return;
					object.updateMatrix();
					object.matrixAutoUpdate = false;
				});
				if (modelName === "NebulaSatellite") satelliteMaterialMap = materialMap;

				console.log(`[${modelName}] loaded`, getModelStats(root));
				resolve(root);
			},
			undefined,
			(error) => {
				console.error(`Error loading ${modelName} GLB:`, url, error);
				reject(error);
			},
		);
	});
}

export function getModelStats(object) {
	if (!object) return null;
	object.updateMatrixWorld(true, true);
	const box = new THREE.Box3().setFromObject(object);
	const size = box.getSize(new THREE.Vector3());
	const center = box.getCenter(new THREE.Vector3());
	const radius = box.getBoundingSphere(new THREE.Sphere()).radius;
	return {
		box,
		center,
		size,
		radius,
		maxDimension: Math.max(size.x, size.y, size.z),
	};
}

export function frameModelRoot(camera, controls, object, { padding = 1.6, direction } = {}) {
	if (!object || !camera || !controls) return null;
	const stats = getModelStats(object);
	if (!stats) return null;

	const verticalFov = THREE.MathUtils.degToRad(camera.fov);
	const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
	const limitingFov = Math.min(verticalFov, horizontalFov);
	const distance = (stats.radius / Math.sin(limitingFov / 2)) * padding;
	const cameraOffset = direction
		? new THREE.Vector3(...direction).normalize().multiplyScalar(distance)
		: new THREE.Vector3(0, stats.radius * 0.18, distance);
	const targetPosition = stats.center.clone();
	const cameraPosition = targetPosition.clone().add(cameraOffset);

	camera.position.copy(cameraPosition);
	controls.target.copy(targetPosition);
	controls.minDistance = distance * 0.25;
	controls.maxDistance = distance * 1.55;
	camera.near = Math.max(0.1, stats.radius * 0.02);
	camera.far = distance + stats.radius * 10;
	camera.updateProjectionMatrix();
	// Flush the previous view's damping before setting this view's orbit.
	const damping = controls.enableDamping;
	const autoRotate = controls.autoRotate;
	controls.enableDamping = false;
	controls.autoRotate = false;
	controls.update();
	camera.position.copy(cameraPosition);
	controls.target.copy(targetPosition);
	controls.update();
	controls.enableDamping = damping;
	controls.autoRotate = autoRotate;

	console.log("[camera-framing]", {
		center: targetPosition.toArray(),
		size: stats.size.toArray(),
		radius: stats.radius,
		cameraPosition: cameraPosition.toArray(),
	});

	return stats;
}

export function loadSatellite(scene, { onLoad, onError } = {}) {
	loadModel(satelliteModelUrl, "NebulaSatellite", false)
		.then((satellite) => {
			satelliteRoot = satellite;
			satelliteHighlight = createSelectionHighlight(satelliteRoot);
			setView("satellite");

			scene.add(satelliteRoot);
			console.log("[scene] satellite added", satelliteRoot.name);

			onLoad?.(satelliteRoot, getModelStats(satelliteRoot));
		})
		.catch((error) => {
			console.error("[scene] model failure", error);
			onError?.(error);
		});
}

export function loadInstrument(scene) {
	if (instrumentRoot) return Promise.resolve(instrumentRoot);
	if (instrumentLoadPromise) return instrumentLoadPromise;

	instrumentLoadPromise = loadModel(instrumentModelUrl, "InstrumentAssembly")
		.then((instrument) => {
			instrumentRoot = instrument;
			instrumentRoot.visible = false;
			scene.add(instrumentRoot);
			return instrumentRoot;
		})
		.catch((error) => {
			instrumentLoadPromise = null;
			throw error;
		});

	return instrumentLoadPromise;
}

export function getSatellite() {
	return satelliteRoot;
}

export function getInstrument() {
	return instrumentRoot;
}

export function getSatelliteMaterialMap() {
	return satelliteMaterialMap;
}

export function getCurrentView() {
	return currentView;
}

export function setView(viewName) {
	const nextView = viewName === "interior" ? "interior" : viewName === "instrument" ? "instrument" : "satellite";
	currentView = nextView;

	if (satelliteRoot) {
		satelliteRoot.visible = nextView !== "instrument";
		if (nextView === "interior") {
			setInstrumentInteriorVisibility(true);
		} else {
			setInstrumentInteriorVisibility(false);
		}
	}

	if (instrumentRoot) {
		instrumentRoot.visible = nextView === "instrument";
	}

	console.log("[view]", nextView);
	return nextView;
}

export function showSatellite() {
	setView("satellite");
}

export function showSatelliteInterior() {
	setView("interior");
}

export function showInstrument() {
	setView("instrument");
	setInstrumentPanels(false);
}

function setInstrumentPanels(hidden) {
	if (!instrumentRoot) return;
	instrumentRoot.traverse((object) => {
		if (!object.isMesh) return;
		const path = getObjectPath(object);
		if (!["top_side_panel", "upper_side_panel", "lower_side_panel", "bottom_side_panel"].some((name) => path.includes(name))) return;
		object.visible = !hidden;
	});
}

export function showInstrumentInterior() {
	setView("instrument");
	setInstrumentPanels(true);
}

export function getComponentFromObject(object) {
	let current = object;
	while (current) {
		const component = meshComponents.get(current);
		if (component) return component;
		current = current.parent;
	}
	return null;
}

export function getSelectableComponentMeshes() {
	return [...meshComponents.keys()];
}

export function getComponentFocus(component, { camera, object } = {}) {
	if (!satelliteRoot) return null;

	satelliteRoot.updateWorldMatrix(true, true);
	if (component === "sunSensor") {
		const sensors = new Set();
		for (const mesh of componentMeshes.get(component) ?? []) {
			for (let node = mesh; node && node !== satelliteRoot; node = node.parent) {
				if (node.name.startsWith("SunSensor_Bison64")) { sensors.add(node); break; }
			}
		}
		const satelliteBox = new THREE.Box3().setFromObject(satelliteRoot);
		const satelliteCenter = satelliteBox.getCenter(new THREE.Vector3());
		const viewDirection = camera ? camera.position.clone().sub(satelliteCenter).normalize() : new THREE.Vector3(0.8, 0.5, 1).normalize();
		let clickedSensor = object;
		while (clickedSensor && !sensors.has(clickedSensor)) clickedSensor = clickedSensor.parent;
		let bestFocus = null;
		let bestScore = -Infinity;
		for (const sensor of sensors) {
			const box = new THREE.Box3().setFromObject(sensor);
			const size = box.getSize(new THREE.Vector3());
			const center = box.getCenter(new THREE.Vector3());
			// The sensor's shallow axis is its outward-facing optical surface.
			const axis = [0, 1, 2].reduce((a, b) => size.getComponent(a) < size.getComponent(b) ? a : b);
			const normal = new THREE.Vector3().setComponent(axis, Math.sign(center.getComponent(axis) - satelliteCenter.getComponent(axis)) || 1);
			const score = sensor === clickedSensor ? 2 : normal.dot(viewDirection);
			if (score <= bestScore) continue;
			bestScore = score;
			const tangent = viewDirection.clone().addScaledVector(normal, -viewDirection.dot(normal));
			bestFocus = {
				componentCenter: center,
				direction: normal.addScaledVector(tangent, 0.45).normalize(),
				componentRadius: size.length() / 2,
				satelliteRadius: satelliteBox.getBoundingSphere(new THREE.Sphere()).radius,
				detailView: true,
				focusedObject: sensor,
			};
		}
		return bestFocus;
	}
	const componentBox = new THREE.Box3().makeEmpty();
	let meshCount = 0;

	for (const mesh of componentMeshes.get(component) ?? []) {
		if (!mesh.visible) continue;
		componentBox.expandByObject(mesh);
		meshCount += 1;
	}

	if (meshCount === 0 || componentBox.isEmpty()) return null;

	const satelliteBox = new THREE.Box3().setFromObject(satelliteRoot);
	const componentCenter = componentBox.getCenter(new THREE.Vector3());
	const satelliteCenter = satelliteBox.getCenter(new THREE.Vector3());
	const direction = componentCenter.clone().sub(satelliteCenter);

	if (direction.lengthSq() === 0) direction.set(0, 0, 1).applyQuaternion(satelliteRoot.quaternion);
	direction.normalize();
	// Keep a three-quarter view when focusing a face-mounted component.
	direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.35);
	direction.y = Math.max(direction.y, 0.22);
	direction.normalize();

	const componentRadius = componentBox.getSize(new THREE.Vector3()).length() / 2;
	const satelliteRadius = satelliteBox.getSize(new THREE.Vector3()).length() / 2;

	return { componentCenter, direction, componentRadius, satelliteRadius };
}

export function highlightComponent(component) {
    satelliteHighlight?.apply(componentMeshes.get(component) ?? []);
}

export function rotateSatellite() {
	if (satelliteRoot && currentView !== "instrument") {
		satelliteRoot.rotation.y += 0.001;
		satelliteRoot.rotation.x += 0.0005;
		satelliteRoot.rotation.z += 0.0003;
	}
	if (instrumentRoot && currentView === "instrument") {
		instrumentRoot.rotation.y += 0.001;
		instrumentRoot.rotation.x += 0.0005;
	}
}

export function resetSatellite(duration = 1500) {
	if (satelliteRoot) {
		const startSatelliteRotation = {
			x: satelliteRoot.rotation.x,
			y: satelliteRoot.rotation.y,
			z: satelliteRoot.rotation.z,
		};

		const endSatelliteRotation = {
			x: 0.698,
			y: -0.611,
			z: -0.175,
		};

		if (duration === 0) {
			satelliteRoot.rotation.set(endSatelliteRotation.x, endSatelliteRotation.y, endSatelliteRotation.z);
			return;
		}

		new TWEEN.Tween(startSatelliteRotation)
			.to(endSatelliteRotation, duration)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(() => {
				satelliteRoot.rotation.set(
					startSatelliteRotation.x,
					startSatelliteRotation.y,
					startSatelliteRotation.z,
				);
			})
			.start();
	}
}
