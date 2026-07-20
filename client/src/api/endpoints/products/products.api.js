import { api } from "../../client.js"; // doesnot exists.... old code, no error bcs its js, not ts.. maybe.

export const getProduct = (id) => {
  return api.get(`/products/${id}`);
};
export const getProducts = (filters) => {
  const { category, sort, page, search, minPrice, maxPrice } = filters;

  return api.get("/products", {
    params: filters ?? {},
  });
};
