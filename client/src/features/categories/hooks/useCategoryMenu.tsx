import { useState } from "react";
export default function useCategoryMenu() {
  const [openedCategoryId, setOpenedCategoryId] = useState<number | null>(null);
  function openCategory(id: number) {
    setOpenedCategoryId(id);
  }
  function closeCategory() {
    setOpenedCategoryId(null);
  }
  return { openedCategoryId, openCategory, closeCategory };
}
