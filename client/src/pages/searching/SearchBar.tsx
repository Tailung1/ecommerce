import { useMyContext } from "../../MyContext";
import searchIcon from "../assets/search-icon.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const { showSearchBar, popularSearches } = useMyContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [product, setProduct] = useState([]);
  const [showProduct, setShowProduct] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBar]);

  const getProduct = async (
    name: string,
    color: string,
    id: number
  ) => {
    const destName = name.replace(/\s+/g, "-");
    const slug = `${destName}-${color}-${id}`.toLowerCase();
    navigate(`/${slug}`);
  };

  return (
    <div className='search-input-container'>
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
        {!showProduct ? (
          <section className='popular-searches-wrapper'>
            {popularSearches.map((item) => (
              <p
                onClick={() => {
                  getProduct(item.name, item.color, item.id);
                  setShowProduct(true);
                }}
                key={item.id}
              >
                {item.name}
              </p>
            ))}
          </section>
        ) : (
          <div>
            <h1>{`your product:${product.name}`}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
