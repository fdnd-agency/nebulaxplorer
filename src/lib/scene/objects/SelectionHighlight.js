import * as THREE from 'three'

const highlightColor = new THREE.Color(0xffaa70)
const ghostColor = new THREE.Color(0x607080)

function createGlowMaterial(base) {
	const material = base.clone()
	material.userData.selectionHighlight = true
	material.color?.lerp(
		highlightColor,
		material.isLineBasicMaterial ? 0.85 : 0.28,
	)
	if (material.emissive) {
		material.emissive.copy(highlightColor)
		material.emissiveIntensity = Math.max(
			material.emissiveIntensity ?? 0,
			0.42,
		)
	}
	if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
		material.onBeforeCompile = (shader) => {
			shader.uniforms.selectionColor = {
				value: highlightColor.clone(),
			}
			shader.fragmentShader =
				'uniform vec3 selectionColor;\n' + shader.fragmentShader
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <emissivemap_fragment>',
				`#include <emissivemap_fragment>
				float selectionRim = pow(1.0 - abs(dot(normal, normalize(vViewPosition))), 2.0);
				totalEmissiveRadiance += selectionColor * selectionRim * 0.9;`,
			)
		}
		material.customProgramCacheKey = () => 'nebula-selection-rim-v1'
	}
	return material
}

function createGhostMaterial(base, ghostOpacity) {
	const material = base.clone()
	material.color?.lerp(ghostColor, 0.85)
	material.metalness = 0.1
	material.roughness = 0.8
	material.transparent = true
	material.opacity = base.opacity * ghostOpacity
	material.depthWrite = false
	material.forceSinglePass = true
	return material
}

export function createSelectionHighlight(root, { ghostOpacity = 0.12 } = {}) {
	const originals = new Map()
	const temporaryMaterials = new Set()
	const glowing = new Map()
	const ghosted = new Map()
	const previewed = new Map()
	root.traverse((object) => {
		if ((object.isMesh || object.isLine) && object.material)
			originals.set(object, object.material)
	})

	function getMaterial(base, active) {
		const cache = active ? glowing : ghosted
		if (!cache.has(base)) {
			const material = active
				? createGlowMaterial(base)
				: createGhostMaterial(base, ghostOpacity)
			cache.set(base, material)
			temporaryMaterials.add(material)
		}
		return cache.get(base)
	}

	function getMaterials(source, active) {
		const materials = []
			.concat(source)
			.map((base) => getMaterial(base, active))
		return Array.isArray(source) ? materials : materials[0]
	}

	function clearPreview() {
		for (const [object, material] of previewed) object.material = material
		previewed.clear()
	}

	function clear() {
		previewed.clear()
		for (const [object, material] of originals) object.material = material
	}

	function apply(meshes) {
		clear()
		const selected = new Set(meshes)
		if (!selected.size) return
		for (const [object, source] of originals)
			object.material = getMaterials(source, selected.has(object))
	}

	function preview(meshes) {
		clearPreview()
		for (const object of meshes) {
			const source = originals.get(object)
			if (!source) continue
			previewed.set(object, object.material)
			object.material = getMaterials(source, true)
		}
	}

	return {
		apply,
		clear,
		preview,
		clearPreview,
		dispose() {
			clear()
			for (const material of temporaryMaterials) material.dispose()
			temporaryMaterials.clear()
			glowing.clear()
			ghosted.clear()
		},
	}
}
