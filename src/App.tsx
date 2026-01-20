import { useState } from "react";
import Header from "./pages/header-section/Header";
import HeaderSlider from "./pages/header-section/HeaderSlider";
import { AnimatePresence } from "framer-motion";

function App() {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className='mainn'>
      <Header show={show} setShow={setShow} />
      <AnimatePresence>
        {show && <HeaderSlider setShow={setShow} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
