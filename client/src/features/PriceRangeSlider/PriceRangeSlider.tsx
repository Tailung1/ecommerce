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
  const [dragValue, setDragValue] = useState<number | null>(null);
  const [isClickMove, setIsClickMove] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  // -----------------------------
  // UTILS
  // -----------------------------
  const snap = (value: number) => Math.round((value - min) / step) * step + min;

  const clamp = (value: number) => Math.min(Math.max(value, min), max);

  const valueToPercent = (value: number) => ((value - min) / (max - min)) * 100;

  // -----------------------------
  // DRAG LOGIC
  // -----------------------------
  const handleMove = (clientX: number) => {
    if (!dragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let percent = (clientX - rect.left) / rect.width;
    percent = Math.min(Math.max(percent, 0), 1);
    let value = snap(percent * (max - min) + min);
    value = clamp(value);
    console.log(value)
    setDragValue(value);

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
    setDragValue(handle === "min" ? minValue : maxValue);
  };

  const stopDrag = () => {
    setDragging(null);
    setDragValue(null);
  };

  // -----------------------------
  // MOUSE / TOUCH EVENTS
  // -----------------------------
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

  // -----------------------------
  // TRACK CLICK
  // -----------------------------
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const value = snap(percent * max);

    setIsClickMove(true);

    const distMin = Math.abs(value - minValue);
    const distMax = Math.abs(value - maxValue);

    if (distMin < distMax) {
      if (value > maxValue) {
        setMinValue(maxValue);
        setMaxValue(value);
      } else {
        setMinValue(value);
      }
    } else {
      if (value < minValue) {
        setMaxValue(minValue);
        setMinValue(value);
      } else {
        setMaxValue(value);
      }
    }

    setTimeout(() => setIsClickMove(false), 300);
  };

  // -----------------------------
  // INPUT HANDLING
  // -----------------------------
  const handleMinCommit = () => {
    let value = clamp(minValue);
    value = snap(value);
    if (value > maxValue) {
      setMinValue(maxValue);
      setMaxValue(value);
    } else {
      setMinValue(value);
    }
  };

  const handleMaxCommit = () => {
    let value = clamp(maxValue);
    value = snap(value);
    if (value < minValue) {
      setMaxValue(minValue);
      setMinValue(value);
    } else {
      setMaxValue(value);
    }
  };

  // -----------------------------
  // HANDLE POSITIONS
  // -----------------------------
  const minPercent =
    dragging === "min" && dragValue !== null ? valueToPercent(dragValue) : valueToPercent(minValue);

  const maxPercent =
    dragging === "max" && dragValue !== null ? valueToPercent(dragValue) : valueToPercent(maxValue);

  return (
    <div ref={sliderRef} className='price-slider-container'>
      <div className='slider-track' onClick={handleTrackClick}>
        <div
          className='slider-range'
          style={{
            left: `${Math.min(minPercent, maxPercent)}%`,
            width: `${Math.abs(maxPercent - minPercent)}%`,
          }}
        />
      </div>

      {/* MIN HANDLE */}
      <div
        className='slider-handle'
        style={{
          left: `${minPercent}%`,
          transition: isClickMove && dragging !== "min" ? "left 0.3s" : "none",
          zIndex: dragging === "min" ? 3 : 2,
        }}
        onMouseDown={() => startDrag("min")}
        onTouchStart={() => startDrag("min")}
      >
        <div className='slider-label'>{minValue}</div>
      </div>

      {/* MAX HANDLE */}
      <div
        className='slider-handle'
        style={{
          left: `${maxPercent}%`,
          transition: isClickMove && dragging !== "max" ? "left 0.3s" : "none",
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
            onChange={(e) => setMinValue(Number(e.target.value))}
            onBlur={handleMinCommit}
            onKeyDown={(e) => e.key === "Enter" && handleMinCommit()}
          />
        </div>

        <div>
          <span>MAX</span>
          <input
            type='text'
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            onBlur={handleMaxCommit}
            onKeyDown={(e) => e.key === "Enter" && handleMaxCommit()}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
