import React, { useState, useRef, useEffect } from "react";
import "./t.scss";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step: number;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ min, max, step }) => {
  const [minValue, setMinValue] = useState(min);
//   const [inputMinValue, setInputMinValue] = useState(max);
//   const [inputMaxValue, setInputMaxValue] = useState(max);
  const [maxValue, setMaxValue] = useState(max);
  const [draggingTarget, setDraggingTarget] = useState<"min" | "max" | null>(null);
  const [activeHandle, setActiveHandle] = useState<"min" | "max" | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const clamp = (value: number, minClamp: number, maxClamp: number) =>
    Math.min(Math.max(value, minClamp), maxClamp);

  const snap = (value: number) => Math.round((value - min) / step) * step + min;

  const valueToPercent = (value: number) => clamp(((value - min) / (max - min)) * 100, 0, 100);

  // ---------- Dragging ----------
  const handleMove = (clientX: number) => {
    if (!draggingTarget || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let percent = clamp((clientX - rect.left) / rect.width, 0, 1);
    let value = snap(percent * (max - min) + min);
    

    if (draggingTarget === "min") {
      if (value > maxValue) {
        // Swap handles
        setDraggingTarget("max");
        setActiveHandle("max");
        setMaxValue(value);
      } else {
        setMinValue(value);
      }
    } else if (draggingTarget === "max") {
      if (value < minValue) {
        // Swap handles
        setDraggingTarget("min");
        setActiveHandle("min");
        setMinValue(value);
      } else {
        setMaxValue(value);
      }
    }
  };

  const startDrag = (handle: "min" | "max") => {
    setDraggingTarget(handle);
    setActiveHandle(handle);
    setIsMouseDown(true);
  };

  const stopDrag = () => {
    setDraggingTarget(null);
    setIsMouseDown(false);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onEnd = () => stopDrag();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [draggingTarget, minValue, maxValue]);

  // ---------- Track click ----------
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const value = snap(percent * (max - min) + min);

    const distMin = Math.abs(value - minValue);
    const distMax = Math.abs(value - maxValue);

    if (distMin < distMax) setMinValue(value);
    else setMaxValue(value);
  };

  // ---------- Input ----------
  const handleInput = (target: "min" | "max", valueStr: string) => {
    if (valueStr.trim() === "") return;
    const value = Number(valueStr);
    if (isNaN(value)) return;

    if (target === "min") setMinValue(value);
    else setMaxValue(value);
  };

  // ---------- Keyboard ----------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, handle: "min" | "max") => {
    e.preventDefault();
    let delta = 0;
    if (e.key === "ArrowLeft") delta = -step;
    if (e.key === "ArrowRight") delta = step;
    if (!delta) return;

    if (handle === "min") {
      const newValue = minValue + delta;
      if (newValue >= maxValue) {
        // Swap handles
        setMinValue(maxValue); // freeze old min
        setMaxValue(newValue); // move max
        setActiveHandle("max"); // halo follows new active handle
      } else {
        setMinValue(newValue);
        setActiveHandle("min");
      }
    } else {
      const newValue = maxValue + delta;
      if (newValue <= minValue) {
        // Swap handles
        setMaxValue(minValue); // freeze old max
        setMinValue(newValue); // move min
        setActiveHandle("min"); // halo follows new active handle
      } else {
        setMaxValue(newValue);
        setActiveHandle("max");
      }
    }
  };
  const minPercent = valueToPercent(minValue);
  const maxPercent = valueToPercent(maxValue);

  return (
    <div ref={sliderRef} className='price-slider-container'>
      <div className='slider-track' onClick={handleTrackClick}>
        <div
          className='slider-range'
          style={{
            left: `${Math.min(minPercent, maxPercent)}%`,
            width: `${Math.abs(maxPercent - minPercent)}%`,
            transition: draggingTarget ? "none" : "left 0.2s, width 0.2s",
          }}
        />
      </div>

      {/* MIN handle */}
      <div
        className={`slider-handle ${activeHandle === "min" ? "active" : ""} ${
          isMouseDown && draggingTarget === "min" ? "draggingTarget" : ""
        }`}
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, "min")}
        onMouseDown={() => startDrag("min")}
        onTouchStart={() => startDrag("min")}
        style={{
          left: `${minPercent}%`,
          transition: draggingTarget === "min" ? "none" : "left 0.2s",
        }}
        onMouseEnter={() => setActiveHandle("min")}
        onMouseLeave={() => setActiveHandle(draggingTarget === "min" ? "min" : null)}
        onBlur={() => setActiveHandle(null)}
      >
        <div className='slider-label'>{minValue}</div>
      </div>

      {/* MAX handle */}
      <div
        className={`slider-handle ${activeHandle === "max" ? "active" : ""} ${
          isMouseDown && draggingTarget === "max" ? "dragging" : ""
        }`}
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, "max")}
        onMouseDown={() => startDrag("max")}
        onTouchStart={() => startDrag("max")}
        style={{
          left: `${maxPercent}%`,
          transition: draggingTarget === "max" ? "none" : "left 0.2s",
        }}
        onFocus={() => setActiveHandle("max")}
        onBlur={() => setActiveHandle(null)}
      >
        <div className='slider-label'>{maxValue}</div>
      </div>

      {/* INPUT BOXES */}
      <div className='min-max-price-container mt-[200px]'>
        <div>
          <span>MIN</span>
          <input
            type='text'
            value={minValue}
            onChange={(e) => handleInput("min", e.target.value)}
          />
        </div>

        <div>
          <span>MAX</span>
          <input
            type='text'
            value={maxValue}
            onChange={(e) => handleInput("max", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
