import { useMyContext } from "./MyContext";
import HeaderSlider from "./pages/header-section/HeaderSlider";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import router from "../routes";
import { RouterProvider } from "react-router-dom";

function App() {
  const { showSideBar, setPopularSearches } = useMyContext();
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
    if (showSideBar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showSideBar]);
  useEffect(() => {
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 70) {
        header?.classList.add("scrolled");
      }
    });
  }, []);

  return (
    <div className='flex flex-col  min-h-[100vh] '>
      <AnimatePresence>
        {showSideBar && <HeaderSlider />}
      </AnimatePresence>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
