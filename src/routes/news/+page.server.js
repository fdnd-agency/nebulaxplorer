import { DIRECTUS_NEWS } from "$env/static/private";

export async function load({ fetch }) {
  const  res = await fetch(`${DIRECTUS_NEWS}?limit=1&meta=total_count`);
  const { data } = await res.json();
  console.log('News data:', data);
  return { news: data };
}
