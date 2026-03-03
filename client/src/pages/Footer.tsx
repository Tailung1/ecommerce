import homeIcon from "../assets/home.png";
import categoriesIcon from "../assets/categories.png";
import compareIcon from "../assets/compare.png";
import promotionsIcon from "../assets/promotions.png";
import loginIcon from "../assets/login.png";
import { useMyContext } from "../MyContext";

export default function Footer() {
  const { setShowSideBar } = useMyContext();
  return (
    <footer>
      <div>
        <img src={homeIcon} alt='home iocn' />
        <span>Main</span>
      </div>
      <div onClick={() => setShowSideBar(true)}>
        <img src={categoriesIcon} alt='categories icon' />
        <span>Categories</span>
      </div>{" "}
      <div className='promotions-wrapper footer-item'>
        <img className='promotionsIcon-block' src={promotionsIcon} />
        <img className='promotionsIcon' src={promotionsIcon} />
        <span>Promotions</span>
      </div>{" "}
      <div>
        <img src={compareIcon} alt='compare icon' />
        <span>Compare items</span>
      </div>
      <div>
        <img src={loginIcon} alt='login icon' />
        <span>Login</span>
      </div>
    </footer>
  );
}
