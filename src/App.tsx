import { useMyContext } from "./MyContext";
import Header from "./pages/header-section/Header";
import HeaderSlider from "./pages/header-section/HeaderSlider";
import { AnimatePresence } from "framer-motion";
import Main from "./pages/Main";
import Footer from "./pages/Footer";

function App() {
  const { showSideBar } = useMyContext();
  return (
    <div>
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
