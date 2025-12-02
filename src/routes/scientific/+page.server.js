import { DIRECTUS_SCIENTIFIC } from "$env/static/private";

if (!DIRECTUS_SCIENTIFIC) {
  throw new Error("Missing DIRECTUS_SCIENTIFIC env variable. Set it in .env (no spaces around the name).");
}

export async function load({ url }) {
  const currentPage = Number(url.searchParams.get("page")) || 1;
  const limit = 9;
  const offset = (currentPage - 1) * limit;

  const response = await fetch(
    `${DIRECTUS_SCIENTIFIC}?limit=${limit}&offset=${offset}&meta=total_count`
  );
  if (!response.ok) {
    throw new Error(`Directus fetch failed: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  const totalPages = Math.ceil(json.meta.total_count / limit);

  return {
    scientific: json.data,
  };
}