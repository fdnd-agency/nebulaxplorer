export async function load() {
	const response = await fetch(
		'https://fdnd-agency.directus.app/items/nebula_xplorer_timeline'
	).then((response) => response.json())
	return { timelineSteps: response.data }
}
