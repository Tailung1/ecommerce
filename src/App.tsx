
import { useMyContext } from "./MyContext";
import Header from "./pages/header-section/Header";
import HeaderSlider from "./pages/header-section/HeaderSlider";
import { AnimatePresence } from "framer-motion";
import Main from "./pages/Main";

function App() {
  const {showSideBar} =useMyContext()
  return (
    <div>
      <Header />
      <AnimatePresence>
        {showSideBar && <HeaderSlider />}
      </AnimatePresence>
      <Main />
    </div>
  );
}

export default App;
