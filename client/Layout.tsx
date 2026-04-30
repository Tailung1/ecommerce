import { useEffect, useMemo, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./src/pages/Header/Header";
import HeaderSlider from "./src/pages/Header/HeaderSlider/HeaderSlider";
import { AnimatePresence } from "framer-motion";
import Footer from "./src/pages/Footer/Footer";
import BottomNavBar from "./src/components/shared/BottomNavBar/BottomNavBar";
import TopBar from "./src/components/shared/TopBar/TopBar";
import useWindowWidth from "./src/CosutmHooks/useWindowWidth";
import { useBarStateValue } from "./src/contexts/BarContext";
import BarWrapper from "./src/BarWrapper/BarWrapper";

export default function Layout() {
  const [layerTarget, setLayerTarget] = useState<"main" | "full">("main");
  const [mainHeight, setMainHeight] = useState<{ height: number; offsetTop: number }>({
    height: 0,
    offsetTop: 0,
  });

  const showAuthBar = useBarStateValue("showAuthBar");
  const showFilterBar = useBarStateValue("showFilterBar");
  const showCompareBar = useBarStateValue("showCompareBar");
  const showSearchBar = useBarStateValue("showSearchBar");
  const showSideBar = useBarStateValue("showSideBar");
  const showAlert = useBarStateValue("alert").showAlert;

  const mainRef = useRef<HTMLElement>(null);
  const width = useWindowWidth();

  let isVisible = useMemo(
    () => [showCompareBar, showAuthBar, showAlert, showSearchBar, showFilterBar].some(Boolean),
    [showCompareBar, showAuthBar, showAlert, showSearchBar, showFilterBar]
  );

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isVisible);
  }, [isVisible]);

  let isPc = width >= 1024;

 useEffect(() => {
   if (mainRef.current) {
     const rect = mainRef.current.getBoundingClientRect();
     setMainHeight({ height: rect.height, offsetTop: rect.top + window.scrollY });
   }
   const target = showFilterBar || (isPc && !showSearchBar) ? "full" : "main";
   setLayerTarget(target);
 }, [mainRef, isPc, showFilterBar, showSearchBar]);

  return (
    <div className='flex flex-col flex-grow'>
      <BarWrapper isVisible={isVisible} layerTarget={layerTarget} mainHeight={mainHeight} />
      <TopBar />
      <Header />
      <AnimatePresence>{showSideBar && <HeaderSlider />}</AnimatePresence>
      <main ref={mainRef}>
        <Outlet />
      </main>
      <Footer />
      <BottomNavBar />
    </div>
  );
}
