import { apiClient } from "./client.api";

export default async function getCategories() {
  return apiClient("/categories", { method: "GET" });
}
