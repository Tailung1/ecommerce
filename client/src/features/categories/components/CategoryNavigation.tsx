import useMediaQuery from "../../../hooks/useMediaQuery";
import DesktopCategoryMenu from "./desktop/DesktopCategoryMenu";
import MobileCategoryMenu from "./mobile/MobileCategoryMenu";
import { categoriesData } from "../categories.api";

export default function CategoryNavigation() {
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
