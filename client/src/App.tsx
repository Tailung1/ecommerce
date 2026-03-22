import { useMyContext } from "./MyContext";
import { useEffect } from "react";
import router from "../routes";
import { RouterProvider } from "react-router-dom";
import AuthBar from "./features/AuthBar";
import CompareBar from "./bottomNAV/CompareBar";

function App() {
  const {
    showSideBar,
    setPopularSearches,
    showAuthBar,
    showCompareBar,
  } = useMyContext();

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
    <div className='flex flex-col min-h-screen'>
      <RouterProvider router={router} />
      {showAuthBar && <AuthBar />}
      {showCompareBar && <CompareBar />}
    </div>
  );
}

export default App;
