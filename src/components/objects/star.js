import * as THREE from "three";

export function createStars(amount, scene) {
    const positions = new Float32Array(amount * 3);
    const colors = new Float32Array(amount * 3);
    const sizes = new Float32Array(amount);
    let seed = 2026;
    const random = () => {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        return seed / 4294967296;
    };
    for (let i = 0; i < amount; i++) {
        const y = random() * 2 - 1;
        const angle = random() * Math.PI * 2;
        const horizontal = Math.sqrt(1 - y * y);
        positions.set([horizontal * Math.cos(angle), y, horizontal * Math.sin(angle)], i * 3);
        const brightness = 0.06 + Math.pow(random(), 3) * 0.65;
        const warmth = random();
        colors.set([brightness, brightness * (0.91 + warmth * 0.08), brightness * (0.85 + warmth * 0.15)], i * 3);
        sizes[i] = random() > 0.96 ? 2.2 : 0.9 + random() * 0.65;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("starSize", new THREE.BufferAttribute(sizes, 1));
    const material = new THREE.ShaderMaterial({
        uniforms: { pixelRatio: { value: 1 } },
        vertexColors: true,
        depthWrite: false,
        depthTest: false,
        toneMapped: false,
        vertexShader: `
            attribute float starSize;
            uniform float pixelRatio;
            varying vec3 starColor;
            void main() {
                starColor = color;
                // Stars respond to direction, never camera translation or zoom.
                gl_Position = projectionMatrix * vec4(mat3(viewMatrix) * position, 1.0);
                gl_Position.z = gl_Position.w * 0.99999;
                gl_PointSize = starSize * pixelRatio;
            }`,
        fragmentShader: `
            varying vec3 starColor;
            void main() {
                float edge = 1.0 - smoothstep(0.1, 0.5, length(gl_PointCoord - 0.5));
                gl_FragColor = vec4(starColor * edge, 1.0);
                #include <colorspace_fragment>
            }`,
    });
    const stars = new THREE.Points(geometry, material);
    stars.name = "Starfield";
    stars.frustumCulled = false;
    stars.renderOrder = -1000;
    stars.onBeforeRender = (renderer) => { material.uniforms.pixelRatio.value = renderer.getPixelRatio(); };
    scene.add(stars);
    return stars;
}
