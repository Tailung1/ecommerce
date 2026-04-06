import "./BottomNavBar.scss";
import MainIcon from "../../../assets/home.png";
import CategoriesIcon from "../../../assets/categories.png";
import CompareIcon from "../../../assets/compare.png";
import PromotionsIcon from "../../../assets/promotions.png";
import LoginIcon from "../../../assets/login.png";
import { useMyContext } from "../../../MyContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BottomNavBar() {
  const [index, setIndex] = useState(1);
  const {
    setShowSideBar,
    setShowSearchBar,
    setShowAuthBar,
    setShowCompare,
    compareCart,
  } = useMyContext();
  const options = [
    { id: "Main", icon: MainIcon, index: 1 },
    { id: "Categories", icon: CategoriesIcon, index: 2 },
    { id: "Promotions", icon: PromotionsIcon, index: 3 },
    { id: "Compare", icon: CompareIcon, index: 4 },
    { id: "Login", icon: LoginIcon, index: 6 },
  ];
  const navigate = useNavigate();

  return (
    <nav className='bottom-nav-bar'>
      {options.map((cat) => (
        <div
          className={
            cat.id === "Promotions" ? "promotions-wrapper" : ""
          }
          key={cat.id}
          onClick={
            cat.id === "Main"
              ? () => {
                  navigate("/");
                  setShowSearchBar(false);

                  setIndex(cat.index);
                }
              : cat.id === "Categories"
              ? () => setShowSideBar(true)
              : cat.id === "Promotions"
              ? () => {
                  navigate("/promotions"), setIndex(cat.index);
                }
              : cat.id === "Compare"
              ? () => {
                  setShowCompare(true);
                  navigate("/compare-products");
                  setIndex(cat.index);
                }
              : cat.id === "Login"
              ? () => {
                  setShowAuthBar(true);
                }
              : undefined
          }
        >
          {cat.id === "Promotions" ? (
            <>
              {" "}
              <img
                className='promotionsIcon bot'
                src={cat.icon}
                alt={cat.icon}
              />
              <img
                className='promotionsIcon-block hover:rounded-[20px]'
                src={cat.icon}
                alt={cat.icon}
              />
            </>
          ) : (
            <img
              className={
                cat.id === "Promotions"
                  ? "promotionsIcon-block promotionsIcon "
                  : ""
              }
              src={cat.icon}
              alt={cat.icon}
            />
          )}

          <span
            className={`${index === cat.index ? "text-red-500" : ""}`}
          >
            {cat.id}
          </span>
        </div>
      ))}
      {compareCart.some((item) => item !== null) && (
        <div className='compare-amount'>
          <span>
            {
              compareCart.filter(
                (item) => item !== null
              ).length
            }
          </span>
        </div>
      )}
    </nav>
  );
}
