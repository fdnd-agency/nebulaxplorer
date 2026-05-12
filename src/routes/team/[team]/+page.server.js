// import { DIRECTUS_TESTIMONIALS } from '$env/static/private'

export async function load() {
	const response = await fetch(
		`https://fdnd-agency.directus.app/items/nebula_xplorer_testimonials`
	).then((response) => response.json())
	return { members: response.data ?? [] }
}
