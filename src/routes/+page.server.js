import { DIRECTUS_NEWS } from '$env/static/private'

export async function load({ url }) {
	const newsItemsResponse = await fetch(
		`${DIRECTUS_NEWS}?sort=-date&limit=3&fields=id,type,title,image`
	).then((response) => response.json())

	return { newsItems: newsItemsResponse.data ?? [] }
}
