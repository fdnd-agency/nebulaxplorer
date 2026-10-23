import { MathUtils, Spherical, Vector3 } from 'three'

const offset = new Vector3()
const spherical = new Spherical()

export function createCameraOrbit(camera, controls) {
	let settings = null
	let phase = 0
	let ramp = 0
	let appliedAzimuth = 0
	let appliedElevation = 0

	function restart() {
		phase = 0
		ramp = 0
		appliedAzimuth = 0
		appliedElevation = 0
	}

	return {
		setSettings(nextSettings) {
			settings = nextSettings
			restart()
		},
		restart,
		hasOrbit: () => Boolean(settings),
		update(delta, enabled) {
			if (!settings || !enabled) {
				restart()
				return false
			}
			ramp = Math.min(1, ramp + delta / settings.easeIn)
			phase += delta * ((Math.PI * 2) / settings.period) * ramp * ramp
			const azimuth =
				MathUtils.degToRad(settings.azimuth) * Math.sin(phase)
			const elevation =
				MathUtils.degToRad(settings.elevation) * Math.sin(phase * 0.5)
			offset.copy(camera.position).sub(controls.target)
			spherical.setFromVector3(offset)
			spherical.theta += azimuth - appliedAzimuth
			spherical.phi = MathUtils.clamp(
				spherical.phi - (elevation - appliedElevation),
				0.08,
				Math.PI - 0.08,
			)
			appliedAzimuth = azimuth
			appliedElevation = elevation
			offset.setFromSpherical(spherical)
			camera.position.copy(controls.target).add(offset)
			camera.lookAt(controls.target)
			return true
		},
	}
}
