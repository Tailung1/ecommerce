import "./SearchBar.scss";
import { useMyContext } from "../../../contexts/MyContext";
import searchIcon from "../../../assets/search-icon.png";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBarStateValue } from "../../../contexts/BarContext";
import { useBarDispatch } from "../../../contexts/BarContext";

export default function SearchBar() {
  const { popularSearches } = useMyContext();
  const isExiting = useBarStateValue("isExitingBar");
  const inputRef = useRef<HTMLInputElement>(null);
  const { setBar } = useBarDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // no need this logic for mobile !!!! new width traker !!! 12 april.
  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === "SearchBarOut") {
      setBar("showSearchBar", false);
      setBar("isExitingBar", false);
    }
  };

  const generateSlug =  (name: string, color: string, id: number) => {
    const destName = name.replace(/\s+/g, "-");
    const slug = `${destName}-${color}-${id}`.toLowerCase();
    navigate(`/${slug}`);
  };

  return (
    <div className='searchBar-container'>
      <div className='input-container'>
        <input className='input' ref={inputRef} placeholder='Search' type='text' />
        <img className='search-icon' src={searchIcon} alt='search icon' />
      </div>

      <div
        onAnimationEnd={(e) => handleAnimationEnd(e)}
        className={`popular-searches-container  ${
          isExiting ? "popular-searches-containerOUT" : "popular-searches-containerIN"
        }`}
      >
        <p>Popular Searches:</p>

        <section className='popular-searches-wrapper '>
          {popularSearches.map((item) => (
            <p
              onClick={() => {
                generateSlug(item.name, item.color, item.id);
              }}
              key={item.id}
            >
              {item.name}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
}
