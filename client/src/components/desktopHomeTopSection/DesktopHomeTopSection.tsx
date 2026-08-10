import "./DesktopHomeTopSection.scss";
import { useEffect, useRef, useState } from "react";
import { useMyContext } from "../../contexts/MyContext";
import Categories from "../../features/categories/CategoryList";
import leftArrowIcon from "../../assets/left-arrow.png";
import rightArrowIcon from "../../assets/right-arrow.png";
import iphone from "../../assets/iphone.png";
import consoleIcon from "../../assets/console.png";
import tv from "../../assets/television.png";

export default function CategoriesAndCarousel() {
  const { activeCategory } = useMyContext();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const arr = [iphone, consoleIcon, tv];
  let timeoutRef = useRef<null | number>(null);
  let intervalRef = useRef<null | number>(null);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  const sliderWrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (isHovered) return;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const leftSpace =
          sliderWrapperRef.current!.scrollWidth - sliderWrapperRef.current!.scrollLeft;

        if (leftSpace > sliderWrapperRef.current!.clientWidth) {
          sliderWrapperRef.current!.scrollLeft += 500;
          return;
        }
        sliderWrapperRef.current!.scrollLeft -= sliderWrapperRef.current!.scrollWidth;
      }, 2000);
    }, 3000);
  }, [isHovered]);

  const handleScroll = (dir: "left" | "right") => {
    setIsHovered(true);
    const leftSpace = sliderWrapperRef.current!.scrollWidth - sliderWrapperRef.current!.scrollLeft;
    if (dir === "right") {
      if (leftSpace > sliderWrapperRef.current!.clientWidth)
        sliderWrapperRef.current!.scrollLeft += 500;
      else return;
    } else {
      sliderWrapperRef.current!.scrollLeft -= 500;
      if (sliderWrapperRef.current!.scrollLeft < 0) sliderWrapperRef.current!.scrollLeft = 0;
      return;
    }
  };

  return (
    <div className='pc-main-first-section'>
      <div className='categories-and-brands-parent'>
        <div className='pc-categories-and-brands-container'>
          <Categories />
          <div className='pc-brands-container'>{activeCategory}</div>
        </div>
      </div>
      <div ref={containerRef} className='pc-slider-container'>
        <div
          ref={sliderWrapperRef}
          onClick={() => setIsHovered((prev) => !prev)}
          className='pc-slider-wrapper'
        >
          {arr.map((i, index) => (
            <img key={index} src={i} />
          ))}
        </div>
        <div className='arrows-container'>
          <img onClick={() => handleScroll("left")} src={leftArrowIcon} alt='Left Arrow' />
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
