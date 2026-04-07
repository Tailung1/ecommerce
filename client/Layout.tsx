import { useEffect, useState } from "react";
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
    showSearchBar,
  } = useMyContext();

  //   const barRef = useRef<HTMLDivElement>(null);
  //   const progressRef = useRef(0);

  //   useEffect(() => {
  //     const bar = barRef.current!;
  //     if (!bar) return;
  //     function trickle() {
  //       if (progressRef.current < 30) {
  //         progressRef.current += 30;
  //         bar.style.width = progressRef.current + "%";
  //       }
  //     }

  //     trickle();

  //     const timeout = setTimeout(() => {
  //       progressRef.current = 100;
  //       bar.style.width = "100%";
  //       setTimeout(() => {
  //         bar.style.display = "none";
  //       }, 200);
  //     }, 300);

  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   }, [showAuthBar]);

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

  const [isPc, setIsPc] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsPc(true);
    }
    if (
      showSideBar ||
      showCompareBar ||
      showAuthBar ||
      showSearchBar
    ) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showSideBar, showAuthBar, showCompareBar, showSearchBar]);

  return (
    <div
      className={`flex flex-col  flex-grow ${
        showAuthBar && isPc && "layer-backgroundIN"
      } ${isExitingBar && isPc && "layer-backgroundOUT"}`}
    >
      {/* <div ref={barRef}></div> */}
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
          (showAuthBar ||
            showCompareBar ||
            showAlert ||
            showSearchBar) &&
          !isPc &&
          "layer-backgroundIN"
        } ${isExitingBar && !isPc && "layer-backgroundOUT"}  `}
      >
        <Outlet />
      </main>
      <Footer />
      <MainBar />
    </div>
  );
}
