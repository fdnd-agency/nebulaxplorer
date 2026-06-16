import { DIRECTUS_NEWS } from '$env/static/private'

export async function load({ params, fetch }) {
	if (!DIRECTUS_NEWS) {
		throw new Error('DIRECTUS_NEWS environment variable is not defined')
	}

	const response = await fetch(
		`${DIRECTUS_NEWS}/?fields=type,title,date,image&filter[id][_eq]=${params.slug}`
	)
	const newsItem = await response.json()

	return { newsItem: newsItem.data ?? [] }
}
