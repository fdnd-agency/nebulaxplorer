import {
	Scene,
	Color,
	Texture,
	TextureLoader,
	SRGBColorSpace,
	MirroredRepeatWrapping,
	ShaderMaterial,
	BackSide,
	Mesh,
	SphereGeometry,
} from 'three'

const skyUrl = '/media/nebula-orbital-background-v2.webp'

export function createScene(
	requestRender = () => {},
	{ loadBackground = true } = {},
) {
	const scene = new Scene()
	scene.background = new Color(0x05080e)
	const texture = loadBackground
		? new TextureLoader().load(skyUrl, requestRender)
		: new Texture()
	texture.colorSpace = SRGBColorSpace
	texture.wrapS = texture.wrapT = MirroredRepeatWrapping
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
	const material = new ShaderMaterial({
		uniforms: { skyMap: { value: texture }, skyTime: { value: 0 } },
		side: BackSide,
		depthWrite: false,
		depthTest: false,
		toneMapped: false,
		vertexShader: `
      varying vec3 skyDirection;
      void main() {
        skyDirection = position;
        gl_Position = projectionMatrix * vec4(mat3(viewMatrix) * position, 1.0);
        gl_Position.z = gl_Position.w * 0.99999;
      }
    `,
		fragmentShader: `
      uniform sampler2D skyMap;
      uniform float skyTime;
      varying vec3 skyDirection;
      void main() {
        vec3 d = normalize(skyDirection);
        float longitude = atan(d.x, -d.z);
        float latitude = asin(clamp(d.y, -1.0, 1.0));
        vec2 uv = vec2(0.5 + longitude / 1.1, 0.5 + latitude / 0.65);
        uv += vec2(sin(skyTime * 0.007), cos(skyTime * 0.005)) * 0.003;
        vec4 texel = texture2D(skyMap, uv);
        float fade = 1.0 - smoothstep(2.7, 3.1415927, abs(longitude));
        gl_FragColor = vec4(texel.rgb * 0.22 * fade, 1.0);
        #include <colorspace_fragment>
      }
    `,
	})
	const sky = new Mesh(new SphereGeometry(500, 32, 16), material)
	sky.renderOrder = -1100
	sky.name = 'NebulaSky'
	sky.frustumCulled = false
	sky.visible = loadBackground
	sky.onBeforeRender = () => {
		material.uniforms.skyTime.value = reducedMotion.matches
			? 0
			: performance.now() / 1000
	}
	scene.add(sky)
	scene.userData.loadBackground = () => {
		if (sky.visible) return
		material.uniforms.skyMap.value = new TextureLoader().load(
			skyUrl,
			(loaded) => {
				loaded.colorSpace = SRGBColorSpace
				loaded.wrapS = loaded.wrapT = MirroredRepeatWrapping
				sky.visible = true
				requestRender()
			},
		)
	}
	return scene
}
