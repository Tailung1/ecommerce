import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Test from "./test";

function App() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <header>
      <div>
        {" "}
        <p onClick={() => setShow(true)} className='show-button'>
          show it
        </p>
        <div className='header-content'>
          <p>this is header content</p>
        </div>
 
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
              exit={{ x: "-100vw" }}
              className='overlay'
            >
              <div onClick={() => setShow(false)}>back</div>
              <div>Laptops</div>
              <div>Phones</div>
              <div>TV</div>
              <div>Care</div>
              <div>Gaming</div>
              <div>More</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        <Test />
      </div>
    </header>
  );
}

export default App;
