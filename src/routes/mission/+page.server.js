import { DIRECTUS_MISSION } from "$env/static/private";

export async function load({ fetch }) {
    const res = await fetch(`${DIRECTUS_MISSION}?sort=sort&filter[sort][_lte]=7`);
    const { data } = await res.json();
    
    return { mission: data };
}