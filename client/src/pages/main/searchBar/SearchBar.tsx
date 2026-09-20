import "./SearchBar.scss";
import { useMyContext } from "../../../contexts/MyContext";
import searchIcon from "../../../assets/search-icon.png";
import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  useBarStateValue,
  useBarDispatch,
} from "../../../contexts/BarContext";

type SearchItem = {
  id: number;
  name: string;
  color: string;
};

type IndexedSearchItem = SearchItem & {
  normalizedName: string;
};

const generateSearchSlug = (
  name: string,
  color: string,
  id: number
): string => {
  const normalizedName = name.trim().replace(/\s+/g, "-");

  return `${normalizedName}-${color}-${id}`.toLowerCase();
};

const SearchBar = memo(function SearchBar() {
  const { popularSearches } = useMyContext();
  const isExiting = useBarStateValue("isExitingBar");
  const { setBar } = useBarDispatch();

  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  /**
   * Keep the input immediately responsive.
   *
   * React can defer the expensive filtering work when the list
   * becomes large, without making the input itself feel laggy.
   */
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /**
   * Normalize names only when popularSearches changes.
   *
   * Previously:
   *   item.name.toLowerCase()
   *
   * happened again for every item on every search.
   *
   * With this index, normalization happens once per data update.
   */
  const indexedSearches = useMemo<IndexedSearchItem[]>(() => {
    return popularSearches.map((item) => ({
      ...item,
      normalizedName: item.name.trim().toLowerCase(),
    }));
  }, [popularSearches]);

  const normalizedQuery = useMemo(() => {
    return deferredQuery.trim().toLowerCase();
  }, [deferredQuery]);

  const filteredSearches = useMemo<SearchItem[]>(() => {
    if (!normalizedQuery) {
      return popularSearches;
    }

    return indexedSearches
      .filter((item) => item.normalizedName.includes(normalizedQuery))
      .map(({ normalizedName: _normalizedName, ...item }) => item);
  }, [indexedSearches, normalizedQuery, popularSearches]);

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
    (item: SearchItem) => {
      setQuery("");

      navigate(generateSearchSlug(item.name, item.color, item.id));
    },
    [navigate]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    []
  );

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape") {
        setQuery("");
        return;
      }

      if (event.key !== "Enter" || filteredSearches.length === 0) {
        return;
      }

      handlePopularSearchClick(filteredSearches[0]);
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
    <div className="searchBar-container">
      <div className="input-container">
        <input
          className="input"
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Search"
          type="text"
          aria-label="Search"
          aria-controls="popular-searches"
          aria-expanded="true"
          autoComplete="off"
        />

        {hasQuery && (
          <button
            type="button"
            className="search-clear-button"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            ×
          </button>
        )}

        <img
          className="search-icon"
          src={searchIcon}
          alt=""
          aria-hidden="true"
        />
      </div>

      <div
        onAnimationEnd={handleAnimationEnd}
        className={`popular-searches-container ${popularSearchesClassName}`}
      >
        <p>{hasQuery ? "Search Results:" : "Popular Searches:"}</p>

        <section
          id="popular-searches"
          className="popular-searches-wrapper"
          aria-label={hasQuery ? "Search results" : "Popular searches"}
        >
          {filteredSearches.length > 0 ? (
            filteredSearches.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handlePopularSearchClick(item)}
              >
                {item.name}
              </button>
            ))
          ) : (
            <p className="no-search-results">
              No results for "{query}"
            </p>
          )}
        </section>
      </div>
    </div>
  );
});

export default SearchBar;
