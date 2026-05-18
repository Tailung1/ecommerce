import React, { useState, useRef, useEffect } from "react";
import "./PriceRangeSlider.scss";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step: number;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ min, max, step }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);
  const [isClickMove, setIsClickMove] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const snap = (value: number) => Math.round((value - min) / step) * step + min;

  const valueToPercent = (value: number) => {
    const percent = ((value - min) / (max - min)) * 100;
    return Math.min(Math.max(percent, 0), 100);
  };

  const handleMove = (clientX: number) => {
    if (!dragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let percent = (clientX - rect.left) / rect.width;
    percent = Math.min(Math.max(percent, 0), 1);
    let value = snap(percent * (max - min) + min);

    if (dragging === "min" && value > maxValue) {
      setMinValue(maxValue);
      setMaxValue(value);
      setDragging("max");
    } else if (dragging === "max" && value < minValue) {
      setMaxValue(minValue);
      setMinValue(value);
      setDragging("min");
    } else {
      if (dragging === "min") {
        setMinValue(value);
      } else {
        setMaxValue(value);
      }
    }
  };

  const startDrag = (handle: "min" | "max") => {
    setDragging(handle);
  };

  const stopDrag = () => {
    setDragging(null);
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
  }, [dragging, minValue, maxValue]);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
  const value = snap(percent * (max - min) + min);

    setIsClickMove(true);
    const distMin = Math.abs(value - minValue);
    const distMax = Math.abs(value - maxValue);

    if (distMin < distMax) {
      setMinValue(value);
    } else {
      setMaxValue(value);
    }

    setTimeout(() => setIsClickMove(false), 300);
  };

  const handleInput = (target: "min" | "max", value: number) => {
    if (isNaN(value)) return;
    if (target === "min") {
      const clamped = Math.min(Math.max(value, min), maxValue);
      setMinValue(clamped);
    } else {
      const clamped = Math.min(Math.max(value, minValue), max);
      setMaxValue(clamped);
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
            transition: !dragging ? "0.15s" : "",
          }}
        />
      </div>

      {/* MIN hanlde  */}
      <div
        className='slider-handle'
        onContextMenu={(e) => e.preventDefault()}
        style={{
          left: `${minPercent}%`,
          transition: isClickMove ? " 0.15s" : "none",
          zIndex: dragging === "min" ? 3 : 2,
        }}
        onMouseDown={() => startDrag("min")}
        onTouchStart={() => startDrag("min")}
      >
        <div className='slider-label'>{minValue}</div>
      </div>

      {/* MAX handle */}
      <div
        className='slider-handle'
        style={{
          left: `${maxPercent}%`,
          transition: isClickMove && dragging !== "max" ? "left 0.2s" : "none",
          zIndex: dragging === "max" ? 3 : 2,
        }}
        onMouseDown={() => startDrag("max")}
        onTouchStart={() => startDrag("max")}
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
            onChange={(e) => handleInput("min", Number(e.target.value))}
          />
        </div>

        <div>
          <span>MAX</span>
          <input
            type='text'
            value={maxValue}
            onChange={(e) => handleInput("max", Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
