import type { Categories } from "../../categories.types";
import CategoryList from "../shared/CategoryList";
import MobileCategoryBrands from "./MobileCategoryBrands";

export default function MobileCategoryMenu({ categoriesData }: { categoriesData: Categories }) {
  return (
    <div>
      <CategoryList categoriesData={categoriesData} />
      <MobileCategoryBrands />
    </div>
  );
}
