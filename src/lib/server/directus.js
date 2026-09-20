export async function fetchDirectus(fetch, url, fallback) {
	if (!url) {
		console.error('A Directus environment variable is not configured')
		return fallback
	}

	try {
		const response = await fetch(url)

		if (!response.ok) {
			throw new Error(`Directus returned ${response.status} for ${url}`)
		}

		return await response.json()
	} catch (error) {
		console.error(error)
		return fallback
	}
}