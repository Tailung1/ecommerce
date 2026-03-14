import { useMyContext } from "../MyContext";
import serachIcon from "../assets/search-icon.png";

export default function CompareBar() {
  const {
    isExitingBar,
    setIsExitingBar,
    setShowCompareBar,
    setSelectedProductsToCompare,
    compareIndex,
  } = useMyContext();
  const testProducts = [
    { id: "1", name: "Laptop X", brand: "TechCorp" },
    { id: "2", name: "Smartphone Z", brand: "GizmoWorks" },
    { id: "3", name: "Headphones Pro", brand: "SoundMax" },
    { id: "4", name: "Smartwatch A1", brand: "TimeTech" },
    { id: "5", name: "Tablet Q", brand: "ScreenMakers" },
  ];
  const handleExit = () => {
    console.log("hi");
    setIsExitingBar(true);
    setTimeout(() => {
      setShowCompareBar(false);
      setIsExitingBar(false);
    }, 500);
  };
  const findProduct = (id: string) => {
    let product = testProducts.find((item) => item.id === id);
    if (product) {
      setSelectedProductsToCompare(
        (prev) =>
          prev.map((item, index) =>
            index === compareIndex ? product : item
          ) as (ProductType | null)[]
      );
    }
  };
  return (
    <div
      className={`Bar Bar-Modifed ${isExitingBar && "ExitBar"}   `}
    >
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
            findProduct(prod.id);
            handleExit;
          }}
        >
          {" "}
          <h1>name:{prod.name}</h1> <h3>brand:{prod.brand}</h3>{" "}
        </div>
      ))}
    </div>
  );
}
