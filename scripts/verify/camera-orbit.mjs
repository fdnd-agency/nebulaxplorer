import assert from 'node:assert/strict'
import { MathUtils, PerspectiveCamera, Vector3 } from 'three'
import { createCameraOrbit } from '../../src/lib/scene/cameraOrbit.js'
import { getOrbitSettings } from '../../src/lib/scene/explorerScene.js'

const camera = new PerspectiveCamera(20, 1, 0.1, 100)
const controls = { target: new Vector3(1, 2, 3) }
camera.position.set(1, 2.4, 5)
const startOffset = camera.position.clone().sub(controls.target)
const startDistance = startOffset.length()
const orbit = createCameraOrbit(camera, controls)

orbit.setSettings(null)
assert.equal(orbit.update(0.016, true), false)
assert.equal(camera.position.distanceTo(controls.target), startDistance)

const settings = getOrbitSettings({
	scene: 'satellite-component',
	component: 'starTrackerModule',
})
orbit.setSettings(settings)
const before = camera.position.clone()
assert.equal(orbit.update(0.016, false), false)
assert(camera.position.equals(before), 'disabled orbit must not move')

orbit.update(0.016, true)
assert(
	camera.position.distanceTo(before) < 1e-4,
	'orbit must ease in instead of jumping',
)

let maximumAngle = 0
for (let frame = 0; frame < 60 * 90; frame += 1) {
	orbit.update(1 / 60, true)
	const offset = camera.position.clone().sub(controls.target)
	assert(Math.abs(offset.length() - startDistance) < 1e-6, 'distance drift')
	maximumAngle = Math.max(maximumAngle, startOffset.angleTo(offset))
}
const allowed = MathUtils.degToRad(
	Math.hypot(settings.azimuth, settings.elevation),
)
assert(maximumAngle > MathUtils.degToRad(settings.azimuth * 0.8), 'orbit ran')
assert(maximumAngle <= allowed + 1e-3, 'orbit exceeded its range')

for (const item of [
	{ scene: 'optics' },
	{ scene: 'optical-path' },
	{ scene: 'optical-component', component: 'primary' },
	{ scene: 'cad-parts' },
	{ scene: 'satellite' },
])
	assert.equal(getOrbitSettings(item), null, item.scene)
assert(
	getOrbitSettings({
		scene: 'satellite-component',
		component: 'xrayInstrument',
	}).azimuth <
		getOrbitSettings({
			scene: 'satellite-component',
			component: 'magnetorquers',
		}).azimuth,
	'cutaway view uses a narrower orbit',
)

console.log(
	JSON.stringify({
		maximumAngleDegrees: Number(
			MathUtils.radToDeg(maximumAngle).toFixed(2),
		),
		allowedDegrees: Number(MathUtils.radToDeg(allowed).toFixed(2)),
		checks: 'fixed focus, constant distance, eased start, bounded range, disabled state, no orbit for schematic views',
	}),
)
