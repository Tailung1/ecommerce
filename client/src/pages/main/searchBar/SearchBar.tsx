import "./SearchBar.scss";
import { useMyContext } from "../../../contexts/MyContext";
import searchIcon from "../../../assets/search-icon.png";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBarStateValue, useBarDispatch } from "../../../contexts/BarContext";

const generateSearchSlug = (name: string, color: string, id: number) => {
  const normalizedName = name.trim().replace(/\s+/g, "-");

  return `${normalizedName}-${color}-${id}`.toLowerCase();
};

export default function SearchBar() {
  const { popularSearches } = useMyContext();
  const isExiting = useBarStateValue("isExitingBar");
  const { setBar } = useBarDispatch();

  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      if (event.animationName !== "SearchBarOut") {
        return;
      }

      setBar("showSearchBar", false);
      setBar("isExitingBar", false);
    },
    [setBar]
  );

  const handlePopularSearchClick = useCallback(
    (name: string, color: string, id: number) => {
      setQuery("");
      navigate(`/${generateSearchSlug(name, color, id)}`);
    },
    [navigate]
  );

  const filteredSearches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return popularSearches;
    }

    return popularSearches.filter((item) => item.name.toLowerCase().includes(normalizedQuery));
  }, [popularSearches, query]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape") {
        setQuery("");
        return;
      }

      if (event.key !== "Enter" || filteredSearches.length === 0) {
        return;
      }

      const firstResult = filteredSearches[0];

      handlePopularSearchClick(firstResult.name, firstResult.color, firstResult.id);
    },
    [filteredSearches, handlePopularSearchClick]
  );

  const handleClearSearch = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  const popularSearchesClassName = isExiting
    ? "popular-searches-containerOUT"
    : "popular-searches-containerIN";

  const hasQuery = query.trim().length > 0;

  return (
    <div className='searchBar-container'>
      <div className='input-container'>
        <input
          className='input'
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder='Search'
          type='text'
          aria-label='Search'
          aria-controls='popular-searches'
          aria-expanded='true'
          autoComplete='off'
        />

        {hasQuery && (
          <button
            type='button'
            className='search-clear-button'
            onClick={handleClearSearch}
            aria-label='Clear search'
          >
            ×
          </button>
        )}

        <img className='search-icon' src={searchIcon} alt='' aria-hidden='true' />
      </div>

      <div
        onAnimationEnd={handleAnimationEnd}
        className={`popular-searches-container ${popularSearchesClassName}`}
      >
        <p>{hasQuery ? "Search Results:" : "Popular Searches:"}</p>

        <section
          id='popular-searches'
          className='popular-searches-wrapper'
          aria-label={hasQuery ? "Search results" : "Popular searches"}
        >
          {filteredSearches.length > 0 ? (
            filteredSearches.map((item) => (
              <button
                key={item.id}
                type='button'
                onClick={() => handlePopularSearchClick(item.name, item.color, item.id)}
              >
                {item.name}
              </button>
            ))
          ) : (
            <p className='no-search-results'>No results for "{query}"</p>
          )}
        </section>
      </div>
    </div>
  );
}
