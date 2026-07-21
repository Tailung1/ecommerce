import { apiClient } from "./client.api";

export async function getProducts() {
  return apiClient("/products", { method: "GET" });
}
