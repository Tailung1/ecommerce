import "./SearchBar.scss";
import { useMyContext } from "../../../MyContext";
import searchIcon from "../../../assets/search-icon.png";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const {
    popularSearches,
    setShowSearchBar,
    setIsExitingBar,
    isExitingBar,
  } = useMyContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const generateSlug = async (
    name: string,
    color: string,
    id: number
  ) => {
    const destName = name.replace(/\s+/g, "-");
    const slug = `${destName}-${color}-${id}`.toLowerCase();
    navigate(`/${slug}`);
  };
  const handleExit = () => {
    setIsExitingBar(true);
    setTimeout(() => {
      setShowSearchBar(false);
      setIsExitingBar(false);
    }, 600);
  };

  return (
    <div
      //   onClick={() => setShowSearchBar(true)}
      className='searchBar-container'
    >
      <div className='input-container'>
        <input
          className='input'
          ref={inputRef}
          placeholder='Search'
          type='text'
        />
        <img
          className='search-icon'
          src={searchIcon}
          alt='search icon'
        />
      </div>
      {!isExitingBar && (
        <div
          onClick={handleExit}
          className='popular-searches-container'
        >
          <p>Popular Searches:</p>

          <section className='popular-searches-wrapper'>
            {popularSearches.map((item) => (
              <p
                onClick={() => {
                  generateSlug(item.name, item.color, item.id);
                  setShowSearchBar(false);
                }}
                key={item.id}
              >
                {item.name}
              </p>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
