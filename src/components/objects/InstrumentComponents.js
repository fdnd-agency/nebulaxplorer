import * as THREE from "three";
import { createSelectionHighlight } from "./SelectionHighlight.js";

// These groups follow the names in the supplied instrument assembly.
function componentForMesh(mesh) {
	const names = [];
	for (let object = mesh; object; object = object.parent) {
		names.push(object.name.toLowerCase().replace(/[\s:.-]+/g, "_"));
	}
	const path = names.join(" ");
	if (/sandwich_panel/.test(path)) return "support";
	if (/callibration|calibration|fe55|caltube/.test(path)) return "calibration";
	if (/science_baffle/.test(path)) return "baffles";
	if (/preamplifier|pa210|pa_230|housing_/.test(path)) return "electronics";
	if (/fpm_|fpcm_|sensor_/.test(path)) return "detectors";
	if (/rod|fitting|foot|feet/.test(path)) return "mounts";
	return "structure";
}

export function createInstrumentComponents(root) {
	const groups = new Map();
	const meshGroups = new Map();
	const selection = createSelectionHighlight(root, { ghostOpacity: 0.2 });
	root.traverse((mesh) => {
		if (!mesh.isMesh) return;
		const component = componentForMesh(mesh);
		if (!groups.has(component)) groups.set(component, []);
		groups.get(component).push(mesh);
		meshGroups.set(mesh, component);
	});

	return {
		getComponent: (mesh) => meshGroups.get(mesh),
		getMeshes: (component) => groups.get(component) ?? [],
		highlight(component) { selection.apply(groups.get(component) ?? []); },
		getFocus(component, camera, target) {
			root.updateWorldMatrix(true, true);
			const box = new THREE.Box3().makeEmpty();
			for (const mesh of groups.get(component) ?? []) {
				if (mesh.visible) box.expandByObject(mesh);
			}
			if (box.isEmpty()) return null;
			return {
				componentCenter: box.getCenter(new THREE.Vector3()),
				componentRadius: box.getBoundingSphere(new THREE.Sphere()).radius,
				satelliteRadius: new THREE.Box3().setFromObject(root).getBoundingSphere(new THREE.Sphere()).radius,
				direction: camera.position.clone().sub(target).normalize(),
			};
		},
		clearHighlight: selection.clear,
	};
}
