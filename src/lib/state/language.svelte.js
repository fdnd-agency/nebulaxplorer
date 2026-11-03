const interfaceCopy = {
	en: {
		exploreSatellite: 'Explore satellite',
		closeExplorer: 'Close explorer',
		expandExplorer: 'Show more',
		collapseExplorer: 'Show less',
		breadcrumb: 'Breadcrumb',
		pauseRotation: 'Pause rotation',
		resumeRotation: 'Resume rotation',
		outerPanels: 'Outer panels',
		resetView: 'Reset view',
		pauseRays: 'Pause X-rays',
		playRays: 'Play X-rays',
		hintPointer: 'Drag to rotate · Scroll to zoom',
		hintTouch: 'Drag · Pinch',
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
	},
	nl: {
		exploreSatellite: 'Verken satelliet',
		closeExplorer: 'Verkenner sluiten',
		expandExplorer: 'Meer tonen',
		collapseExplorer: 'Minder tonen',
		breadcrumb: 'Kruimelpad',
		pauseRotation: 'Draaien pauzeren',
		resumeRotation: 'Draaien hervatten',
		outerPanels: 'Buitenpanelen',
		resetView: 'Beeld herstellen',
		pauseRays: 'Röntgenstralen pauzeren',
		playRays: 'Röntgenstralen afspelen',
		hintPointer: 'Sleep om te draaien · Scroll om te zoomen',
		hintTouch: 'Slepen · Knijpen',
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

export function setLanguage(nextLanguage, { store = true } = {}) {
	language.current = nextLanguage === 'nl' ? 'nl' : 'en'
	document.documentElement.lang = language.current
	if (store) storeLanguage(language.current)
}

export function restoreLanguage() {
	setLanguage(readStoredLanguage() === 'nl' ? 'nl' : 'en', { store: false })
}
