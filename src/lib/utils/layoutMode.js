import { getExplorerPage } from './explorerPage.js'

// The layout mode is a design token of the explorer (satellite-explorer.css)
export function readLayoutMode() {
	const page = getExplorerPage() ?? document.documentElement
	return (
		getComputedStyle(page).getPropertyValue('--explorer-mode').trim() ||
		'panel'
	)
}
