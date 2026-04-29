import "./Compare.scss";
import "../../css/reusable/bar.scss";
import { useMyContext } from "../../contexts/MyContext";
import { useNavigate } from "react-router-dom";
import leftArrowIcon from "../../assets/left-arrow.png";
import plusIcon from "../../assets/plus.png";
import binIcon from "../../assets/bin.png";
import searchIcon from "../../assets/search-icon.png";
import rejectIcon from "../../assets/reject.png";
import { useBarDispatch } from "../../contexts/BarContext";
import { useBarStateValue } from "../../contexts/BarContext";

export default function Compare() {
  const navigate = useNavigate();
  const { setBar } = useBarDispatch();
  const showCompareBar = useBarStateValue("isExitingBar");
  const { setActiveProductCategory, compareCart, setCompareCart } = useMyContext();

  const handleReset = () => {
    const hasAnyProduct = compareCart.some((item) => item !== null);
    if (!hasAnyProduct) return;
    setCompareCart([null, null, null, null]);
    setActiveProductCategory("");
  };

  const handleBarOpen = (id: number) => {
    if (!compareCart.includes(null)) {
      return;
    }
    if (id && compareCart.some((item) => item?.id === id)) return;

    setBar("showCompareBar", true);
  };

  const handleReject = (id: number) => {
    setCompareCart((prev) => {
      const filtred = prev.filter((_, index) => index !== Number(id));
      if (filtred.every((item) => item === null)) {
        setActiveProductCategory("");
      }
      //   while (filtred.length < prev.length) {
      //     filtred.push(null);
      //   }
      return [...filtred, ...Array(prev.length - filtred.length).fill(null)];
    });
  };

  const allowCompare = compareCart.filter((item) => item !== null).length < 2;

  return (
    <div className={`compare-container ${showCompareBar && "animate-compare-container"}`}>
      <div className='compare-header'>
        <div className='compare-navigation'>
          <div onClick={() => navigate("/")}>
            <img src={leftArrowIcon} alt='Left arrow icon' />
            <p>Back</p>
          </div>
          <div onClick={handleReset}>
            <img src={binIcon} alt='bin icon' />
            <p>Clear</p>
          </div>
        </div>
        <hr className='compare-hr' />
      </div>
      <section className='compare-products-parent'>
        {compareCart.map((prod, index) => (
          <div
            key={Math.random() * 2372}
            onClick={() => handleBarOpen(prod?.id as number)}
            className='selected-to-compare-product-container'
          >
            {!prod ? (
              <div className='select-to-compare-product-container'>
                <img src={plusIcon} alt='Plus icon' />
                <span>Select product</span>
              </div>
            ) : (
              <div className='flex gap-5'>
                <h1>name:{prod.name}</h1>{" "}
              </div>
            )}
            <img
              onClick={() => prod && handleReject(index)}
              src={prod ? rejectIcon : searchIcon}
              alt='Search icon'
            />
          </div>
        ))}
      </section>
      <button
        className={`${
          allowCompare && "opacity-65 pointer-events-none"
        } bg-orange-400 text-white p-3 rounded-lg w-full items-center`}
      >
        Compare
      </button>
    </div>
  );
}
