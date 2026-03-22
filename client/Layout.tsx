import { Outlet } from "react-router-dom";
import Header from "../client/src/pages/header-section/Header";
import HeaderSlider from "./src/pages/header-section/slider/HeaderSlider";
import { AnimatePresence } from "framer-motion";
import Footer from "./src/pages/Footer";
import FooterNavBar from "./src/bottomNAV/FooterNavBar";
import { useMyContext } from "./src/MyContext";

export default function Layout() {
  const {showSideBar, showAuthBar, showCompareBar, isExitingBar } =
    useMyContext();
  return (
    <div className='flex flex-col  flex-grow'>
      <Header />
      <AnimatePresence>
        {showSideBar && <HeaderSlider />}
      </AnimatePresence>
      <main
        className={`flex-grow flex flex-col bg-white  ${
          (showAuthBar || showCompareBar) && "layer-backgroundIN"
        } ${isExitingBar && "layer-backgroundOUT"} `}
      >
        <Outlet />
      </main>
      <Footer />
      <FooterNavBar />
    </div>
  );
}
