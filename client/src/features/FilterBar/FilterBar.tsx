import "./FilterBar.scss";
import exitIcon from "../../assets/reject.png";
import binIcon from "../../assets/bin.png";
import { useBarDispatch } from "../../contexts/BarContext";
import { useBarStateValue } from "../../contexts/BarContext";
import PriceRangeSlider from "../PriceRangeSlider/PriceRangeSlider";

export default function FilterBar() {
  const { setBar } = useBarDispatch();
  const isExitingBar = useBarStateValue("isExitingBar");
  const handleReset = () => {};

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (isExitingBar && e.animationName === "reject-FilterBar") {
      setBar("showFilterBar", false);
      setBar("isExitingBar", false);
    }
  };
  return (
    <div
      onAnimationEnd={(e) => handleAnimationEnd(e)}
      className={`filter-container ${isExitingBar && "reject-FilterBar"}`}
    >
      <div className='filter-header'>
        <div className='filter-navigation'>
          <div onClick={() => setBar("isExitingBar", true)}>
            <img src={exitIcon} alt='Left arrow icon' />
            <p>Back</p>
          </div>
          <div onClick={handleReset}>
            <img src={binIcon} alt='bin icon' />
            <p>Clear</p>
          </div>
        </div>
        <hr className='filter-hr' />
      </div>
      <section className='filter-price-container'>
        <div className='price-header'>
          <span>Price</span>
          <span>-</span>
        </div>
        <PriceRangeSlider min={0} max={14499} step={30}  />
      </section>
    </div>
  );
}
