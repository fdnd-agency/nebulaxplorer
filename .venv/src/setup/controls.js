// controls voor ff rondkijken
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let controls;

export function createControls(camera, renderer) {
    controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.rotateSpeed = 1.05;
    controls.zoomSpeed = 0.9;

    return controls;
}

export function updateControls(delta) {
    if (controls) controls.update(delta);
}