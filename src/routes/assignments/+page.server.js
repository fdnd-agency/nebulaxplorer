import { env } from '$env/dynamic/private'
import { getPaginationItems } from '$lib/utils/paginate.js'
import { fetchDirectus } from '$lib/server/directus.js'

export async function load({ url }) {
	const currentPage = Number(url.searchParams.get('page')) || 1
	const limit = 9
	const offset = (currentPage - 1) * limit

	const json = await fetchDirectus(
		fetch,
		env.DIRECTUS_VACANCIES
			? `${env.DIRECTUS_VACANCIES}?limit=${limit}&offset=${offset}&meta=total_count`
			: '',
		{ data: [], meta: { total_count: 0 } }
	)

	const totalPages = Math.ceil(json.meta.total_count / limit)

	const pagination = {
		currentPage,
		limit,
		totalItems: json.meta.total_count,
		totalPages,
		items: getPaginationItems(currentPage, totalPages),
	}

	return {
		vacancies: json.data,
		pagination,
	}
}
