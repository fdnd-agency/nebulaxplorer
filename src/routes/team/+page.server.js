import { DIRECTUS_TEAMS } from '$env/static/private'

export async function load() {
    const response = await fetch(DIRECTUS_TEAMS)

    const json = await response.json()

    return {
        teams: json.data,
    }
}
