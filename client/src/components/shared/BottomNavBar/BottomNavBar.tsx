import "./BottomNavBar.scss";
import MainIcon from "../../../assets/home.png";
import CategoriesIcon from "../../../assets/categories.png";
import CompareIcon from "../../../assets/compare.png";
import PromotionsIcon from "../../../assets/promotions.png";
import LoginIcon from "../../../assets/login.png";
import { useMyContext } from "../../../MyContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBarUpdater } from "../../../contexts/BarContext";

export default function BottomNavBar() {
  const [index, setIndex] = useState(1);

  const { setShowSideBar, setShowSearchBar, setShowCompare, compareCart } = useMyContext();
  const handleBarUpdate = useBarUpdater("showAuthBar", true);

  const navigate = useNavigate();

  const options = [
    { id: "Main", icon: MainIcon, index: 1 },
    { id: "Categories", icon: CategoriesIcon, index: 2 },
    { id: "Promotions", icon: PromotionsIcon, index: 3 },
    { id: "Compare", icon: CompareIcon, index: 4 },
    { id: "Login", icon: LoginIcon, index: 6 },
  ];

  const handlers: Record<string, () => void> = {
    Main: () => {
      navigate("/");
      setShowSearchBar(false);
      setIndex(1);
    },
    Categories: () => setShowSideBar(true),
    Promotions: () => {
      navigate("/promotions");
      setIndex(3);
    },
    Compare: () => {
      setShowCompare(true);
      navigate("/compare-products");
      setIndex(4);
    },
    Login: handleBarUpdate,
  };

  return (
    <nav className='bottom-nav-bar'>
      {options.map((cat) => (
        <div
          key={cat.id}
          className={cat.id === "Promotions" ? "promotions-wrapper" : ""}
          onClick={handlers[cat.id]}
        >
          {cat.id === "Promotions" ? (
            <>
              <img className='promotionsIcon bot' src={cat.icon} alt={cat.id} />
              <img
                className='promotionsIcon-block hover:rounded-[20px]'
                src={cat.icon}
                alt={cat.id}
              />
            </>
          ) : (
            <img src={cat.icon} alt={cat.id} />
          )}
          <span className={`${index === cat.index ? "text-red-500" : ""}`}>{cat.id}</span>
        </div>
      ))}

      {compareCart.some((item) => item !== null) && (
        <div className='compare-amount'>
          <span>{compareCart.filter((item) => item !== null).length}</span>
        </div>
      )}
    </nav>
  );
}
