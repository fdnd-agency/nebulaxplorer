import { env } from '$env/dynamic/private'
import { fetchDirectus } from '$lib/server/directus.js'

export async function load({ params, fetch }) {
	const vacanciesResponse = await fetchDirectus(
		fetch,
		env.DIRECTUS_VACANCIES ? `${env.DIRECTUS_VACANCIES}/${params.slug}` : '',
		{ data: null }
	)

	return { assignment: vacanciesResponse.data }
}
