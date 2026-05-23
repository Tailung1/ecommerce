import "./PriceRangeSlider.scss";
import { useEffect, useState, useRef } from "react";

export default function PriceRangeSlider({
  min = 0,
  max = 2000,
  step = 20,
}: {
  min: number;
  max: number;
  step: number;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);
  const [draggingTarget, setDraggingTarget] = useState<"min" | "max" | null>(null);

  const clmap = (percent: number) => Math.min(Math.max(percent, 0), 1);
  const snap = (value: number) => {
    let snapped = Math.round(value / step) * step;
    if (snapped > max) return max;
    return snapped;
  };

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();

    let percent = clmap((clientX - rect.left) / rect.width);

    let value = snap(percent * max);

    if (draggingTarget === "min") {
      if (value >= maxValue) {
        setMaxValue(value);
        setMinValue(maxValue);
        setDraggingTarget("max");
      } else {
        setMinValue(value);
      }
      setMinValue(value);
    } else if (draggingTarget === "max") {
      if (value <= minValue) {
        setMinValue(value);
        setMaxValue(minValue);
        setDraggingTarget("min");
      } else {
        setMaxValue(value);
      }
    }
  };

  useEffect(() => {
    if (draggingTarget === null) return;

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const stopDrag = () => setDraggingTarget(null);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDrag);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [draggingTarget]);

  const minPercent = (minValue / max) * 100;
  const maxPercent = (maxValue / max) * 100;

  return (
    <div ref={sliderRef} className='price-slider-container'>
      <div className='slider-track'></div>
      <div
        style={{ left: `${minPercent}%`, width: `${Math.abs(maxPercent - minPercent)}%` }}
        className='slider-range'
      ></div>
      <div style={{ left: `${minPercent}%` }} className='min-container handle-container'>
        <span>{minValue}</span>
        <div onMouseDown={() => setDraggingTarget("min")} className='handle'></div>
      </div>
      <div style={{ left: `${maxPercent}%` }} className='max-container handle-container'>
        <span>{maxValue}</span>
        <div onMouseDown={() => setDraggingTarget("max")} className='handle'></div>
      </div>
      <div className='slider-inputs-container '>
        <div>
          <span>MIN</span>
          <input value={minValue} type='text' />
        </div>
        <div>
          <span>MAX</span>
          <input value={maxValue} type='text' />
        </div>
      </div>
    </div>
  );
}
