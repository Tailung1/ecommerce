import "./HeaderSlider.scss";
import { easeOut, motion } from "framer-motion";
import CategoryNavigation from "../../../features/categories/components/CategoryNavigation";
// import Categories from "../../../features/categories/components/CategoryList";
import { useNavigate } from "react-router-dom";
// import BrandList from "./BrandList/BrandList";
import searchIcon from "../../../assets/search-icon.png";
import rejectIcon from "../../../assets/reject.png";
import { useBarDispatch } from "../../../contexts/BarContext";

export default function HeaderSlider() {
  const navigate = useNavigate();
  const { setBar } = useBarDispatch();

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.3, ease: easeOut }}
      className='header-slider-container'
    >
      <div className='header-slider-exit-input-container'>
        <img
          src={rejectIcon}
          className='cursor-pointer'
          onClick={() => setBar("showSideBar", false)}
        />

        <div
          onClick={() => {
            navigate("/search");
            setBar("showSideBar", false);
          }}
          className='serach-input-container'
        >
          <div className='input-container'>
            <input className='input' placeholder='Search' type='text' />
            <img className='search-icon' src={searchIcon} alt='search icon' />
          </div>
        </div>
      </div>
      <div className='categories-and-brands-container'>
        <CategoryNavigation />
      </div>
    </motion.div>
  );
}
