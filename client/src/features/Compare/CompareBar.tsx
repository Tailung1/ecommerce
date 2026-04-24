
import { useMyContext } from "../../MyContext";
import searchIcon from "../../assets/search-icon.png";
import { useBarContext } from "../../contexts/BarContext";

export default function CompareBar() {
  const { BarState, BarDispatch } = useBarContext();
  const { compareCart, setCompareCart, setActiveProductCategory } = useMyContext();

  const testProducts = [
    { id: 1, name: "Laptop X", brand: "TechCorp", category: "phone" },
    {
      id: 2,
      name: "samsung tv-hd",
      brand: "GizmoWorks",
      category: "tv",
    },
    {
      id: 3,
      name: "lenovo laptop",
      brand: "SoundMax",
      category: "laptop",
    },
    {
      id: 4,
      name: "Smartwatch A1",
      brand: "TimeTech",
      category: "phone",
    },
    {
      id: 5,
      name: "Tablet Q",
      brand: "ScreenMakers",
      category: "tablet",
    },
  ];

  const handleAnimationEnd = (e:React.SyntheticEvent) => {
    if (BarState.isExitingBar && e.animationName === "BarOut") {
      BarDispatch({ type: "SET", key: "showCompareBar", value: false });
      BarDispatch({ type: "SET", key: "isExitingBar", value: false });
    }
  };

  const insertProductInCompareList = (item: any) => {
    // category check doesnot work here well.. testing phase !!!
    if (compareCart.every((item) => item === null)) {
      setActiveProductCategory(item.category);
    }
    let product = testProducts.find((i) => i.id === item.id) || null;
    if (product) {
      setCompareCart((prev) => {
        const newArr = [...prev];
        const index = newArr.indexOf(null);
        newArr[index] = product;
        return newArr;
      });
    }
    BarDispatch({ type: "SET", key: "isExitingBar", value: true });
  };

  return (
    <div
      onAnimationEnd={(e) => handleAnimationEnd(e)}
      className={`Bar bar-modifed-compare ${BarState.isExitingBar ? "ExitBar" : ""}`}
    >
      <p
        onClick={() => BarDispatch({ type: "SET", key: "isExitingBar", value: true })}
        className='exit-btn exit-btn-compare'
      >
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
            insertProductInCompareList(prod);
          }}
        >
          {" "}
          <h1>name:{prod.name}</h1> <h3>brand:{prod.brand}</h3>{" "}
        </div>
      ))}
    </div>
  );
}
