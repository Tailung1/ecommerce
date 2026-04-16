import "./Header.scss";
import { useMyContext } from "../../MyContext";
import LanguageSelector from "../../components/shared/LanguageSelector/LanguageSelector";
import ShoppingCartPop from "./ShoppingCartPop";
import slideIcon from "../../assets/slide-icon.png";
import searchIcon from "../../assets/search-icon.png";
import cartIcon from "../../assets/shopping-cart.png";
import loginIcon from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/shared/Logo/Logo";
import SearchBar from "../main/SearchBar/SearchBar";
import { useEffect } from "react";

export default function Header() {
  const { cart, setShowSideBar, showSearchBar, setShowSearchBar, setShowAuthBar } = useMyContext();

  useEffect(() => {
    const handleScroll = () => {
      const Y = window.scrollY;
      const header = document.querySelector("header");
      if (!header) return;

      if (Y > 127) {
        header.classList.add("header-sticky");
      }
      if (header.classList.contains("header-sticky") && Y < 57) {
        header.classList.remove("header-sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();
  return (
    <header>
      <div className='header'>
        {" "}
        <img
          onClick={() => {
            setShowSideBar(true);
          }}
          src={slideIcon}
          alt='slide-icon'
        />
        <Logo />
      </div>
      <div className='header header-right-side-items'>
        <img
          onClick={() => {
            navigate("/search");
          }}
          src={searchIcon}
          alt='search-logo'
        />
        <div className='shopping-cart-container-header'>
          {cart.length !== 0 && (
            <div className='cart-amount'>
              <span>{cart.length}</span>
            </div>
          )}

          <img onClick={() => navigate("/cart")} src={cartIcon} alt='cart-logo' />
        </div>
        <LanguageSelector />
      </div>
      {/* </div> */} {/* </div> */} {/* </div> */} {/* </div> */}{" "}
      <div className='pc-header'>
        <Logo />
        <div className='header-right-side-items'>
          <button className='orange-btn'>Navigation</button>
          {showSearchBar ? (
            <SearchBar />
          ) : (
            <div onClick={() => setShowSearchBar(true)} className='input-container'>
              <input className='input' placeholder='Search' type='text' />
              <img className='search-icon' src={searchIcon} alt='search icon' />
            </div>
          )}

          <div className='cart-container-header'>
            <img src={cartIcon} alt='Shopping cart icon' />
            <span>Cart</span>
            <div className='invisible-div'></div>
            <ShoppingCartPop />
          </div>

          <div onClick={() => setShowAuthBar(true)} className='login-container-header'>
            <img src={loginIcon} alt='Login icon' />
            <span>Log In</span>
          </div>
          <button className='orange-btn'>%</button>
        </div>
      </div>
    </header>
  );
}
