
  const  res = await fetch(`https://fdnd-agency.directus.app/items/nebula_xplorer_news?limit=1&meta=total_count`);
  console.log('Response status:', res.status);
  const { data } = await res.json();
  console.log('News data:', data);
  return { news: data };
}
