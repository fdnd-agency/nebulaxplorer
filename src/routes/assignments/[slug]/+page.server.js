import { DIRECTUS_VACANCIES } from '$env/static/private'

export async function load({ params }) {
	const vacanciesResponse = await fetch(
		`${DIRECTUS_VACANCIES}/${params.slug}`
	).then((response) => response.json())

	return { assignment: vacanciesResponse.data }
}
