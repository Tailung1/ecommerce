import { api } from "../../client.js";

export const getProduct = (id) => {
  return api.get(`/products/${id}`);
};
export const getProducts = (filters) => {
  const { category, sort, page, search, minPrice, maxPrice } = filters;

  return api.get("/products", {
    params: filters ?? {},
  });
};
