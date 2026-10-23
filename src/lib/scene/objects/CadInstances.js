import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

export function createCadInstances(root, getComponent) {
	const groups = new Map()
	const sources = []
	root.updateWorldMatrix(true, true)
	const inverseRoot = root.matrixWorld.clone().invert()
	root.traverse((mesh) => {
		if (!mesh.isMesh || mesh.isInstancedMesh) return
		const matrix = new THREE.Matrix4().multiplyMatrices(
			inverseRoot,
			mesh.matrixWorld,
		)
		if (matrix.determinant() <= 0 || Array.isArray(mesh.material)) return
		const key = `${mesh.geometry.uuid}/${mesh.material.uuid}/${getComponent(mesh) ?? 'other'}`
		if (!groups.has(key)) groups.set(key, [])
		const entry = {
			mesh,
			matrix,
			mask: mesh.layers.mask,
			visible: undefined,
		}
		groups.get(key).push(entry)
		sources.push(entry)
	})
	const renderRoot = new THREE.Group()
	renderRoot.name = 'CAD render instances'
	renderRoot.matrixAutoUpdate = false
	const batches = []
	const unique = new Map()
	for (const entries of groups.values()) {
		const first = entries[0].mesh
		if (
			entries.length <= 8 &&
			!first.geometry.groups.length &&
			getComponent(first) !== 'solarPanel'
		) {
			const attributes = Object.entries(first.geometry.attributes)
				.map(([name, a]) => `${name}:${a.itemSize}:${a.normalized}`)
				.sort()
				.join(',')
			const key = `${first.material.uuid}/${getComponent(first) ?? 'other'}/${Boolean(first.geometry.index)}/${attributes}`
			if (!unique.has(key)) unique.set(key, [])
			unique.get(key).push(...entries)
			continue
		}
		const mesh = new THREE.InstancedMesh(
			first.geometry.clone(),
			first.material,
			entries.length,
		)
		mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
		batches.push({ mesh, entries, instanced: true })
	}
	for (const entries of unique.values()) {
		const parts = entries.map((entry) => {
			const geometry = entry.mesh.geometry.clone()
			for (const [name, attribute] of Object.entries(
				geometry.attributes,
			)) {
				const values = new Float32Array(
					attribute.count * attribute.itemSize,
				)
				for (let i = 0; i < attribute.count; i++) {
					for (
						let component = 0;
						component < attribute.itemSize;
						component++
					) {
						values[i * attribute.itemSize + component] =
							attribute.getComponent(i, component)
					}
				}
				geometry.setAttribute(
					name,
					new THREE.Float32BufferAttribute(
						values,
						attribute.itemSize,
					),
				)
			}
			return geometry.applyMatrix4(entry.matrix)
		})
		const geometry = parts.length === 1 ? parts[0] : mergeGeometries(parts)
		if (!geometry) {
			parts.forEach((p) => p.dispose())
			continue
		}
		const mesh = new THREE.Mesh(geometry, entries[0].mesh.material)
		batches.push({
			mesh,
			entries,
			parts,
			fullGeometry: geometry,
			instanced: false,
		})
	}
	for (const batch of batches) {
		const { mesh, entries } = batch
		mesh.name = `Render batch: ${entries[0].mesh.name}`
		mesh.userData.renderBatch = true
		mesh.userData.cadComponent = getComponent(entries[0].mesh)
		mesh.matrixAutoUpdate = false
		mesh.raycast = () => {}
		entries.forEach((entry) => entry.mesh.layers.set(1))
		renderRoot.add(mesh)
	}
	root.add(renderRoot)
	function sync() {
		if (!root.visible) return
		for (const batch of batches) {
			let changed = false
			let material = null
			let count = 0
			for (const entry of batch.entries) {
				let visible = true
				for (
					let object = entry.mesh;
					object && object !== root;
					object = object.parent
				) {
					if (!object.visible) {
						visible = false
						break
					}
				}
				if (entry.visible !== visible) {
					entry.visible = visible
					changed = true
				}
				if (visible) {
					count++
					material ??= entry.mesh.material
				}
			}
			batch.mesh.material = material ?? batch.entries[0].mesh.material
			if (!changed) continue
			batch.mesh.visible = count > 0
			if (batch.instanced) {
				let index = 0
				for (const entry of batch.entries)
					if (entry.visible)
						batch.mesh.setMatrixAt(index++, entry.matrix)
				batch.mesh.count = count
				batch.mesh.instanceMatrix.needsUpdate = true
				if (count) {
					batch.mesh.computeBoundingBox()
					batch.mesh.computeBoundingSphere()
				}
			} else if (count) {
				const previous = batch.mesh.geometry
				batch.mesh.geometry =
					count === batch.entries.length
						? batch.fullGeometry
						: mergeGeometries(
								batch.parts.filter(
									(_, i) => batch.entries[i].visible,
								),
							)
				if (
					previous !== batch.fullGeometry &&
					previous !== batch.mesh.geometry
				)
					previous.dispose()
			}
		}
	}
	sync()
	return {
		sync,
		renderRoot,
		stats: {
			sourceMeshes: sources.length,
			instancedMeshes: batches
				.filter((b) => b.instanced)
				.reduce((sum, b) => sum + b.entries.length, 0),
			batches: batches.length,
		},
		dispose() {
			sources.forEach((source) => (source.mesh.layers.mask = source.mask))
			for (const batch of batches) {
				if (batch.instanced) {
					batch.mesh.dispose()
					batch.mesh.geometry.dispose()
				} else {
					if (batch.mesh.geometry !== batch.fullGeometry)
						batch.mesh.geometry.dispose()
					batch.fullGeometry.dispose()
					batch.parts.forEach((p) => {
						if (p !== batch.fullGeometry) p.dispose()
					})
				}
			}
			root.remove(renderRoot)
		},
	}
}
