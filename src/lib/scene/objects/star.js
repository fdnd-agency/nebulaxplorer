import {
	BufferAttribute,
	BufferGeometry,
	Group,
	Points,
	ShaderMaterial,
} from 'three'
const reducedMotion = globalThis.matchMedia?.(
	'(prefers-reduced-motion: reduce)',
)

function createLayer({
	amount,
	seed: initialSeed,
	sizeScale,
	brightnessScale,
	opacity,
	renderOrder,
	minDistance,
	maxDistance,
}) {
	const positions = new Float32Array(amount * 3)
	const colors = new Float32Array(amount * 3)
	const sizes = new Float32Array(amount)
	const phases = new Float32Array(amount)
	let seed = initialSeed
	const random = () => {
		seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
		return seed / 4294967296
	}
	for (let i = 0; i < amount; i += 1) {
		const y = random() * 2 - 1
		const angle = random() * Math.PI * 2
		const horizontal = Math.sqrt(1 - y * y)
		const distance = minDistance + random() * (maxDistance - minDistance)
		positions.set(
			[
				horizontal * Math.cos(angle) * distance,
				y * distance,
				horizontal * Math.sin(angle) * distance,
			],
			i * 3,
		)
		const base = (0.18 + Math.pow(random(), 2.8) * 0.72) * brightnessScale
		const cool = 0.88 + random() * 0.12
		colors.set([base * cool, base * 0.95, base], i * 3)
		sizes[i] = (1.1 + random() * 0.8) * sizeScale
		phases[i] = random() * Math.PI * 2
	}
	const geometry = new BufferGeometry()
	geometry.setAttribute('position', new BufferAttribute(positions, 3))
	geometry.setAttribute('color', new BufferAttribute(colors, 3))
	geometry.setAttribute('starSize', new BufferAttribute(sizes, 1))
	geometry.setAttribute('twinklePhase', new BufferAttribute(phases, 1))
	const material = new ShaderMaterial({
		uniforms: {
			pixelRatio: { value: 1 },
			time: { value: 0 },
			layerOpacity: { value: opacity },
		},
		vertexColors: true,
		depthWrite: false,
		depthTest: true,
		transparent: true,
		toneMapped: false,
		vertexShader: `
      attribute float starSize;
      attribute float twinklePhase;
      uniform float pixelRatio;
      uniform float time;
      varying vec3 starColor;
      varying float starAlpha;

      void main() {
        starColor = color;
        float twinkle = 0.96 + sin(time * 0.18 + twinklePhase) * 0.04;
        starAlpha = twinkle;
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewPosition;
        gl_Position.z = gl_Position.w * 0.9999;
        gl_PointSize = starSize * pixelRatio * clamp(180.0 / max(1.0, -viewPosition.z), 0.65, 2.2);
      }
    `,
		fragmentShader: `
      uniform float layerOpacity;
      varying vec3 starColor;
      varying float starAlpha;

      void main() {
        float edge = 1.0 - smoothstep(0.08, 0.5, length(gl_PointCoord - 0.5));
        gl_FragColor = vec4(starColor * edge, edge * starAlpha * layerOpacity);
        #include <colorspace_fragment>
      }
    `,
	})
	const points = new Points(geometry, material)
	points.frustumCulled = false
	points.renderOrder = renderOrder
	points.onBeforeRender = (renderer) => {
		material.uniforms.pixelRatio.value = renderer.getPixelRatio()
		material.uniforms.time.value = reducedMotion?.matches
			? 0
			: performance.now() / 1000
	}
	return points
}
export function createStars(amount, scene) {
	const field = new Group()
	field.name = 'Starfield'
	const distant = createLayer({
		amount: Math.round(amount * 0.55),
		seed: 2026,
		sizeScale: 0.7,
		brightnessScale: 0.65,
		opacity: 0.72,
		renderOrder: -1002,
		minDistance: 360,
		maxDistance: 450,
	})
	const middle = createLayer({
		amount: Math.round(amount * 0.3),
		seed: 6022,
		sizeScale: 1,
		brightnessScale: 0.92,
		opacity: 0.72,
		renderOrder: -1001,
		minDistance: 220,
		maxDistance: 310,
	})
	const near = createLayer({
		amount: Math.max(10, Math.round(amount * 0.15)),
		seed: 2602,
		sizeScale: 1.35,
		brightnessScale: 1.08,
		opacity: 0.42,
		renderOrder: -1000,
		minDistance: 120,
		maxDistance: 170,
	})
	field.add(distant, middle, near)
	scene.add(field)
	return field
}
