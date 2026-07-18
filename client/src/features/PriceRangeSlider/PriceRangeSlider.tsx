import "./PriceRangeSlider.scss";
import lariSign from "../../assets/lari-sign.png";
import { useEffect, useState, useRef } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function PriceRangeSlider({
  min = 0,
  max = 2000,
  step = 10,
}: {
  min: number;
  max: number;
  step: number;
}) {
  const width = useWindowWidth();
  const isPC = width > 1023;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);
  const [minInput, setMinInput] = useState<number>(min);
  const [maxInput, setMaxInput] = useState<number>(max);

  const [draggingTarget, setDraggingTarget] = useState<"MIN" | "MAX" | null>(null);

  const clamp = (value: number, minBound: number, maxBound: number) =>
    Math.min(Math.max(value, minBound), maxBound);

  const snap = (value: number) => {
    let snapped = Math.round(value / step) * step;
    if (snapped > max) return max;
    return snapped;
  };

  const positionToValue = (clientX: number) => {
    if (!sliderRef.current) return min;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = clamp((clientX - rect.left) / rect.width, 0, 1);
    const value = snap(percent * max);
    return value;
  };

  const handleMove = (clientX: number) => {
    let value = positionToValue(clientX);

    if (draggingTarget === "MIN") {
      if (value >= maxValue) {
        setMinValue(maxValue);
        setMaxValue(value);
        setMinInput(maxValue);
        setMaxInput(value);
        setDraggingTarget("MAX");
      } else {
        setMinValue(value);
        setMinInput(value);
      }
    } else if (draggingTarget === "MAX") {
      if (value <= minValue) {
        setMaxValue(minValue);
        setMinValue(value);
        setMinInput(value);
        setMaxInput(maxValue);
        setDraggingTarget("MIN");
      } else {
        setMaxValue(value);
        setMaxInput(value);
      }
    }
  };

  const startDrag = (target: "MIN" | "MAX") => {
    setDraggingTarget(target);
  };
  const endDrag = () => {
    setDraggingTarget(null);
  };

  useEffect(() => {
    if (draggingTarget === null) return;

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onEnd = () => setDraggingTarget(null);

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
  }, [draggingTarget]);

  // Click
  const handleClickToMove = (e: React.MouseEvent<HTMLDivElement>) => {
    let value = positionToValue(e.clientX);

    let distMin = Math.abs(value - minValue);
    let distMax = Math.abs(value - maxValue);

    if (distMin > distMax) {
      setMaxValue(value);
      setMaxInput(value);
    } else {
      setMinValue(value);
      setMinInput(value);
    }
  };

  const handleInputChange = (target: "MIN" | "MAX", rawValue: number) => {
    if (target === "MIN") {
      setMinInput(rawValue);
    } else {
      setMaxInput(rawValue);
    }
    if (maxValue < minValue) return;
    let nextMin = minValue;
    let nextMax = maxValue;

    const clamped = clamp(rawValue, min, max);

    if (target === "MIN") {
      if (maxInput < max && maxValue >= max && clamped >= max) {
        return;
      } else if (maxInput < max && maxValue >= max && clamped < max) {
        nextMin = clamped;
        nextMax = minValue;
      } else if (clamped > maxValue) {
        nextMin = maxValue;
        nextMax = clamped;
      } else {
        nextMin = clamped;
      }
    }

    if (target === "MAX") {
      if (minInput > minValue) {
        if (clamped <= minValue) {
          nextMin = clamped;
        } else if (clamped > minValue) {
          if (clamped <= maxValue) {
            nextMin = clamped;
          } else if (clamped > maxValue) {
            nextMin = maxValue;
            nextMax = clamped;
          }
        }
      } else if (clamped <= minValue) {
        nextMin = clamped;
        nextMax = minValue;
      } else {
        nextMax = clamped;
      }
    }
    setMinValue(nextMin);
    setMaxValue(nextMax);
  };

  const minPercent = (minValue / max) * 100;
  const maxPercent = (maxValue / max) * 100;

  return (
    <div className='price-slider-container'>
      <div ref={sliderRef} onClick={handleClickToMove} className='slider-track'>
        <div
          style={{
            left: `${minPercent}%`,
            width: `${Math.abs(maxPercent - minPercent)}%`,
            transition: !draggingTarget ? " 0.15s" : "",
          }}
          className='slider-range'
        ></div>

        <div
          style={{ left: `${minPercent}%`, transition: !draggingTarget ? "0.15s" : "" }}
          className='min-container handle-container'
        >
          <div className='handle-wrapper'>
            <div className={`handle-price-styles ${isPC ? "above" : "below"}`}>
              <span>{minValue}</span>
              <img className='lari-sign' src={lariSign} alt='Lari sign' />
            </div>
            <div
              onTouchStart={() => startDrag("MIN")}
              onMouseDown={() => setDraggingTarget("MIN")}
              onTouchEnd={endDrag}
              className='handle'
            ></div>
          </div>
        </div>

        <div
          style={{ left: `${maxPercent}%`, transition: !draggingTarget ? "0.15s" : "" }}
          className='max-container handle-container'
        >
          <div className='handle-wrapper'>
            <div className={`handle-price-styles ${isPC ? "above" : "below"}`}>
              <span>{maxValue}</span>
              <img className='lari-sign' src={lariSign} alt='Lari sign' />
            </div>
            <div
              onTouchStart={() => startDrag("MAX")}
              onMouseDown={() => setDraggingTarget("MAX")}
              onTouchEnd={endDrag}
              className='handle'
            ></div>
          </div>
        </div>
      </div>
      <div className='slider-inputs-container'>
        <div>
          <span>MIN:</span>
          <div>
            <input
              onChange={(e) => handleInputChange("MIN", Number(e.target.value))}
              className='costum-input d'
              value={minInput}
            />
            <img className='lari-sign' src={lariSign} alt='Lari sign' />
          </div>
        </div>
        <div>
          <span>MAX:</span>
          <div>
            <input
              onChange={(e) => handleInputChange("MAX", Number(e.target.value))}
              className='costum-input d'
              value={maxInput}
            />
            <img className='lari-sign' src={lariSign} alt='Lari sign' />
          </div>
        </div>
      </div>
    </div>
  );
}
