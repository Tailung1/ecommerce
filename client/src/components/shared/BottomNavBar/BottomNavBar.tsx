import "./BottomNavBar.scss";
import MainIcon from "../../../assets/home.png";
import CategoriesIcon from "../../../assets/categories.png";
import CompareIcon from "../../../assets/compare.png";
import PromotionsIcon from "../../../assets/promotions.png";
import LoginIcon from "../../../assets/login.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBarDispatch } from "../../../contexts/BarContext";
import { useCompareDispatch } from "../../../contexts/CompareContext";
import { useCompareCart } from "../../../contexts/CompareContext";

export default function BottomNavBar() {
  const [index, setIndex] = useState(1);
  const { setBar } = useBarDispatch();
  const navigate = useNavigate();
  const { setIsCompareVisible } = useCompareDispatch();
  const { compareCart } = useCompareCart();

  type optionsUnion = "Main" | "Categories" | "Promotions" | "Compare" | "Login";

  const options: { id: optionsUnion; icon: string; index: number }[] = [
    { id: "Main", icon: MainIcon, index: 1 },
    { id: "Categories", icon: CategoriesIcon, index: 2 },
    { id: "Promotions", icon: PromotionsIcon, index: 3 },
    { id: "Compare", icon: CompareIcon, index: 4 },
    { id: "Login", icon: LoginIcon, index: 6 },
  ];

  const handlers: Record<optionsUnion, () => void> = {
    Main: () => {
      navigate("/");

      setBar("showSearchBar", true);
      setIndex(1);
    },
    Categories: () => setBar("showSideBar", true),
    Promotions: () => {
      navigate("/promotions");
      setIndex(3);
    },
    Compare: () => {
      setIsCompareVisible(true)
      navigate("/compare-products");
      setIndex(4);
    },
    Login: () => setBar("showAuthBar", true),
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
              <img className='promotionsIcon-block' src={cat.icon} alt={cat.id} />
            </>
          ) : (
            <img src={cat.icon} alt={cat.id} />
          )}
          <span className={`${index === cat.index ? "active-category-text" : ""}`}>{cat.id}</span>
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
