import { useMyContext } from "./MyContext";
import Header from "./pages/header-section/Header";
import HeaderSlider from "./pages/header-section/HeaderSlider";
import { AnimatePresence } from "framer-motion";
import Main from "./pages/Main";
import Footer from "./pages/Footer";
import { useEffect } from "react";


function App() {
  const { showSideBar } = useMyContext();
  useEffect(() => {
    if (showSideBar) {
      document.body.classList.add("no-scroll");
    } else {
     document.body.classList.remove("no-scroll");
    }
  }, [showSideBar]);
  return (
    <div className='flex flex-col  min-h-[100vh]'>
      <Header />
      <AnimatePresence>
        {showSideBar && <HeaderSlider />}
      </AnimatePresence>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
