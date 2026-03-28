import { useMyContext } from "../MyContext";
import serachIcon from "../assets/search-icon.png";

export default function CompareBar() {
  const {
    isExitingBar,
    setIsExitingBar,
    setShowCompareBar,
    setSelectedProductsToCompare,
  } = useMyContext();

  const testProducts = [
    { id: 1, name: "Laptop X", brand: "TechCorp" },
    { id: 2, name: "Smartphone Z", brand: "GizmoWorks" },
    { id: 3, name: "Headphones Pro", brand: "SoundMax" },
    { id: 4, name: "Smartwatch A1", brand: "TimeTech" },
    { id: 5, name: "Tablet Q", brand: "ScreenMakers" },
  ];
  const handleExit = () => {
    setIsExitingBar(true);
    setTimeout(() => {
      setShowCompareBar(false);
      setIsExitingBar(false);
    }, 500);
  };
  const insertProductInCompareList = (id: number) => {
    let product = testProducts.find((item) => item.id === id) || null;
    if (product) {
      setSelectedProductsToCompare((prev) => {
        const newArr = [...prev];
        const index = newArr.indexOf(null);
        newArr[index] = product;
        return newArr;
      });
    }
  };
  return (
    <div className={`Bar bar-modifed-compare ${isExitingBar && "ExitBar"}`}>
      <p onClick={handleExit} className='exit-btn exit-btn-compare'>
        X
      </p>
      <div className='relative w-full'>
        <img
          className='absolute top-4 left-4'
          src={serachIcon}
          alt='Search Icon'
        />

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
            insertProductInCompareList(prod.id);
            handleExit();
          }}
        >
          {" "}
          <h1>name:{prod.name}</h1> <h3>brand:{prod.brand}</h3>{" "}
        </div>
      ))}
    </div>
  );
}
