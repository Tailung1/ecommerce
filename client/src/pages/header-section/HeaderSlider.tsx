import { easeOut, motion } from "framer-motion";
import Brands from "./Brands";
import { useMyContext } from "../../MyContext";

import mobilePhone from "../../assets/mobile-phone.png";
import tablet from "../../assets/tablet.png";
import laptop from "../../assets/laptop.png";
import consoleIcon from "../../assets/console.png";
import television from "../../assets/television.png";
import smartHome from "../../assets/smart-home.png";
import searchIcon from "../../assets/search-icon.png";

export default function HeaderSlider() {
  const {
    activeSection,
    setActiveSection,
    setShowSideBar,
    setShowSearchBar,
  } = useMyContext();
  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.5, ease: easeOut }}
      className='slider-container'
    >
      <div className='exit-input-container'>
        <p
          className='cursor-pointer'
          onClick={() => setShowSideBar(false)}
        >
          X
        </p>
        <div className='serach-input-container'>
          <div
            onClick={() => {
              setShowSideBar(false), setShowSearchBar(true);
            }}
            className='input-container'
          >
            <input
              className='input'
              placeholder='Search'
              type='text'
            />
            <img
              className='serach-icon'
              src={searchIcon}
              alt='search icon'
            />
          </div>
        </div>
      </div>
      <div className='items-vertical-wrapper'>
        <section className='items-vertical-section'>
          <div
            className={`${
              activeSection === "mobile-phones"
                ? "active-section"
                : "offline-section"
            } section`}
            onClick={() => setActiveSection("mobile-phones")}
          >
            <img src={mobilePhone} alt='mobile-phones icon' />
            <div className='mobile-phones'>
              <p>Mobile</p>
              <p>phones</p>
            </div>
          </div>

          <div
            className={`${
              activeSection === "tablets"
                ? "active-section"
                : "offline-section"
            } section`}
            onClick={() => setActiveSection("tablets")}
          >
            <img src={tablet} alt='tablet icon' />
            <p>Tabs</p>
          </div>

          <div
            className={`${
              activeSection === "laptops"
                ? "active-section"
                : "offline-section"
            } section`}
            onClick={() => setActiveSection("laptops")}
          >
            <img src={laptop} alt='laptop icon' />
            <p>Laptops</p>
          </div>

          <div
            className={`${
              activeSection === "consoles"
                ? "active-section"
                : "offline-section"
            } section`}
            onClick={() => setActiveSection("consoles")}
          >
            <img src={consoleIcon} alt='console icon' />
            <p>Gaming</p>
          </div>

          <div
            className={`${
              activeSection === "televisions"
                ? "active-section"
                : "offline-section"
            } section`}
            onClick={() => setActiveSection("televisions")}
          >
            <img src={television} alt='tv icon' />
            <p>TV</p>
          </div>

          <div
            className={`${
              activeSection === "smart-home"
                ? "active-section"
                : "offline-section"
            } section`}
            onClick={() => setActiveSection("smart-home")}
          >
            <img src={smartHome} alt='smart home icon' />
            <div className='smart-home'>
              <span>Smart</span>
              <span>home</span>
            </div>
          </div>
        </section>
        <section className='brands-wrapper'>
          {" "}
          <Brands />
        </section>
      </div>
    </motion.div>
  );
}
