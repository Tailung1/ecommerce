import { useMyContext } from "../../MyContext";
import mainLogo from "../../assets/main-logo.png";
import slideIcon from "../../assets/slide-icon.png";
import searchIcon from "../../assets/search-icon.png";
import cartIcon from "../../assets/shopping-cart.png";
import loginIcon from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const {
    cart,
    setShowSideBar,
    setShowSearchBar,
    language,
    setLanguage,
  } = useMyContext();
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const scrolled = window.scrollY;
      console.log(scrolled);

      if (scrolled >= 110) {
        header?.classList.add("animate-header");
      } else {
        header?.classList.remove("animate-header");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [showLanguages, setShowLanguages] = useState<boolean>(false);
  const navigate = useNavigate();
  const languages = ["EN", "GE"];
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
        <div
          onClick={() => {
            navigate("/");
            setShowSearchBar(false);
          }}
          className='main-logo-container'
        >
          <img className='balisha' src={mainLogo} alt='main logo' />
          <p>Balisha</p>
        </div>
      </div>
      <div className='header header-right-side-items'>
        <img
          onClick={() => {
            setShowSearchBar(true);
            navigate("/search");
          }}
          src={searchIcon}
          alt='search-logo'
        />
        <div className='shopping-cart-container'>
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
     
      <div className='pc-header'>
        <div
          onClick={() => {
            navigate("/");
            setShowSearchBar(false);
          }}
          className='main-logo-container'
        >
          <img className='balisha' src={mainLogo} alt='main logo' />
          <p>Balisha</p>
        </div>
        <div className='header-right-side-items'>
          <button className='orange-btn'>Navigation</button>
          <div
            onClick={() => {
              setShowSideBar(false);
              setShowSearchBar(true);
            }}
            className='input-container'
          >
            <input
              className='input'
              placeholder='Search'
              type='text'
            />
            <img
              className='search-icon'
              src={searchIcon}
              alt='search icon'
            />
          </div>
          <div className='white-btn'>
            <img src={cartIcon} alt='Shopping cart icon' />
            <span>Cart</span>
          </div>
          <div className='white-btn'>
            <img src={loginIcon} alt='Login icon' />
            <span>Log In</span>
          </div>
          <button className='orange-btn'>%</button>
        </div>
      </div>
    </header>
  );
}
