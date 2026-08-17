import { useEffect, useMemo, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./src/components/Header/Header";
import HeaderSlider from "./src/components/Header/HeaderSlider/HeaderSlider";
import { AnimatePresence } from "framer-motion";
import Footer from "./src/components/footer/Footer";
import BottomNavBar from "./src/components/shared/BottomNavBar/BottomNavBar";
import TopBar from "./src/components/shared/TopBar/TopBar";
import { useBarStateValue } from "./src/contexts/BarContext";
import BarWrapper from "./src/BarWrapper/BarWrapper";
import useMediaQuery from "./src/hooks/useMediaQuery";

export default function Layout() {
  const [layerTarget, setLayerTarget] = useState<"main" | "full">("main");
  const [mainHeight, setMainHeight] = useState<{ height: number; offsetTop: number }>({
    height: 0,
    offsetTop: 0,
  });
  const isDesktop = useMediaQuery();

  const showAuthBar = useBarStateValue("showAuthBar");
  const showFilterBar = useBarStateValue("showFilterBar");
  const showCompareBar = useBarStateValue("showCompareBar");
  const showSearchBar = useBarStateValue("showSearchBar");
  const showSideBar = useBarStateValue("showSideBar");
  const showAlert = useBarStateValue("alert").showAlert;

  const mainRef = useRef<HTMLElement>(null);

  let isVisible = useMemo(
    () => [showCompareBar, showAuthBar, showAlert, showSearchBar, showFilterBar].some(Boolean),
    [showCompareBar, showAuthBar, showAlert, showSearchBar, showFilterBar]
  );

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (mainRef.current) {
      const rect = mainRef.current.getBoundingClientRect();
      setMainHeight({ height: rect.height, offsetTop: rect.top + window.scrollY });
    }
    const target = showFilterBar || (isDesktop && !showSearchBar) ? "full" : "main";
    setLayerTarget(target);
  }, [mainRef, isDesktop, isVisible]);

  return (
    <div className='flex flex-col flex-grow'>
      {isVisible && (
        <BarWrapper layerTarget={layerTarget} mainHeight={mainHeight} isDesktop={isDesktop} />
      )}
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
