import TWEEN from "three/examples/jsm/libs/tween.module.js";
import * as THREE from "three";

let cameraTween;

export function stopCameraTween() {
	cameraTween?.stop();
	cameraTween = undefined;
}

export function resetCamera(controls, camera, duration = 1100) {
	stopCameraTween();
	const startPosition = camera.position.clone();
	const startTarget = controls.target.clone();
	const overviewPosition = new THREE.Vector3(0, 0, 5);
	const overviewTarget = new THREE.Vector3();

	if (duration === 0) {
		camera.position.copy(overviewPosition);
		controls.target.copy(overviewTarget);
		controls.update();
		return;
	}

	cameraTween = new TWEEN.Tween({ progress: 0 })
		.to({ progress: 1 }, duration)
		.easing(TWEEN.Easing.Cubic.InOut)
		.onUpdate(({ progress }) => {
			camera.position.lerpVectors(startPosition, overviewPosition, progress);
			controls.target.lerpVectors(startTarget, overviewTarget, progress);
			controls.update();
		})
		.onComplete(() => {
			cameraTween = undefined;
		})
		.start();
}

export function updateCamera(controls, camera, focus, duration = 1100) {
	stopCameraTween();
	camera.up.set(0, 1, 0);

	const startTarget = controls.target.clone();
	const startDirection = camera.position.clone().sub(startTarget).normalize();
	const orbitRotation = new THREE.Quaternion().setFromUnitVectors(
		startDirection,
		focus.direction,
	);
	const currentDistance = camera.position.distanceTo(controls.target);
	const minimumDistance = Math.max(focus.satelliteRadius * 1.2, focus.componentRadius * 4.5);
	const maximumDistance = focus.satelliteRadius * 2.75;
	const componentDistance = THREE.MathUtils.clamp(
		focus.satelliteRadius * 1.55 + focus.componentRadius * 4.5,
		minimumDistance,
		maximumDistance,
	);
	let distance = THREE.MathUtils.clamp(
		THREE.MathUtils.lerp(currentDistance, componentDistance, 0.35),
		minimumDistance,
		maximumDistance,
	);
	if (focus.detailView) {
		const verticalFov = THREE.MathUtils.degToRad(camera.fov);
		const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
		distance = focus.componentRadius / Math.sin(Math.min(verticalFov, horizontalFov) / 2) * 2.5;
		controls.minDistance = distance * 0.65;
		controls.maxDistance = maximumDistance;
	} else {
		controls.minDistance = focus.satelliteRadius * 0.75;
	}
	const orbitQuaternion = new THREE.Quaternion();
	const orbitDirection = new THREE.Vector3();
	const target = new THREE.Vector3();

	if (duration === 0) {
		camera.position.copy(focus.componentCenter).addScaledVector(focus.direction, distance);
		controls.target.copy(focus.componentCenter);
		controls.update();
		return;
	}

	cameraTween = new TWEEN.Tween({ progress: 0 })
		.to({ progress: 1 }, duration)
		.easing(TWEEN.Easing.Cubic.InOut)
		.onUpdate(({ progress }) => {
			target.lerpVectors(startTarget, focus.componentCenter, progress);
			orbitQuaternion.identity().slerp(orbitRotation, progress);
			orbitDirection.copy(startDirection).applyQuaternion(orbitQuaternion);
			camera.position.copy(target).addScaledVector(orbitDirection, THREE.MathUtils.lerp(currentDistance, distance, progress));
			controls.target.copy(target);
			controls.update();
		})
		.onComplete(() => {
			cameraTween = undefined;
		})
		.start();
}
