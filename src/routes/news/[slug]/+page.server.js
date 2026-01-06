import { DIRECTUS_NEWS } from "$env/static/private";
import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
  const { slug } = params;

  try {
    const idUrl = `${DIRECTUS_NEWS}/${slug}?fields=*.*`;
    const idResponse = await fetch(idUrl);

    if (idResponse.ok) {
      const idData = await idResponse.json();
      const newsItem = idData.data || idData;

      if (
        newsItem &&
        typeof newsItem === "object" &&
        !Array.isArray(newsItem)
      ) {
        return { newsItem };
      }
    }

    const slugUrl = `${DIRECTUS_NEWS}?filter[slug][_eq]=${slug}&fields=*.*`;
    const slugResponse = await fetch(slugUrl);

    if (slugResponse.ok) {
      const slugData = await slugResponse.json();
      const data = slugData.data || slugData;

      if (data && Array.isArray(data) && data.length > 0) {
        return { newsItem: data[0] };
      }
    }

    throw error(404, `News item not found: ${slug}`);
  } catch (err) {
    if (err.status) {
      throw err;
    }

    throw error(
      500,
      `Failed to load news item: ${err.message || "Unknown error"}`
    );
  }
}