import { useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Header from "./src/pages/Header/Header";
import HeaderSlider from "./src/pages/Header/HeaderSlider/HeaderSlider";
import { AnimatePresence } from "framer-motion";
import Footer from "./src/pages/Footer/Footer";
import MainBar from "./src/components/shared/BottomNavBar/BottomNavBar";
import AuthBar from "./src/features/AuthBar/AuthBar";
import CompareBar from "./src/features/Compare/CompareBar";
import AlertBar from "./src/features/AlertBar/AlertBar";
import TopBar from "./src/components/shared/TopBar/TopBar";
import FilterBar from "./src/features/FilterBar/FilterBar";
import useWindowWidth from "./src/CosutmHooks/useWindowWidth";
import { useBarStateValue } from "./src/contexts/BarContext";

export default function Layout() {
  const showAuthBar = useBarStateValue("showAuthBar");
  const showFilterBar = useBarStateValue("showFilterBar");
  const showCompareBar = useBarStateValue("showCompareBar");
  const showSearchBar = useBarStateValue("showSearchBar");
  const isExitingBar = useBarStateValue("isExitingBar");
  const showSideBar = useBarStateValue("showSideBar");
  const showAlert = useBarStateValue("alert").showAlert;
  
  const width = useWindowWidth();

  let isVisible = useMemo(
    () => [showCompareBar, showAuthBar, showAlert, showSearchBar, showFilterBar].some(Boolean),
    [showCompareBar, showAuthBar, showAlert, showSearchBar, showFilterBar]
  );

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isVisible);
  }, [isVisible]);

  let isPc = width >= 1024;

  const getLayerTargetClass = (targetType: "layer" | "main") => {
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
      {showAlert && <AlertBar />}
      {showFilterBar && <FilterBar />}
      <div className={`layer1 flex flex-col flex-grow ${getLayerTargetClass("layer")} `}>
        <TopBar />
        <Header />
        <AnimatePresence>{showSideBar && <HeaderSlider />}</AnimatePresence>

        <main className={getLayerTargetClass("main")}>
          <Outlet />
        </main>
        <Footer />
        <MainBar />
      </div>
    </div>
  );
}
