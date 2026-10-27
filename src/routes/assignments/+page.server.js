const API = 'https://fdnd-agency.directus.app';

export async function load({ fetch }) {
  const res = await fetch(`${API}/items/nebula_xplorer_vacancies`);
  const { data } = await res.json();

  return { vacancies: data };
}