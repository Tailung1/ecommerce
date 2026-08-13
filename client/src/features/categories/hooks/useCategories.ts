import getCategories from "../categories.api";
import { useEffect, useState } from "react";
import type { Categories } from "../categories.types";
import { defaultCategoriesData } from "../categories.api";

export default function useCategories() {
  const [categoriesData, setCategoriesData] = useState<Categories>(defaultCategoriesData);

  useEffect(() => {
    async function fetchCategoryData() {
      const data = await getCategories();
      setCategoriesData(data);
    }
    fetchCategoryData();
  }, []);
  return categoriesData;
}
