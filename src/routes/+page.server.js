import { DIRECTUS_NEWS } from '$env/static/private'

export async function load({ url }) {
	const limit = 3
	const newsItemsResponse = await fetch(
		`${DIRECTUS_NEWS}?sort=-date&limit=${limit}&fields=id,type,title,image`
	).then((response) => response.json())

	return { newsItems: newsItemsResponse.data ?? [] }
}
