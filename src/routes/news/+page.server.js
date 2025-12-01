

import { DIRECTUS_NEWS } from "$env/static/private";


export async function load({ url }) {
  const currentPage = Number(url.searchParams.get("page")) || 1;
  const limit = 9;
  const offset = (currentPage - 1) * limit;

  const response = await fetch(
    `${DIRECTUS_NEWS}?limit=${limit}&offset=${offset}&meta=total_count`
  );

  const json = await response.json();

  const totalPages = Math.ceil(json.meta.total_count / limit);


  return {
    news: json.data,
   
  };
}