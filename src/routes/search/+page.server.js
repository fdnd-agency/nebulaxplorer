export const csr = false;

export function load({ url }) {
  const search = url.searchParams.get("search");
  console.log(search);
}