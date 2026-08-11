import useMediaQuery from "../../../hooks/useMediaQuery";
import DesktopCategoryMenu from "./desktop/DesktopCategoryMenu";
import MobileCategoryMenu from "./mobile/MobileCategoryMenu";

export default function CategoryNavigation() {
  const isDesktop = useMediaQuery();
  return <>{isDesktop ? <DesktopCategoryMenu /> : <MobileCategoryMenu />}</>;
}
