// import { DIRECTUS_NEWS } from "$env/static/private";

// export async function load({ fetch }) {
//   const response = await fetch(`${DIRECTUS_NEWS}`);
//   const { data } = await response.json();
//   return { news: data };
// }

import { DIRECTUS_NEWS } from '$env/static/private'
import { getPaginationItems } from '$lib/utils/paginate.js'

export async function load({ url }) {
    const currentPage = Number(url.searchParams.get('page')) || 1
    const limit = 9
    const offset = (currentPage - 1) * limit

    const newsItems = await fetch(
        `${DIRECTUS_NEWS}?limit=${limit}&offset=${offset}&meta=total_count`
    ).then((response) => response.json())

    const totalPages = Math.ceil(newsItems.meta.total_count / limit)

    const pagination = {
        currentPage,
        limit,
        totalItems: newsItems.meta.total_count,
        totalPages,
        items: getPaginationItems(currentPage, totalPages),
    }

    return {
        news: newsItems.data,
        pagination,
    }
}
