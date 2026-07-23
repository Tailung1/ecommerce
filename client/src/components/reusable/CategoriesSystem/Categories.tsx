import "./Categories.scss";
import { useMyContext } from "../../../contexts/MyContext";
// import mobilePhone from "../../../assets/mobile-phone.png";
import tablet from "../../../assets/tablet.png";
// import laptop from "../../../assets/laptop.png";
// import consoleIcon from "../../../assets/console.png";
// import television from "../../../assets/television.png";
// import smartHome from "../../../assets/smart-home.png";
import { useEffect } from "react";
import { useCategories } from "../../../hooks/useCategories";
import type { category } from "./categories.types";

export default function Categories() {
  const { activeCategory, setActiveCategory, resolution } = useMyContext();
  const { data } = useCategories();
  useEffect(() => {
    if (resolution.isPc) setActiveCategory("");
  }, [resolution.isPc]);
  return (
    <section className='categories-wrapper'>
      {data?.map((cat: category) => (
        <div
          key={cat.id}
          className={`${
            activeCategory === String(cat.id) ? "active-category category-animate" : ""
          } category`}
          onClick={() => setActiveCategory(String(cat.id))}
          onMouseEnter={resolution.isPc ? () => setActiveCategory(String(cat.id)) : undefined}
          onMouseLeave={resolution.isPc ? () => setActiveCategory("") : undefined}
        >
          <img src={tablet} alt={`${cat.id} icon`} />
          <div className={`${cat.name.length > 1 && cat.id}`}>
            {data?.map((cat: category) => (
              <p key={cat.id}>{cat.name}</p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
