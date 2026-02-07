import { useMyContext } from "../MyContext";
import searchIcon from "../assets/search-icon.png";
import { useEffect, useRef } from "react";

export default function SearchBar() {
  const { showSideBar, showSearchBar, popularSearches } =
    useMyContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBar, showSideBar]);

  return (
    <div className='searach-input-container'>
      <div className='input-container'>
        <input
          className='input'
          ref={inputRef}
          placeholder='Search'
          type='text'
        />
        <img
          className='serach-icon'
          src={searchIcon}
          alt='search icon'
        />
      </div>
      <div className='popular-searches-container'>
        <p>Popular Searches:</p>
        <section className='popular-searches-wrapper'>
          {popularSearches.map((item) => (
            <p key={Math.random() * Math.random()}>{item.name}</p>
          ))}
        </section>
      </div>
    </div>
  );
}
