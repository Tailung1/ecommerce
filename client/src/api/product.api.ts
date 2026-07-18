export async function getProducts() {
  const API_URL = import.meta.env.API_URL;
  const response = await fetch(`${API_URL}/products`);
  const data = response.json().catch(() => null);
  return data;
}
