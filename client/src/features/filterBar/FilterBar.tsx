import "./FilterBar.scss";
import exitIcon from "../../assets/reject.png";
import binIcon from "../../assets/bin.png";
import { useBarDispatch } from "../../contexts/BarContext";
import { useBarStateValue } from "../../contexts/BarContext";
import PriceRangeSlider from "../priceRangeSlider/PriceRangeSlider";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 2000;

export default function FilterBar() {
  const { setBar } = useBarDispatch();
  const isExitingBar = useBarStateValue("isExitingBar");

  const { t } = useTranslation();

  // Filter state lives here
  const [minValue, setMinValue] = useState(DEFAULT_MIN);
  const [maxValue, setMaxValue] = useState(DEFAULT_MAX);
  const [resetKey, setResetKey] = useState(0);

 const handleReset = () => {
   setMinValue(DEFAULT_MIN);
   setMaxValue(DEFAULT_MAX);
   setResetKey((prev) => prev + 1);
 };

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (isExitingBar && e.animationName === "reject-FilterBar") {
      setBar("showFilterBar", false);
      setBar("isExitingBar", false);
    }
  };

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
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
          <span>{t("price")}</span>
          <span>-</span>
        </div>

        <PriceRangeSlider
          min={DEFAULT_MIN}
          max={DEFAULT_MAX}
          step={10}
          minValue={minValue}
          maxValue={maxValue}
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
          resetKey={resetKey}
        />
      </section>
    </div>
  );
}
