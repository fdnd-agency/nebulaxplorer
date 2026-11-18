// What every still shows and from which side. Directions are in the viewer's
// model space: Y runs along the solar panels, Z along the X-ray instrument
// (+Z is the side with the concentrator apertures), +X the propulsion side.
const size = [2400, 1800]
// Close-ups are rendered on a quiet studio backdrop
const satellite = (name, component, direction, extra = {}) => ({
	name,
	type: 'satellite-component',
	component,
	direction,
	size,
	studio: true,
	...extra,
})
const instrumentPart = (name, component, direction = [0.9, -0.25, 1]) => ({
	name,
	type: 'instrument-component',
	component,
	direction,
	size,
	studio: true,
})
const cadPart = (name, part, direction = [1, 0.6, 1]) => ({
	name,
	type: 'cad-part',
	part,
	direction,
	size,
	studio: true,
})

export const stills = [
	// Main components; parts with several copies show one, or the copies that
	// sit together
	satellite('x-ray-instrument', 'xrayInstrument', [0.8, 0.5, 1]),
	satellite('star-tracker', 'starTrackerModule', [0.6, 0.45, 1]),
	satellite('dawn-4u-cubedrive', 'dawn4UCubeDrive', [0.7, 0.55, 1]),
	satellite('s-band-antenna', 'sBandAntenna', [0.5, 0.45, -1], {
		instance: ['S-BandQuadPatchAntenna', 'S-Band_PatchAntenna_ISISpace2'],
	}),
	satellite('sun-sensor', 'sunSensor', [0.5, 1, 0.6], {
		instance: 'SunSensor_Bison64-ET-B4',
	}),
	satellite('magnetorquers', 'magnetorquers', [0.8, 0.5, -1]),
	satellite('solar-panel', 'solarPanel', [1, 0.25, 0.45], {
		instance: 'SARA_RevolvSpace_Assembly_Deployed1',
	}),
	// The instrument without its outer panels, and its parts
	{
		name: 'instrument-components',
		type: 'instrument',
		direction: [0.9, -0.25, 1],
		size,
		studio: true,
	},
	instrumentPart('instrument-detectors', 'detectors'),
	instrumentPart('instrument-baffles', 'baffles'),
	instrumentPart('instrument-electronics', 'electronics'),
	instrumentPart('instrument-calibration', 'calibration'),
	instrumentPart('instrument-structure', 'structure'),
	instrumentPart('instrument-mounts', 'mounts'),
	instrumentPart('instrument-support', 'support', [0.35, -0.15, 1]),
	// The supplied CAD parts of the X-ray optics
	cadPart('cad-primary', 'primary'),
	cadPart('cad-secondary', 'secondary'),
	cadPart('cad-fpm', 'fpm'),
	cadPart('cad-fpcm', 'fpcm'),
	// The illustrative schematic of the X-ray path, straight from the side,
	// on the navy of the page
	{
		name: 'optical-path',
		type: 'optics',
		direction: [0, 0, 1],
		size,
		margin: 0.9,
	},
]

// "On the spacecraft": the whole satellite with one component outlined in
// blue and the rest dimmed, seen from a side where that component is
// visible. Internal hardware uses the viewer's cutaway (hull panels hidden).
// Instrument parts are shown inside the opened instrument.
const locationSize = [1600, 1200]
const onSatellite = (id, component, direction, extra = {}) => ({
	id,
	type: 'satellite',
	component,
	direction,
	size: locationSize,
	...extra,
})
const inInstrument = (id, component, direction = [0.9, -0.25, 1]) => ({
	id,
	type: 'instrument',
	component,
	direction,
	size: locationSize,
	margin: 0.8,
})

export const locations = [
	onSatellite('x-ray-instrument', 'xrayInstrument', [0.8, 0.5, 1], {
		cutaway: true,
	}),
	onSatellite('star-tracker', 'starTrackerModule', [0.55, 0.35, 1]),
	onSatellite('dawn-4u-cubedrive', 'dawn4UCubeDrive', [1, 0.45, 0.55]),
	onSatellite('s-band-antenna', 'sBandAntenna', [0.6, 0.5, -1]),
	onSatellite('sun-sensor', 'sunSensor', [0.55, 0.85, 1]),
	// The magnetorquers sit just inside the back panel, near the -X side
	onSatellite('magnetorquers', 'magnetorquers', [-0.75, 0.45, -1], {
		cutaway: true,
	}),
	onSatellite('solar-panel', 'solarPanel', [0.8, 0.35, 1]),
	inInstrument('instrument-detectors', 'detectors'),
	inInstrument('instrument-baffles', 'baffles'),
	inInstrument('instrument-electronics', 'electronics'),
	inInstrument('instrument-calibration', 'calibration'),
	inInstrument('instrument-structure', 'structure'),
	inInstrument('instrument-mounts', 'mounts'),
	inInstrument('instrument-support', 'support', [0.35, -0.15, 1]),
]

// How the instrument's parts fit together: the opened instrument with where
// each part sits
export const instrumentMap = {
	name: 'instrument-map',
	direction: [0.9, -0.25, 1],
	size: [2400, 1500],
	margin: 0.8,
	parts: {
		'instrument-detectors': 'detectors',
		'instrument-baffles': 'baffles',
		'instrument-electronics': 'electronics',
		'instrument-calibration': 'calibration',
		'instrument-structure': 'structure',
		'instrument-mounts': 'mounts',
		'instrument-support': 'support',
	},
}

// The hero sways slowly around the viewer's starting view (direction
// [0.8, 0.5, 1]) and loops, on the SRON navy of the page. Phones get an
// upright composition with both panel tips in frame.
export const hero = {
	color: 0x181932,
	angle: 38.7,
	sway: 10,
	elevation: 0.39,
	margin: 0.86,
	size: [1080, 1080],
	posterSize: [2160, 2160],
	seconds: 14,
	fps: 24,
}

export const heroTall = {
	...hero,
	margin: 0.88,
	size: [900, 1200],
	posterSize: [1350, 1800],
}
