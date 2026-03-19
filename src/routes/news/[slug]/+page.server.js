import { DIRECTUS_NEWS } from '$env/static/private'

export async function load({ url, params }) {
	let newsItem = await fetch(
		`${DIRECTUS_NEWS}/?fields=type,title,date,image&filter[id][_eq]=${params.slug}`
	).then((response) => response.json())

	console.log(newsItem)

	return { newsItem: newsItem.data ?? [] }
}
