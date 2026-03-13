import { Outlet } from "react-router-dom";
import Header from "../client/src/pages/header-section/Header";
import Footer from "../client/src/pages/Footer";
import { useMyContext } from "./src/MyContext";

export default function Layout() {
  const { showAuthBar, isExitingAuthBar } = useMyContext();

  return (
    <div className='flex flex-col  flex-grow'>
      <Header />
      <main
        className={`flex-grow flex flex-col bg-white hh ${
          showAuthBar && "layer-backgroundIN"
        } ${isExitingAuthBar && "layer-backgroundOUT"} `}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
