import "./PriceRangeSlider.scss";
import { useEffect, useState, useRef } from "react";

export default function PriceRangeSlider({
  min,
  max,
  step,
}: {
  min: number;
  max: number;
  step: number;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(5000);
  const [draggingTarget, setTarggingTarget] = useState<"min" | "max" | null>(null);

  const handleMove = (clientX: number) => {
    if (!draggingTarget || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let percent = clientX - rect.left;
    console.log(percent);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    window.addEventListener("mousemove", handleMouseMove);
  }, [draggingTarget]);

  const minPercent = 0;
  const maxPercent = 100;

  return (
    <div ref={sliderRef} className='price-slider-container'>
      <div className='slider-track'></div>
      <div className='slider-range'></div>
      <div style={{ left: `${minPercent}%` }} className='min-container handle-container'>
        <span>{minValue}</span>
        <div onMouseDown={() => setTarggingTarget("min")} className='handle'></div>
      </div>
      <div style={{ left: `${maxPercent}%` }} className='max-container handle-container'>
        <span>{maxValue}</span>
        <div onMouseDown={() => setTarggingTarget("max")} className='handle'></div>
      </div>
    </div>
  );
}
