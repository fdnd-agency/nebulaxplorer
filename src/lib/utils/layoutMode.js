import { getExplorerPage } from './explorerPage.js'

// The layout mode is a design token of the explorer, set with container
// queries on .explorer-layout (SatelliteExplorer.svelte)
export function readLayoutMode() {
	const layout = getExplorerPage()?.querySelector('.explorer-layout')
	if (!layout) return 'panel'
	return (
		getComputedStyle(layout).getPropertyValue('--explorer-mode').trim() ||
		'panel'
	)
}
