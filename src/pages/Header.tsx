import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  //   const [show, setShow] = useState<boolean>(false);

  return (
    <header>
      <div>
        {" "}
        <img src='../assets/slide-icon.png' alt='slide-icon' />
        <div className="main-logo-div">
          <img src='/assets/main-logo.png' alt='main-logo' />
          <p>Balisha store</p>
        </div>
      </div>
      <div>
        <img src='/assets/search-icon.png' alt='search-logo' />
        <img src='/assets/shopping-cart.png' alt='cart-logo' />
        <div className='flag-wrapper'>
          <img src='/assets/united-states.png' alt='flag-logo' />
        </div>
      </div>
    </header>
  );
}
