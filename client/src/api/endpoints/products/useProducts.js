import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./products.api";

export const useProducts = (filters) => {
  const { category, sort, page, search, minPrice, maxPrice } = filters;
  return useQuery({
    queryKey: ["products", category, sort, page, search, minPrice, maxPrice],
    queryFn: () => getProducts(filters),
    keepPreviousData: true,
  });
};
