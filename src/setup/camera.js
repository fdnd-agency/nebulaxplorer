// startplek v/d cam

import * as THREE from 'three';

export function createCamera() {
    const camera = new THREE.PerspectiveCamera(
        20,
        1,
        0.1,
        1000
    );

    camera.position.z = 5;
    camera.up.set(0, 1, 0);

    return camera;
}
