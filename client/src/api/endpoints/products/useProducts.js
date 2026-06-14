import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./products.api";

export const useProducts = (filters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    keepPreviousData: true,
  });
};
