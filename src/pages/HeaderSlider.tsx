import { easeIn, easeInOut, easeOut, motion } from "framer-motion";
import type { SetStateAction } from "react";
import type React from "react";

export default function HeaderSlider({
  setShow,
}: {
  setShow:React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.5,ease:easeOut }}
      className='slider-wrapper'
    >
      <div className='exit-and-input-parent'>
        <p className="" onClick={() => setShow(false)}>X</p>
        <div className='serach-input-wrapper'>
          <input type='text' />
          <div className='serach-input-items'>
            <img src='/assets/search-icon.png' alt='search icon' />
            <span>Search</span>
          </div>
        </div>
      </div>
      <div className='items-vertical-wrapper'>
        <section className='items-vertical-section'>
          {" "}
          <div>
            {" "}
            <img
              src='/assets/mobile-phone.png'
              alt='mobile-phone icon'
            />
            <div className='mobile-phones'>
              <p>Mobile</p>
              <p>phones</p>
            </div>
          </div>
          <div>
            <img src='/assets/tablet.png' alt='tablet icon' />
            <p>Tabs</p>
          </div>
          <div>
            {" "}
            <img src='/assets/laptop.png' alt='laptop icon' />
            <p>Laptops</p>
          </div>
          <div>
            <img src='/assets/console.png' alt='console icon' />
            <p>Gaming</p>
          </div>
          <div>
            {" "}
            <img src='/assets/television.png' alt='tv icon' />
            <p>TV</p>
          </div>
          <div>
            {" "}
            <img src='/assets/smart-home.png' alt='tv icon' />
            <div className="smart-home">
                <span>Smart</span>
                <span>home</span>
            </div>
        
          </div>
        </section>
        <section className='brands-wrapper'>
          <div>Samsung</div>
          <div>Apple </div>
          <div>Xiamo</div>
        </section>
      </div>
    </motion.div>
  );
}
