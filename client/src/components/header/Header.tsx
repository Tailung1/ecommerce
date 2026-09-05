import "./Header.scss";
import LanguageSelector from "../shared/LanguageSelector/LanguageSelector";
import ShoppingCartPop from "./ShoppingCartPop/ShoppingCartPop";
import slideIcon from "../../assets/slide-icon.png";
import searchIcon from "../../assets/search-icon.png";
import cartIcon from "../../assets/shopping-cart.png";
import loginIcon from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import Logo from "../shared/Logo/Logo";
import { useBarDispatch } from "../../contexts/BarContext";

export default function Header() {
  const { setBar } = useBarDispatch();
  const navigate = useNavigate();

  return (
    <header>
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
          <button className='orange-btn'>Navigation</button>

          <div className='input-container'>
            <input className='input' placeholder='Search' type='text' />

            <img className='search-icon' src={searchIcon} alt='Search icon' />
          </div>

          <div className='cart-container-header'>
            <img src={cartIcon} alt='Shopping cart icon' />

            <span>Cart</span>

            <div className='invisible-div'></div>

            <ShoppingCartPop />
          </div>

          <div onClick={() => setBar("showAuthBar", true)} className='login-container-header'>
            <img src={loginIcon} alt='Login icon' />

            <span>Login</span>
          </div>

          <button className='orange-btn'>%</button>
        </div>
      </div>
    </header>
  );
}
