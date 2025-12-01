/** @type {import('./$types').PageLoad} */
export async function load() {
    const data 
    = await fetch('https://api.example.com/news');    const news = await data.json();
    return {
        news
    };
}