import { DIRECTUS_SCIENTIFIC } from "$env/static/private";

export async function load({ fetch }) {
  const res = await fetch(`${DIRECTUS_SCIENTIFIC}?limit=12&meta=total_count`);
  const {data} = await res.json();
  return { scientific: data };
}
