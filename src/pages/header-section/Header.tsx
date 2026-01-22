import "../../css/header-output.css";
import { useMyContext } from "../../MyContext";
import mainLogo from "../../assets/main-logo.png";
import slideIcon from "../../assets/slide-icon.png";
import searchIcon from "../../assets/search-icon.png";
import cartIcon from "../../assets/shopping-cart.png";
import usaFlagIcon from "../../assets/united-states.png";

export default function Header() {
  const { setShowSideBar, setShowSearchBar } = useMyContext();
  return (
    <header>
      <div>
        {" "}
        <img
          onClick={() => {setShowSideBar(true)} }
          src={slideIcon}
          alt='slide-icon'
        />
        <div className='main-logo-div'>
          <img className='balisha' src={mainLogo} alt='main-logo' />
          <p>Balisha</p>
        </div>
      </div>
      <div className="header-right-side-items">
        <img
          onClick={() => setShowSearchBar(true)}
          src={searchIcon}
          alt='search-logo'
        />
        <img src={cartIcon} alt='cart-logo' />
        <div className='flag-wrapper'>
          <img src={usaFlagIcon} alt='flag-logo' />
        </div>
      </div>
    </header>
  );
}
