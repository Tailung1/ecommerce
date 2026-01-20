import "../../css/header-output.css"
import { type SetStateAction } from "react";
import mainLogo from "../../assets/main-logo.png";
import slideIcon from "../../assets/slide-icon.png";
import searchIcon from "../../assets/search-icon.png";
import cartIcon from "../../assets/shopping-cart.png";
import usaFlagIcon from "../../assets/united-states.png";

export default function Header({
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <header>
      <div>
        {" "}
        <img
          onClick={() => setShow(true)}
          src={slideIcon}
          alt='slide-icon'
        />
        <div className='main-logo-div'>
          <img className='balisha' src={mainLogo} alt='main-logo' />
          <p>Balisha</p>
        </div>
      </div>
      <div>
        <img src={searchIcon} alt='search-logo' />
        <img src={cartIcon} alt='cart-logo' />
        <div className='flag-wrapper'>
          <img src={usaFlagIcon} alt='flag-logo' />
        </div>
      </div>
    </header>
  );
}
