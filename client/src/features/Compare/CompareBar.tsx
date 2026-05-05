import searchIcon from "../../assets/search-icon.png";
import { useBarDispatch } from "../../contexts/BarContext";
import { useBarStateValue } from "../../contexts/BarContext";
import { useCompareDispatch } from "../../contexts/CompareContext";

export default function CompareBar() {
  const { setBar } = useBarDispatch();
  const isExitingBar = useBarStateValue("isExitingBar");
  const { addCompareProduct } = useCompareDispatch();

  const testProducts = [
    { id: 1, stock: 23, price: 331, name: "Laptop X", brand: "TechCorp", category: "phone" },
    {
      id: 2,
      name: "samsung tv-hd",
      price: 312,
      brand: "GizmoWorks",
      stock: 2,
      category: "tv",
    },

    {
      id: 3,
      name: "lenovo laptop",
      stock: 5,
      price: 392,
      brand: "SoundMax",
      category: "laptop",
    },
    {
      id: 4,
      price: 25,
      stock: 21,
      name: "Smartwatch A1",
      brand: "TimeTech",
      category: "phone",
    },
    {
      id: 5,
      stock: 3,
      price: 451,
      name: "Tablet Q",
      brand: "ScreenMakers",
      category: "tablet",
    },
  ];

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (isExitingBar && e.animationName === "BarOut") {
      setBar("showCompareBar", false);
      setBar("isExitingBar", false);
    }
  };

  return (
    <div
      onAnimationEnd={(e) => handleAnimationEnd(e)}
      className={`Bar bar-modifed-compare ${isExitingBar ? "ExitBar" : ""}`}
    >
      <p onClick={() => setBar("isExitingBar", true)} className='exit-btn exit-btn-compare'>
        X
      </p>
      <div className='relative w-full'>
        <img className='absolute top-4 left-4' src={searchIcon} alt='Search Icon' />

        <input
          placeholder='Search'
          className='w-full border-solid bg-slate-200 p-3 pl-11'
          type='text'
        />
      </div>
      {testProducts.map((prod) => (
        <div
          key={prod.id}
          onClick={() => {
            addCompareProduct(prod);
            setBar("isExitingBar",true)
          }}
        >
          {" "}
          <h1>name:{prod.name}</h1> <h3>brand:{prod.brand}</h3>{" "}
        </div>
      ))}
    </div>
  );
}
