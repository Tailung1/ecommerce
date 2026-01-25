import { useMyContext } from "../MyContext";
import searchIcon from "../assets/search-icon.png";
import { useEffect, useRef } from "react";

export default function SearchBar() {
  const { showSearchBar } = useMyContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBar]);

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
          <p>iPhone 15 Pro Max</p>
          <p>MacBook Air M2</p>
          <p>Samsung Galaxy Z Fold 5</p>
          <p>Google Pixel 8</p>
          <p>PlayStation 5</p>
          <p>Apple Watch Ultra</p>
          <p>Samsung Galaxy S23</p>
          <p>Nintendo Switch OLED</p>
        </section>
      </div>
    </div>
  );
}
