import { useState } from "react";
import { useMyContext } from "../MyContext";
import SearchBar from "./searching/SearchBar";

export default function Main() {
  const { showSearchBar } = useMyContext();

  const [highlights, setHighlights] = useState([
    { name: "iPhone 17 Pro | Pro Max" },
    { name: "Computers" },
    { name: "ONEPLUS 15R" },
    { name: "Samsung 21s" },
  ]);

  return (
    <div>
      {!showSearchBar ? (
        <div>
          <section className='hightlights-wrapper'>
            {highlights.map((h, index) => (
              <div key={index}>
                <p>{h.name}</p>
              </div>
            ))}
          </section>
        </div>
      ) : (
        <SearchBar />
      )}
    </div>
  );
}
