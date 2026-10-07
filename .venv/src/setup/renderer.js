// alles wat 3d is ff op je scherm knallen

import * as THREE from 'three';

export function createRenderer() {
    const canvas = document.querySelector('#app');

    if (!canvas) return null;

    try {
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });

        const maximumPixelRatio = 2;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, maximumPixelRatio));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.9;

        return renderer;
    } catch {
        return null;
    }
}
