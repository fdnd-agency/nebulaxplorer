import { DIRECTUS_NEWS } from "$env/static/private";

export async function load({ fetch }) {
  const response = await fetch(`${DIRECTUS_NEWS}?limit=1&meta=total_count`);
  const { data } = await response.json();
  return { news: data };
}
