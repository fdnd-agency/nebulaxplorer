// src/routes/+page.server.js
export async function load({ fetch }) {
  const res = await fetch(
    "https://fdnd-agency.directus.app/items/nebula_xplorer_vacancies",
  );

  const json = await res.json();

  return {
    assignments: json.data,
  };
}
