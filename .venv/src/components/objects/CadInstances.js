import * as THREE from "three";

// Draw repeated CAD geometry once per material/component. The named source
// meshes remain available for precise picking, explanations and cutaways.
export function createCadInstances(root, getComponent) {
	const groups = new Map();
	const sources = [];
	root.updateWorldMatrix(true, true);
	const inverseRoot = root.matrixWorld.clone().invert();
	root.traverse(mesh => {
		if (!mesh.isMesh || mesh.isInstancedMesh) return;
		const matrix = new THREE.Matrix4().multiplyMatrices(inverseRoot, mesh.matrixWorld);
		if (matrix.determinant() <= 0) return;
		const materials = [].concat(mesh.material).map(material => material.uuid).join(",");
		const key = `${mesh.geometry.uuid}/${materials}/${getComponent(mesh) ?? "other"}`;
		if (!groups.has(key)) groups.set(key, []);
		const source = { mesh, matrix, mask: mesh.layers.mask, visible: undefined };
		groups.get(key).push(source);
		sources.push(source);
	});
	const renderRoot = new THREE.Group();
	renderRoot.name = "CAD render instances";
	renderRoot.matrixAutoUpdate = false;
	const batches = [];
	for (const entries of groups.values()) {
		if (entries.length < 2) continue;
		const first = entries[0].mesh;
		const mesh = new THREE.InstancedMesh(first.geometry, first.material, entries.length);
		mesh.name = `Instances of ${first.name}`;
		mesh.userData.renderBatch = true;
		mesh.userData.cadComponent = getComponent(first);
		mesh.matrixAutoUpdate = false;
		mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
		// Pick the original named CAD mesh, not a duplicate render instance.
		mesh.raycast = () => {};
		for (const entry of entries) entry.mesh.layers.set(1);
		renderRoot.add(mesh);
		batches.push({ mesh, entries });
	}
	root.add(renderRoot);

	function sync() {
		if (!root.visible) return;
		for (const batch of batches) {
			let changed = false;
			let material = null;
			for (const entry of batch.entries) {
				let visible = true;
				for (let object = entry.mesh; object && object !== root; object = object.parent) {
					if (!object.visible) { visible = false; break; }
				}
				if (entry.visible !== visible) { entry.visible = visible; changed = true; }
				if (visible && !material) material = entry.mesh.material;
			}
			batch.mesh.material = material ?? batch.entries[0].mesh.material;
			if (!changed) continue;
			let count = 0;
			for (const entry of batch.entries) {
				if (entry.visible) batch.mesh.setMatrixAt(count++, entry.matrix);
			}
			batch.mesh.count = count;
			batch.mesh.visible = count > 0;
			batch.mesh.instanceMatrix.needsUpdate = true;
			if (count) {
				batch.mesh.computeBoundingBox();
				batch.mesh.computeBoundingSphere();
			}
		}
	}
	sync();
	return {
		sync,
		stats: {
			sourceMeshes: sources.length,
			instancedMeshes: batches.reduce((sum, batch) => sum + batch.entries.length, 0),
			batches: batches.length,
		},
		dispose() {
			for (const source of sources) source.mesh.layers.mask = source.mask;
			for (const batch of batches) batch.mesh.dispose();
			root.remove(renderRoot);
		},
	};
}
