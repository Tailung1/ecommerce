import "./HeaderSlider.scss";
import { easeOut, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../../reusable/Categories/Categories";
import BrandList from "./BrandList/BrandList";
import searchIcon from "../../../assets/search-icon.png";
import rejectIcon from "../../../assets/reject.png";
import { useBarDispatch } from "../../../contexts/BarContext";

export default function HeaderSlider() {
  const navigate = useNavigate();
  const { setBar } = useBarDispatch();
  const [searchValue, setSearchValue] = useState("");

  const closeSidebar = () => {
    setBar("showSideBar", false);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSearchValue = searchValue.trim();

    if (!trimmedSearchValue) {
      return;
    }

    navigate(`/search?query=${encodeURIComponent(trimmedSearchValue)}`);
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

        <form onSubmit={handleSearch} className='search-input-container'>
          <div className='input-container'>
            <input
              name='search'
              className='input'
              placeholder='Search'
              type='search'
              value={searchValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(event.target.value)
              }
              autoComplete='off'
              aria-label='Search products'
            />

            <button
              type='submit'
              className='search-button'
              aria-label='Search'
              disabled={!searchValue.trim()}
            >
              <img className='search-icon' src={searchIcon} alt='' />
            </button>
          </div>
        </form>
      </div>

      <div className='categories-and-brands-container'>
        <Categories />
        <BrandList />
      </div>
    </motion.div>
  );
}
