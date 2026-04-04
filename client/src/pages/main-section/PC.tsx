import { useEffect, useRef, useState } from "react";
import Categories from "../header-section/Categories";
import leftArrowIcon from "../../assets/left-arrow.png";
import rightArrowIcon from "../../assets/right-arrow.png";
import iphone from "../../assets/iphone.png";
import consoleIcon from "../../assets/console.png";
import tv from "../../assets/television.png";

export default function PC() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const arr = [iphone, consoleIcon, tv];
  let timeoutRef = useRef<null | number>(null);
  let intervalRef = useRef<null | number>(null);

  useEffect(() => {
    const el = document.querySelector(".pc-slider-container");
    el?.addEventListener("mouseenter", () => setIsHovered(true));
    el?.addEventListener("mouseleave", () => setIsHovered(false));
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isHovered) return;

    const container = document.querySelector(".pc-slider-wrapper")!;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const leftSpace =
          container.scrollWidth - container.scrollLeft;

        if (leftSpace > container.clientWidth) {
          container.scrollLeft += 500;
          return;
        }
        container.scrollLeft -= container.scrollWidth;
      }, 2000);
    }, 3000);
  }, [isHovered]);

  const handleScroll = (dir: "left" | "right") => {
    setIsHovered(true);
    const container = document.querySelector(".pc-slider-wrapper")!;
    const leftSpace = container.scrollWidth - container.scrollLeft;
    if (dir === "right") {
      if (leftSpace > container.clientWidth)
        container.scrollLeft += 500;
      else return;
    } else {
      container.scrollLeft -= 500;
      if (container.scrollLeft < 0) container.scrollLeft = 0;
      return;
    }
  };

  return (
    <div className='pc-main-first-section'>
      <div className='categories-and-brands-parent'>
        <div className='pc-categories-and-brands-container'>
          <Categories />
          <div className='pc-brands-container'>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>
      </div>
      <div className='pc-slider-container'>
        <div
          onClick={() => setIsHovered((prev) => !prev)}
          className='pc-slider-wrapper'
        >
          {arr.map((i, index) => (
            <img key={index} className='s' src={i} />
          ))}
        </div>
        <div className='arrows-container'>
          <img
            onClick={() => handleScroll("left")}
            src={leftArrowIcon}
            alt='Left Arrow'
          />
          <img
            onClick={() => handleScroll("right")}
            className='rightArrow'
            src={rightArrowIcon}
            alt='Right Arrow'
          />
        </div>
      </div>
    </div>
  );
}
