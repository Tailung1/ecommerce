import "./Header.scss";
import LanguageSelector from "../shared/LanguageSelector/LanguageSelector";
import ShoppingCartPop from "./ShoppingCartPop/ShoppingCartPop";
import slideIcon from "../../assets/slide-icon.png";
import searchIcon from "../../assets/search-icon.png";
import cartIcon from "../../assets/shopping-cart.png";
import loginIcon from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import Logo from "../shared/Logo/Logo";
import SearchBar from "../../pages/main/searchBar/SearchBar";
import { useEffect, useRef } from "react";
import { useBarDispatch } from "../../contexts/BarContext";
import { useBarStateValue } from "../../contexts/BarContext";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { setBar } = useBarDispatch();
  const showSearchBar = useBarStateValue("showSearchBar");

  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const Y = window.scrollY;
      const header = headerRef.current;

      if (!header) return;

      if (Y > 127) {
        header.classList.add("header-sticky");
      } else if (Y < 57) {
        header.classList.remove("header-sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header ref={headerRef}>
      <div className='header'>
        <img onClick={() => setBar("showSideBar", true)} src={slideIcon} alt='Open menu' />
        <Logo />
      </div>

      <div className='header header-right-side-items'>
        <img onClick={() => navigate("/search")} src={searchIcon} alt='Search products' />

        <div className='shopping-cart-container-header'>
          <img onClick={() => navigate("/cart")} src={cartIcon} alt='Shopping cart' />
        </div>

        <LanguageSelector />
      </div>

      <div className='pc-header'>
        <Logo />

        <div className='header-right-side-items'>
          <button className='orange-btn'>{t("navigation")}</button>

          {showSearchBar ? (
            <SearchBar />
          ) : (
            <div onClick={() => setBar("showSearchBar", true)} className='input-container'>
              <input className='input' placeholder='Search' type='text' />
              <img className='search-icon' src={searchIcon} alt='Search icon' />
            </div>
          )}

          <div className='cart-container-header'>
            <img src={cartIcon} alt='Shopping cart icon' />
            <span>{t("cart")}</span>
            <div className='invisible-div'></div>
            <ShoppingCartPop />
          </div>

          <div onClick={() => setBar("showAuthBar", true)} className='login-container-header'>
            <img src={loginIcon} alt='Login icon' />
            <span>{t("login")}</span>
          </div>

          <button className='orange-btn'>%</button>
        </div>
      </div>
    </header>
  );
}
