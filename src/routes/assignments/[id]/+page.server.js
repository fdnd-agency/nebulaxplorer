const API = 'https://fdnd-agency.directus.app';

export async function load({ fetch, params }) {
    const res = await fetch(`${API}/items/nebula_xplorer_vacancies/${params.id}`);
    const { data } = await res.json();

    return { assignment: data };
}