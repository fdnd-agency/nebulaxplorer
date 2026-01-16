  export const prerender = true;

  export async function load({ fetch }) {
    const res = await fetch(
      "https://fdnd-agency.directus.app/items/nebula_xplorer_testimonials"
    );
  
    const json = await res.json();
  
    return {
      testimonials: json.data,
    };
  }