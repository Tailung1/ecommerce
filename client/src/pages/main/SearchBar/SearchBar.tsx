import "./SearchBar.scss";
import { useMyContext } from "../../../contexts/MyContext";
import searchIcon from "../../../assets/search-icon.png";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const { popularSearches, setShowSearchBar, setIsExitingBar } =
    useMyContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // no need this logic for mobile !!!! new width traker !!! 12 april.
  const handleExit = () => {
    let isPc = window.innerWidth >= 1024;
    if (isPc) {
      setIsExitingBar(true);
      setShowSearchBar(false);
      setTimeout(() => {
        setIsExitingBar(false);
      }, 600);
    } else {
      setShowSearchBar(false);
    }
  };

  const generateSlug = async (
    name: string,
    color: string,
    id: number
  ) => {
    handleExit();
    const destName = name.replace(/\s+/g, "-");
    const slug = `${destName}-${color}-${id}`.toLowerCase();
    navigate(`/${slug}`);
  };

  return (
    <div className='searchBar-container'>
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

      <div className='popular-searches-container'>
        <p>Popular Searches:</p>

        <section className='popular-searches-wrapper'>
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
