import * as THREE from 'three'

export function computeRenderableBounds(object) {
	const box = new THREE.Box3().makeEmpty()
	const partBox = new THREE.Box3()
	const instanceMatrix = new THREE.Matrix4()
	object.updateWorldMatrix(true, true)
	object.traverseVisible((child) => {
		const geometry = child.isMesh ? child.geometry : null
		if (!geometry) return
		if (!geometry.boundingBox) geometry.computeBoundingBox()
		if (!geometry.boundingBox) return
		if (child.isInstancedMesh) {
			if (!child.count || !child.instanceMatrix) return
			for (let index = 0; index < child.count; index += 1) {
				child.getMatrixAt(index, instanceMatrix)
				instanceMatrix.premultiply(child.matrixWorld)
				box.union(
					partBox
						.copy(geometry.boundingBox)
						.applyMatrix4(instanceMatrix),
				)
			}
			return
		}
		box.union(
			partBox.copy(geometry.boundingBox).applyMatrix4(child.matrixWorld),
		)
	})
	return box.isEmpty() ? new THREE.Box3().setFromObject(object) : box
}
