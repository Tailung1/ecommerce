import { useMyContext } from "../../../MyContext";
import searchIcon from "../../../assets/search-icon.png";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const { showSearchBar, popularSearches } = useMyContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBar]);

  const generateSlug = async (
    name: string,
    color: string,
    id: number
  ) => {
    const destName = name.replace(/\s+/g, "-");
    const slug = `${destName}-${color}-${id}`.toLowerCase();
    navigate(`/${slug}`);
  };

  return (
    <div className=''>
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
