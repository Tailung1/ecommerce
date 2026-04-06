import { useEffect, useRef } from "react";
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
import FirstSection from "./src/components/shared/TopBar/TopBar";

export default function Layout() {
  const {
    showSideBar,
    showAuthBar,
    showCompareBar,
    isExitingBar,
    setPopularSearches,
    showAlert,
  } = useMyContext();

  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const bar = barRef.current!;
    if (!bar) return;
    function trickle() {
      if (progressRef.current < 30) {
        progressRef.current += 30;
        bar.style.width = progressRef.current + "%";
      }
    }

    trickle();

    const timeout = setTimeout(() => {
      progressRef.current = 100;
      bar.style.width = "100%";
      setTimeout(() => {
        bar.style.display = "none";
      }, 200);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [showAuthBar]);

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

  useEffect(() => {
    if (showSideBar || showCompareBar || showAuthBar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showSideBar, showCompareBar, showAuthBar]);

  return (
    <div className='flex flex-col  flex-grow'>
      <div ref={barRef}></div>
      <FirstSection />
      <Header />
      <AnimatePresence>
        {showSideBar && <HeaderSlider />}
      </AnimatePresence>
      {showAuthBar && <AuthBar />}
      {showCompareBar && <CompareBar />}
      {showAlert && <WarningBar />}
      <main
        className={` ${
          (showAuthBar || showCompareBar || showAlert) &&
          "layer-backgroundIN"
        } ${isExitingBar && "layer-backgroundOUT"}  `}
      >
        <Outlet />
      </main>
      <Footer />
      <MainBar />
    </div>
  );
}
