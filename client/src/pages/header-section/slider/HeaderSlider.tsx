import { easeOut, motion } from "framer-motion";
import BrandList from "./BrandList";
import { useMyContext } from "../../../MyContext";

import mobilePhone from "../../../assets/mobile-phone.png";
import tablet from "../../../assets/tablet.png";
import laptop from "../../../assets/laptop.png";
import consoleIcon from "../../../assets/console.png";
import television from "../../../assets/television.png";
import smartHome from "../../../assets/smart-home.png";
import searchIcon from "../../../assets/search-icon.png";
import rejectIcon from "../../../assets/reject.png";

export default function HeaderSlider() {
  const {
    activeCategory,
    setActiveCategory,
    setShowSideBar,
    setShowSearchBar,
  } = useMyContext();
  const categories = [
    {
      id: "mobile-phones",
      label: ["Mobile", "Phones"],
      icon: mobilePhone,
    },
    { id: "tablets", label: ["Tabs"], icon: tablet },
    { id: "laptops", label: ["Laptops"], icon: laptop },
    { id: "consoles", label: ["Gaming"], icon: consoleIcon },
    { id: "televisions", label: ["TV"], icon: television },
    { id: "smart-home", label: ["Smart", "Home"], icon: smartHome },
  ];

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.5, ease: easeOut }}
      className='slider-container'
    >
      <div className='exit-input-container'>
        <img
          src={rejectIcon}
          className='cursor-pointer'
          onClick={() => setShowSideBar(false)}
        />

        <div className='serach-input-container'>
          <div
            onClick={() => {
              setShowSideBar(false);
              setShowSearchBar(true);
            }}
            className='input-container'
          >
            <input
              className='input'
              placeholder='Search'
              type='text'
            />
            <img
              className='search-icon'
              src={searchIcon}
              alt='search icon'
            />
          </div>
        </div>
      </div>
      <div className='categories-and-brands-container'>
        <section className='categories-wrapper'>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`${
                activeCategory === cat.id
                  ? "active-category category-animate"
                  : "offline-category"
              } category`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <img src={cat.icon} alt={`${cat.id} icon`} />
              <div className={`${cat.label.length > 1 && cat.id}`}>
                {cat.label.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </section>
        <section className='brands-container'>
          {" "}
          <BrandList />
        </section>
      </div>
    </motion.div>
  );
}
