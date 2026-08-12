import getCategories from "../categories.api";
import { useEffect, useState } from "react";

export default function useCategories() {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    async function fetchCategoryData() {
      const data = await getCategories();
      setCategoriesData(data);
    }
    fetchCategoryData();
  }, []);
  return categoriesData;
}
