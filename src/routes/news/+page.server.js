import { env } from '$env/dynamic/private'
import { getPaginationItems } from '$lib/utils/paginate.js'
import { fetchDirectus } from '$lib/server/directus.js'

export async function load({ url }) {
	const currentPage = Number(url.searchParams.get('page')) || 1
	const limit = 9
	const offset = (currentPage - 1) * limit

	let newsItems = []
	let totalPages = 1
	let totalItems = 0

	newsItems = await fetchDirectus(
		fetch,
		env.DIRECTUS_NEWS
			? `${env.DIRECTUS_NEWS}?limit=${limit}&offset=${offset}&sort=-date&meta=total_count`
			: '',
		{ data: [], meta: { total_count: 0 } }
	)

	totalPages = Math.ceil(newsItems.meta.total_count / limit)
	totalItems = newsItems.meta.total_count

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
