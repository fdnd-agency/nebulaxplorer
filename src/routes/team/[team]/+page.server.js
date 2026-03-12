import { DIRECTUS_TESTIMONIALS } from '$env/static/private'

export async function load({ url, params }) {
	const response = await fetch(`${DIRECTUS_TESTIMONIALS}`).then((response) =>
		response.json()
	)
	return { members: response.data ?? [] }
}
