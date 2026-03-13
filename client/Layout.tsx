import { Outlet } from "react-router-dom";
import Header from "../client/src/pages/header-section/Header";
import Footer from "../client/src/pages/Footer";
import { useMyContext } from "./src/MyContext";

export default function Layout() {
  const { showAuthBar, showCompareBar, isExitingBar } =
    useMyContext();

  return (
    <div className='flex flex-col  flex-grow'>
      <Header />
      <main
        className={`flex-grow flex flex-col bg-white hh ${
          (showAuthBar || showCompareBar) && "layer-backgroundIN"
        } ${isExitingBar && "layer-backgroundOUT"} `}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
