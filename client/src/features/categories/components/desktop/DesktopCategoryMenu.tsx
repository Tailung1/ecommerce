import CategoryList from "../shared/CategoryList";
import DesktopCategoryBrands from "./DesktopCategoryBrands";
import type { Categories } from "../../categories.types";

export default function DesktopCategoryMenu({ categoriesData }: { categoriesData: Categories }) {
  return (
    <div>
      <CategoryList categoriesData={categoriesData} />
      <DesktopCategoryBrands />
    </div>
  );
}
