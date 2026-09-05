import "./HeaderSlider.scss";
import { easeOut, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import CategoryList from "../../../features/categories/components/shared/CategoryList";
// import CategoryNavigation from "../../../features/categories/components/CategoryNavigation";
import Categories from "../../reusable/Categories/Categories";
import BrandList from "./BrandList/BrandList";
import searchIcon from "../../../assets/search-icon.png";
import rejectIcon from "../../../assets/reject.png";
import { useBarDispatch } from "../../../contexts/BarContext";

export default function HeaderSlider() {
  const navigate = useNavigate();
  const { setBar } = useBarDispatch();

  const closeSidebar = () => {
    setBar("showSideBar", false);
  };

  const handleSearchClick = () => {
    navigate("/search");
    closeSidebar();
  };

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.3, ease: easeOut }}
      className='header-slider-container'
    >
      <div className='header-slider-exit-input-container'>
        <img src={rejectIcon} alt='Close' className='cursor-pointer' onClick={closeSidebar} />

        <div onClick={handleSearchClick} className='search-input-container'>
          <div className='input-container'>
            <input className='input' placeholder='Search' type='text' />
            <img className='search-icon' src={searchIcon} alt='Search' />
          </div>
        </div>
      </div>

      <div className='categories-and-brands-container'>
        <Categories />
        <BrandList />
      </div>
    </motion.div>
  );
}
