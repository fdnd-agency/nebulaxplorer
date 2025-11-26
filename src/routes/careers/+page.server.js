import { DIRECTUS_VACANCIES } from "$env/static/private";
import {getPaginationItems} from "$lib/utils/paginate.js";

export async function load({ url }) {
  const currentPage = Number(url.searchParams.get("page")) || 1;
  const limit = 1;
  const offset = (currentPage - 1) * limit;

  const response = await fetch(
    `${DIRECTUS_VACANCIES}?limit=${limit}&offset=${offset}&meta=total_count`
  );

  const json = await response.json();

  const fakeCount = 25;

  const totalPages = Math.ceil(fakeCount ? fakeCount : json.meta.total_count / limit);

  const pagination = {
    currentPage,
    limit,
    totalItems: json.meta.total_count,
    totalPages,
    items: getPaginationItems(currentPage, totalPages),
  };

  return {
    vacancies: json.data,
    pagination,
  };
}
