import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

export function createLights(scene, renderer) {
	const room = new RoomEnvironment()
	const generator = new THREE.PMREMGenerator(renderer)
	scene.environment = generator.fromScene(room, 0.04).texture
	scene.environmentIntensity = 0.65
	generator.dispose()
	room.dispose()
	const hemisphere = new THREE.HemisphereLight(0xdfe8f2, 0x253140, 0.18)
	const key = new THREE.DirectionalLight(0xfff4e8, 1.9)
	const fill = new THREE.DirectionalLight(0xd3e1f2, 0.45)
	const rim = new THREE.DirectionalLight(0xd7e8ff, 1.2)
	const offsets = [
		[key, new THREE.Vector3(-3, 4, 6)],
		[fill, new THREE.Vector3(4, 1, 3)],
		[rim, new THREE.Vector3(1, 3, -4)],
	]
	scene.add(hemisphere, key, fill, rim, key.target, fill.target, rim.target)
	return {
		update(camera, target) {
			for (const [light, offset] of offsets) {
				light.position
					.copy(offset)
					.applyQuaternion(camera.quaternion)
					.add(target)
				light.target.position.copy(target)
			}
		},
	}
}
