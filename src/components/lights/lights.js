import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export function createLights(scene, renderer) {
    const room = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(renderer);
    scene.environment = generator.fromScene(room, 0.04).texture;
    scene.environmentIntensity = 0.5;
    generator.dispose();
    room.dispose();
    const hemisphere = new THREE.HemisphereLight(0xdfe8f2, 0x677487, 0.32);
    const key = new THREE.DirectionalLight(0xffffff, 2.7);
    const fill = new THREE.DirectionalLight(0xf0f4ff, 0.5);
    const rim = new THREE.DirectionalLight(0xe8f1ff, 1.1);
    const offsets = [
        [key, new THREE.Vector3(-3, 4, 6)],
        [fill, new THREE.Vector3(4, 1, 3)],
        [rim, new THREE.Vector3(1, 3, -4)],
    ];
    scene.add(hemisphere, key, fill, rim, key.target, fill.target, rim.target);
    return {
        update(camera, target) {
            // Keep the light balance stable while the visitor orbits the assembly.
            for (const [light, offset] of offsets) {
                light.position.copy(offset).applyQuaternion(camera.quaternion).add(target);
                light.target.position.copy(target);
            }
        },
    };
}
