export function updateSelectionStatus({ dom, state }, component) {
	if (!component) {
		dom.selectionStatus.textContent = 'Exploration mode active.'
		return
	}

	const link = dom.componentLinks.find(
		(item) => item.dataset['3dObject'] === component,
	)
	const label = link?.querySelector('.component-label')?.textContent ?? ''
	dom.selectionStatus.textContent = `${label} selected.`
}

export function updateInstrumentStatus({ dom, state }) {
	const link = dom.instrumentLinks.find(
		(item) =>
			item.dataset.instrumentComponent ===
			state.selectedInstrumentComponent,
	)
	const label = link?.querySelector('.component-label').textContent
	document.querySelector('.instrument-status').textContent = label
		? `${label} selected.`
		: ''
}

export function updateRotationLabel({ dom, state }) {
	dom.rotationButton.textContent = state.rotationPaused
		? 'Resume rotation'
		: 'Pause rotation'
}
