import { easeOut, motion } from "framer-motion";
import type { SetStateAction } from "react";
import type React from "react";
import Brands from "./Brands";

import searchIcon from "../../assets/search-icon.png";
import mobilePhone from "../../assets/mobile-phone.png";
import tablet from "../../assets/tablet.png";
import laptop from "../../assets/laptop.png";
import consoleIcon from "../../assets/console.png";
import television from "../../assets/television.png";
import smartHome from "../../assets/smart-home.png";

export default function HeaderSlider({
  setShow,
}: {
  setShow: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.5, ease: easeOut }}
      className='slider-wrapper'
    >
      <div className='exit-and-input-parent'>
        <p className='cursor-pointer' onClick={() => setShow(false)}>
          X
        </p>
        <div className='serach-input-wrapper'>
          <input type='text' />
          <div className='serach-input-items'>
            <img src={searchIcon} alt='search icon' />
            <span>Search</span>
          </div>
        </div>
      </div>
      <div className='items-vertical-wrapper'>
        <section className='items-vertical-section'>
          <div>
            <img src={mobilePhone} alt='mobile-phone icon' />
            <div className='mobile-phones'>
              <p>Mobile</p>
              <p>phones</p>
            </div>
          </div>
          <div>
            <img src={tablet} alt='tablet icon' />
            <p>Tabs</p>
          </div>
          <div>
            <img src={laptop} alt='laptop icon' />
            <p>Laptops</p>
          </div>
          <div>
            <img src={consoleIcon} alt='console icon' />
            <p>Gaming</p>
          </div>
          <div>
            <img src={television} alt='tv icon' />
            <p>TV</p>
          </div>
          <div>
            <img src={smartHome} alt='smart home icon' />
            <div className='smart-home'>
              <span>Smart</span>
              <span>home</span>
            </div>
          </div>
        </section>

          <Brands />

      </div>
    </motion.div>
  );
}
