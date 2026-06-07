export async function load() {
	// Source: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	try {
		const response = await fetch(
			'https://fdnd-agency.direcus.app/items/nebula_xplorer_timeline'
		)

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		}

		const responseJson = await response.json()

		return { timelineSteps: responseJson.data }
	} catch (error) {
		console.error(error.message)
		return { timelineSteps: [] }
	}
}
