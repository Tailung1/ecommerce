import { useMyContext } from "../../MyContext";
import mainLogo from "../../assets/main-logo.png";
import slideIcon from "../../assets/slide-icon.png";
import searchIcon from "../../assets/search-icon.png";
import cartIcon from "../../assets/shopping-cart.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const {
    cart,
    setShowSideBar,
    setShowSearchBar,
    language,
    setLanguage,
  } = useMyContext();
  const [showLanguages, setShowLanguages] = useState<boolean>(false);
  const navigate = useNavigate();
  const languages = ["EN", "GE"];
  return (
    <header>
      <div>
        {" "}
        <img
          onClick={() => {
            setShowSideBar(true);
          }}
          src={slideIcon}
          alt='slide-icon'
        />
        <div className='main-logo-div'>
          <img
            onClick={() => {
              navigate("/");
              setShowSearchBar(false);
            }}
            className='balisha'
            src={mainLogo}
            alt='main-logo'
          />
          <p>Balisha</p>
        </div>
      </div>
      <div className='header-right-side-items'>
        <img
          onClick={() => {
            setShowSearchBar(true);
            navigate("/search");
          }}
          src={searchIcon}
          alt='search-logo'
        />
        <div className='shipping-cart-container'>
          {cart.length !== 0 && (
            <div className='cart-amount'>
              <span>{cart.length}</span>
            </div>
          )}

          <img
            onClick={() => navigate("/cart")}
            src={cartIcon}
            alt='cart-logo'
          />
        </div>
        <div
          onClick={() => setShowLanguages(!showLanguages)}
          className='languages-wrapper'
        >
          <p>{language}</p>
          {showLanguages && (
            <div className='bg-violet-400 flex flex-col items-center gap-3 absolute left-0 top-[30px] w-full'>
              {languages
                .filter((lang) => lang !== language)
                .map((lang) => (
                  <p
                    onClick={() => {
                      setLanguage(lang);
                    }}
                    key={lang}
                  >
                    {lang}
                  </p>
                ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
