export async function load() {

    const res = await fetch("https://fdnd-agency.directus.app/items/nebula_xplorer_vacancies");
    const data = await res.json();

    return { 
        components: data.data 
    };
}