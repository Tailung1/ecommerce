import { useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Header from "./src/pages/Header/Header";
import HeaderSlider from "./src/pages/Header/HeaderSlider/HeaderSlider";
import { AnimatePresence } from "framer-motion";
import Footer from "./src/pages/Footer/Footer";
import MainBar from "./src/components/shared/BottomNavBar/BottomNavBar";
import AuthBar from "./src/features/AuthBar/AuthBar";
import CompareBar from "./src/features/Compare/CompareBar";
import WarningBar from "./src/features/AlertBar/AlertBar";
import TopBar from "./src/components/shared/TopBar/TopBar";
import FilterBar from "./src/features/FilterBar/FilterBar";
import useWindowWidth from "./src/CosutmHooks/useWindowWidth";
import { UseBarContext } from "./src/contexts/BarContext";

export default function Layout() {
  const {
    showAuthBar,
    showFilterBar,
    showCompareBar,
    showAlert,
    showSearchBar,
    isExitingBar,
    showSideBar,
  } = UseBarContext();

  const width = useWindowWidth();

  let isVisible = useMemo(
    () => [showCompareBar, showAuthBar, showAlert, showSearchBar, showFilterBar].some(Boolean),
    [showCompareBar, showAuthBar, showAlert, showSearchBar, showFilterBar]
  );

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isVisible);
  }, [isVisible]);

  let isPc = width >= 1024;

  const getLayerClass = (targetType: "layer" | "main") => {
    const target = showFilterBar || (isPc && !showSearchBar) ? "layer" : "main";

    if (isExitingBar && targetType === target) {
      return "layer-OUT noPointerEvents";
    }
    if (isVisible && targetType === target) return "layer-IN noPointerEvents";
    return "";
  };

  return (
    <div className='flex flex-col min-h-screen '>
      {" "}
      {showAuthBar && <AuthBar />} {showCompareBar && <CompareBar />}
      {showAlert && <WarningBar />}
      {showFilterBar && <FilterBar />}
      <div className={`layer1 flex flex-col flex-grow ${getLayerClass("layer")} `}>
        <TopBar />
        <Header />
        <AnimatePresence>{showSideBar && <HeaderSlider />}</AnimatePresence>

        <main className={getLayerClass("main")}>
          <Outlet />
        </main>
        <Footer />
        <MainBar />
      </div>
    </div>
  );
}
