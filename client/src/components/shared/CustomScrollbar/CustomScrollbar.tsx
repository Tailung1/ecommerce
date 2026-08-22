import "./CustomScrollbar.scss";
import { useRef, useState, useEffect } from "react";

export default function CustomScrollbar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handlePointerDown = () => {
    setIsPressed(true);
  };
  const handlePointerUp = () => {
    setIsPressed(false);
  };

  const handleScroll = () => {
    if (!isPressed) return;
    setIsDragging(true);
  };
  useEffect(() => {}, [isDragging]);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handleScroll}
      onPointerUp={handlePointerUp}
      ref={barRef}
      className='customScrollbar-parent'
    ></div>
  );
}
