import { env } from '$env/dynamic/private'
import { fetchDirectus } from '$lib/server/directus.js'

export async function load({ fetch }) {
	const newsItemsResponse = await fetchDirectus(
		fetch,
		env.DIRECTUS_NEWS
			? `${env.DIRECTUS_NEWS}?sort=-date&limit=3&fields=id,type,title,image`
			: '',
		{ data: [] }
	)

	return { newsItems: newsItemsResponse.data ?? [] }
}
