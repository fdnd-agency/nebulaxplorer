import { DIRECTUS_NEWS } from '$env/static/private'
import { getPaginationItems } from '$lib/utils/paginate.js'

export async function load({ url }) {
	const currentPage = Number(url.searchParams.get('page')) || 1
	const limit = 9
	const offset = (currentPage - 1) * limit

	let newsItems = []
	let totalPages = 1
	let totalItems = 0

	try {
		newsItems = await fetch(
			`${DIRECTUS_NEWS}?limit=${limit}&offset=${offset}&sort=-date&meta=total_count`
		).then((response) => response.json())

		totalPages = Math.ceil(newsItems.meta.total_count / limit)
		totalItems = newsItems.meta.total_count
	} catch (error) {
		console.error(error)
	}

	const pagination = {
		currentPage,
		limit,
		totalItems,
		totalPages,
		items: getPaginationItems(currentPage, totalPages),
	}

	return {
		news: newsItems.data,
		pagination,
	}
}
