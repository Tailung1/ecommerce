import useMediaQuery from "../../../hooks/useMediaQuery";
import DesktopCategoryMenu from "./desktop/DesktopCategoryMenu";
import MobileCategoryMenu from "./mobile/MobileCategoryMenu";
import useCategories from "../hooks/useCategories";

export default function CategoryNavigation() {
  const categoriesData = useCategories();
  const isDesktop = useMediaQuery();
  return (
    <>
      {isDesktop ? (
        <DesktopCategoryMenu categoriesData={categoriesData} />
      ) : (
        <MobileCategoryMenu categoriesData={categoriesData} />
      )}
    </>
  );
}
