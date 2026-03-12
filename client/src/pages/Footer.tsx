import MainIcon from "../assets/home.png";
import CategoriesIcon from "../assets/categories.png";
import CompareIcon from "../assets/compare.png";
import PromotionsIcon from "../assets/promotions.png";
import LoginIcon from "../assets/login.png";
import { useMyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const { setShowSideBar, setShowSearchBar, setShowAuthBar } =
    useMyContext();
  const options = [
    { id: "Main", icon: MainIcon },
    { id: "Categories", icon: CategoriesIcon },
    { id: "Promotions", icon: PromotionsIcon },
    { id: "Compare", icon: CompareIcon },
    { id: "Login", icon: LoginIcon },
  ];
  const navigate = useNavigate();
  return (
    <footer>
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
                }
              : cat.id === "Categories"
              ? () => setShowSideBar(true)
              : cat.id === "Login"
              ? () => setShowAuthBar(true)
              : undefined
          }
        >
          {cat.id === "Promotions" ? (
            <>
              {" "}
              <img
                className='promotionsIcon'
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

          <span>{cat.id}</span>
        </div>
      ))}
    </footer>
  );
}
