export function readLayoutMode() {
	return (
		getComputedStyle(document.documentElement)
			.getPropertyValue('--explorer-mode')
			.trim() || 'panel'
	)
}
