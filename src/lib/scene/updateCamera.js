import TWEEN from 'three/examples/jsm/libs/tween.module.js'
import * as THREE from 'three'

let cameraTween

export function stopCameraTween() {
	cameraTween?.stop()
	cameraTween = undefined
}

export function isCameraMoving() {
	return Boolean(cameraTween?.isPlaying())
}

function startOrbitTween(
	controls,
	camera,
	endTarget,
	endDirection,
	endDistance,
	duration,
) {
	const startTarget = controls.target.clone()
	const startDirection = camera.position.clone().sub(startTarget).normalize()
	const startDistance = camera.position.distanceTo(startTarget)
	const orbitRotation = new THREE.Quaternion().setFromUnitVectors(
		startDirection,
		endDirection,
	)
	const orbitQuaternion = new THREE.Quaternion()
	const orbitDirection = new THREE.Vector3()
	const target = new THREE.Vector3()

	if (duration === 0) {
		camera.position
			.copy(endTarget)
			.addScaledVector(endDirection, endDistance)
		controls.target.copy(endTarget)
		controls.update()
		return
	}

	cameraTween = new TWEEN.Tween({ progress: 0 })
		.to({ progress: 1 }, duration)
		.easing(TWEEN.Easing.Cubic.InOut)
		.onUpdate(({ progress }) => {
			target.lerpVectors(startTarget, endTarget, progress)
			orbitQuaternion.identity().slerp(orbitRotation, progress)
			orbitDirection.copy(startDirection).applyQuaternion(orbitQuaternion)
			camera.position
				.copy(target)
				.addScaledVector(
					orbitDirection,
					THREE.MathUtils.lerp(startDistance, endDistance, progress),
				)
			controls.target.copy(target)
			controls.update()
		})
		.onComplete(() => {
			cameraTween = undefined
		})
		.start()
}

export function moveCamera(controls, camera, framing, duration = 1000) {
	stopCameraTween()
	camera.up.set(0, 1, 0)
	camera.near = Math.min(camera.near, framing.near)
	camera.far = Math.max(camera.far, framing.far)
	camera.updateProjectionMatrix()
	controls.minDistance = Math.min(controls.minDistance, framing.minDistance)
	controls.maxDistance = Math.max(controls.maxDistance, framing.maxDistance)
	const direction = framing.position.clone().sub(framing.target)
	const distance = direction.length()
	startOrbitTween(
		controls,
		camera,
		framing.target,
		direction.normalize(),
		distance,
		duration,
	)
	const settle = () => {
		camera.near = framing.near
		camera.far = framing.far
		camera.updateProjectionMatrix()
		controls.minDistance = framing.minDistance
		controls.maxDistance = framing.maxDistance
	}
	if (cameraTween)
		cameraTween.onComplete(() => {
			cameraTween = undefined
			settle()
		})
	else settle()
}

export function updateCamera(
	controls,
	camera,
	focus,
	duration = 1100,
	{ aspect = camera.aspect } = {},
) {
	stopCameraTween()
	camera.up.set(0, 1, 0)

	const currentDistance = camera.position.distanceTo(controls.target)
	const minimumDistance = Math.max(
		focus.satelliteRadius * 1.2,
		focus.componentRadius * 4.5,
	)
	const maximumDistance = focus.satelliteRadius * 2.75
	const componentDistance = THREE.MathUtils.clamp(
		focus.satelliteRadius * 1.55 + focus.componentRadius * 4.5,
		minimumDistance,
		maximumDistance,
	)
	let distance = THREE.MathUtils.clamp(
		THREE.MathUtils.lerp(currentDistance, componentDistance, 0.35),
		minimumDistance,
		maximumDistance,
	)
	const verticalFov = THREE.MathUtils.degToRad(camera.fov)
	const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect)
	const limitingFov = Math.min(verticalFov, horizontalFov)
	const fitDistance =
		(focus.componentRadius / Math.sin(limitingFov / 2)) * 1.15
	distance = Math.max(distance, fitDistance)
	controls.maxDistance = Math.max(controls.maxDistance, distance * 1.25)
	if (focus.detailView) {
		distance = (focus.componentRadius / Math.sin(limitingFov / 2)) * 2.5
		controls.minDistance = distance * 0.65
		controls.maxDistance = maximumDistance
	} else {
		controls.minDistance = focus.satelliteRadius * 0.75
	}
	startOrbitTween(
		controls,
		camera,
		focus.componentCenter,
		focus.direction,
		distance,
		duration,
	)
}
