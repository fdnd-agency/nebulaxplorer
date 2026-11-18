const interfaceCopy = {
	en: {
		expandExplorer: 'Show more',
		collapseExplorer: 'Show less',
		breadcrumb: 'Breadcrumb',
		pauseRotation: 'Pause rotation',
		resumeRotation: 'Resume rotation',
		outerPanels: 'Outer panels',
		resetView: 'Reset view',
		pauseRays: 'Pause X-rays',
		playRays: 'Play X-rays',
		hintPointer: 'Drag to rotate · Ctrl + scroll to zoom',
		hintTouch: 'Drag sideways · Pinch',
		loading: 'Loading 3D model…',
		loadError: 'This 3D view could not be loaded.',
		schematic: 'Schematic · not to scale',
		cadPart: 'Supplied CAD part',
		showFullPath: 'Show full path',
		selected: 'selected',
		fallback:
			'The interactive 3D model is not available on this device. All satellite information is available below.',
		skipLink: 'Skip to the satellite explorer',
		mainWebsite: 'Main website ↗',
		explorerLabel: 'Satellite explorer',
		canvasLabel:
			'Interactive 3D model of the NEBULA Xplorer satellite. Use the satellite explorer for the same information.',
		posterText:
			'Data saver is on, so the 3D model is not loaded automatically. All information is available in the explorer.',
		loadModel: 'Load 3D model (about 5.5 MB)',
		itemsInside: ' items inside',
		missionCredit: 'A student-driven mission in collaboration with',
		onSpacecraft: 'On the spacecraft',
		inInstrument: 'In the instrument',
		closeUp: 'Close-up',
		chooseView: 'View',
		allComponents: 'All components',
		allParts: 'All instrument parts',
		locationAlt:
			'{name} outlined in blue on the NEBULA Xplorer satellite; the rest of the satellite is dimmed.',
		locationAltInstrument:
			'{name} outlined in blue inside the X-ray instrument; the other parts are see-through.',
		mapCaption:
			'How the parts fit together: the X-ray instrument with its outer panels hidden. The numbers match the list below.',
	},
	nl: {
		expandExplorer: 'Meer tonen',
		collapseExplorer: 'Minder tonen',
		breadcrumb: 'Kruimelpad',
		pauseRotation: 'Draaien pauzeren',
		resumeRotation: 'Draaien hervatten',
		outerPanels: 'Buitenpanelen',
		resetView: 'Beeld herstellen',
		pauseRays: 'Röntgenstralen pauzeren',
		playRays: 'Röntgenstralen afspelen',
		hintPointer: 'Sleep om te draaien · Ctrl + scroll om te zoomen',
		hintTouch: 'Opzij slepen · Knijpen',
		loading: '3D-model laden…',
		loadError: 'Deze 3D-weergave kon niet worden geladen.',
		schematic: 'Schematisch · niet op schaal',
		cadPart: 'Aangeleverd CAD-onderdeel',
		showFullPath: 'Volledig pad tonen',
		selected: 'geselecteerd',
		fallback:
			'Het interactieve 3D-model is niet beschikbaar op dit apparaat. Alle informatie over de satelliet staat hieronder.',
		skipLink: 'Naar de satellietverkenner',
		mainWebsite: 'Hoofdwebsite ↗',
		explorerLabel: 'Satellietverkenner',
		canvasLabel:
			'Interactief 3D-model van de NEBULA Xplorer-satelliet. Gebruik de satellietverkenner voor dezelfde informatie.',
		posterText:
			'Databesparing staat aan, dus het 3D-model wordt niet automatisch geladen. Alle informatie staat in de verkenner.',
		loadModel: '3D-model laden (ca. 5,5 MB)',
		itemsInside: ' onderdelen binnenin',
		missionCredit: 'Een studentenmissie in samenwerking met',
		onSpacecraft: 'Op de satelliet',
		inInstrument: 'In het instrument',
		closeUp: 'Close-up',
		chooseView: 'Weergave',
		allComponents: 'Alle onderdelen',
		allParts: 'Alle instrumentonderdelen',
		locationAlt:
			'{name} blauw omlijnd op de NEBULA Xplorer-satelliet; de rest van de satelliet is gedimd.',
		locationAltInstrument:
			'{name} blauw omlijnd in het röntgeninstrument; de andere onderdelen zijn doorzichtig.',
		mapCaption:
			'Hoe de onderdelen in elkaar passen: het röntgeninstrument zonder buitenpanelen. De nummers horen bij de lijst hieronder.',
	},
}

const storageKey = 'nebula-xplorer-language'

export const language = $state({ current: 'en' })

function readStoredLanguage() {
	try {
		return localStorage.getItem(storageKey)
	} catch {
		return null
	}
}

function storeLanguage(value) {
	try {
		localStorage.setItem(storageKey, value)
	} catch {}
}

export function text(key) {
	return interfaceCopy[language.current][key] ?? interfaceCopy.en[key]
}

export function pick(copy) {
	return copy?.[language.current] ?? copy?.en ?? ''
}

// Copy that tells visitors to rotate or select something has a `withoutScript`
// version for the page without the 3D model
export function pickFor(enhanced, copy) {
	return pick(enhanced ? copy : (copy?.withoutScript ?? copy))
}

export function setLanguage(nextLanguage, { store = true } = {}) {
	language.current = nextLanguage === 'nl' ? 'nl' : 'en'
	if (store) storeLanguage(language.current)
}

export function restoreLanguage() {
	setLanguage(readStoredLanguage() === 'nl' ? 'nl' : 'en', { store: false })
}
