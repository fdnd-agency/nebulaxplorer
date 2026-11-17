// The layout mode is a design token of the explorer (satellite-explorer.css)
export function readLayoutMode() {
	const page =
		document.querySelector('.satellite-page') ?? document.documentElement
	return (
		getComputedStyle(page).getPropertyValue('--explorer-mode').trim() ||
		'panel'
	)
}
