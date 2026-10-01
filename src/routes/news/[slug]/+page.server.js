import { env } from '$env/dynamic/private'
import { fetchDirectus } from '$lib/server/directus.js'

export async function load({ params, fetch }) {
	const newsItem = await fetchDirectus(
		fetch,
		env.DIRECTUS_NEWS
			? `${env.DIRECTUS_NEWS}/?fields=type,title,date,image&filter[id][_eq]=${params.slug}`
			: '',
		{ data: [] }
	)

	return { newsItem: newsItem.data ?? [] }
}
