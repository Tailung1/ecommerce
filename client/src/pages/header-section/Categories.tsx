import { useMyContext } from "../../MyContext";
import mobilePhone from "../../assets/mobile-phone.png";
import tablet from "../../assets/tablet.png";
import laptop from "../../assets/laptop.png";
import consoleIcon from "../../assets/console.png";
import television from "../../assets/television.png";
import smartHome from "../../assets/smart-home.png";

export default function Categories() {
  const { activeCategory, setActiveCategory } = useMyContext();



  const categories = [
    {
      id: "mobile-phones",
      label: ["Mobile", "Phones"],
      icon: mobilePhone,
    },
    { id: "tablets", label: ["Tabs"], icon: tablet },
    { id: "laptops", label: ["Laptops"], icon: laptop },
    { id: "consoles", label: ["Gaming"], icon: consoleIcon },
    { id: "televisions", label: ["TV"], icon: television },
    {
      id: "smart-home",
      label: ["Smart", "Home"],
      icon: smartHome,
    },
  ];
  return (
    <section className='categories-wrapper'>
      {categories.map((cat) => (
        <div
          key={cat.id}
          className={`${
            activeCategory === cat.id
              ? "active-category category-animate"
              : "offline-category"
          } category`}
          onClick={() => setActiveCategory(cat.id)}
        >
          <img src={cat.icon} alt={`${cat.id} icon`} />
          <div className={`${cat.label.length > 1 && cat.id}`}>
            {cat.label.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
