// import { DIRECTUS_NEWS } from "$env/static/private";

export async function load({ fetch }) {
  try {
    const response = await fetch(`${DIRECTUS_NEWS}`);

    if (!response.ok) {
      console.error(
        `Failed to fetch news: ${response.status} ${response.statusText}`
      );
      return { news: [] };
    }

    const json = await response.json();
    const data = json.data || json || [];

    return { news: Array.isArray(data) ? data : [] };
  } catch (error) {
    console.error("Error loading news:", error);
    return { news: [] };
  }
}

// export async function load({ fetch }) {
//   const response = await fetch(`${DIRECTUS_NEWS}`);
//   const { data } = await response.json();
//   return { news: data };
// }
