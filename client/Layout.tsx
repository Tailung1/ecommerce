import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./src/pages/Header/Header";
import HeaderSlider from "./src/pages/Header/HeaderSlider/HeaderSlider";
import { AnimatePresence } from "framer-motion";
import Footer from "./src/pages/Footer/Footer";
import MainBar from "./src/components/shared/BottomNavBar/BottomNavBar";
import AuthBar from "./src/features/AuthBar/AuthBar";
import CompareBar from "./src/features/Compare/CompareBar";
import WarningBar from "./src/features/AlertBar/AlertBar";
import { useMyContext } from "./src/MyContext";
import TopBar from "./src/components/shared/TopBar/TopBar";
import FilterBar from "./src/features/FilterBar/FilterBar";
import useWindowWidth from "./src/CosutmHooks/useWindowWidth";

export default function Layout() {
  const {
    showSideBar,
    showAuthBar,
    showCompareBar,
    isExitingBar,
    setPopularSearches,
    showAlert,
    showSearchBar,
    showFilterBar,
  } = useMyContext();

  const width = useWindowWidth();

  useEffect(() => {
    const getPopularSearches = async () => {
      const items = await fetch(
        "http://localhost:3000/api/products/popularSearches"
      );
      const response = await items.json();
      setPopularSearches(response);
    };
    getPopularSearches();
  }, []);

  let isVisible =
    showCompareBar ||
    showAuthBar ||
    showAlert ||
    showSearchBar ||
    showFilterBar;

  //   useEffect(() => {
  //     document.body.classList.toggle("no-scroll", isVisible);
  //   }, [isVisible]);
  useEffect(() => {
    document.body.classList.toggle("no-scroll", true);
  }, []);

  const getLayerClass = (targetType: "layer" | "main") => {
    // let isPc = window.innerWidth >= 1024;
    let isPc = width >= 1024;
    const target = !isPc
      ? showFilterBar
        ? "layer"
        : !showSearchBar
        ? "main"
        : ""
      : showSearchBar || !isVisible
      ? "main"
      : "layer";

    if (isExitingBar && targetType === target) {
      return "layer-OUT noPointerEvents";
    }

    if (isVisible && targetType === target)
      return "layer-IN noPointerEvents";
  };

  return (
    <div className=' flex flex-col min-h-screen '>
      {" "}
      {showAuthBar && <AuthBar />} {showCompareBar && <CompareBar />}
      {showAlert && <WarningBar />}
      {showFilterBar && <FilterBar />}
      <div
        className={`layer1 flex flex-col flex-grow ${getLayerClass(
          "layer"
        )} `}
      >
        <TopBar />
        <Header />
        <AnimatePresence>
          {showSideBar && <HeaderSlider />}
        </AnimatePresence>

        <main className={getLayerClass("main")}>
          <Outlet />
        </main>
        <Footer />
        <MainBar />
      </div>
    </div>
  );
}
