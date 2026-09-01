import "./SearchBar.scss";
import { useMyContext } from "../../../contexts/MyContext";
import searchIcon from "../../../assets/search-icon.png";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBarStateValue, useBarDispatch } from "../../../contexts/BarContext";

const generateSlug = (name: string, color: string, id: number) => {
  const normalizedName = name.trim().replace(/\s+/g, "-");

  return `${normalizedName}-${color}-${id}`.toLowerCase();
};

export default function SearchBar() {
  const { popularSearches } = useMyContext();
  const isExiting = useBarStateValue("isExitingBar");
  const { setBar } = useBarDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.animationName !== "SearchBarOut") {
      return;
    }

    setBar("showSearchBar", false);
    setBar("isExitingBar", false);
  };

  const handlePopularSearchClick = (name: string, color: string, id: number) => {
    navigate(`/${generateSlug(name, color, id)}`);
  };

  return (
    <div className='searchBar-container'>
      <div className='input-container'>
        <input
          className='input'
          ref={inputRef}
          placeholder='Search'
          type='text'
          aria-label='Search'
        />

        <img className='search-icon' src={searchIcon} alt='' aria-hidden='true' />
      </div>

      <div
        onAnimationEnd={handleAnimationEnd}
        className={`popular-searches-container ${
          isExiting ? "popular-searches-containerOUT" : "popular-searches-containerIN"
        }`}
      >
        <p>Popular Searches:</p>

        <section className='popular-searches-wrapper' aria-label='Popular searches'>
          {popularSearches.map((item) => (
            <button
              key={item.id}
              type='button'
              onClick={() => handlePopularSearchClick(item.name, item.color, item.id)}
            >
              {item.name}
            </button>
          ))}
        </section>
      </div>
    </div>
  );
}
