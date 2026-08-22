import "./CustomScrollbar.scss";
import { useRef, useState, useEffect } from "react";

export default function CustomScrollbar() {
  const barRef = useRef<HTMLDivElement>(null);
  //   const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [clientY, setClientY] = useState<number>(0);

  useEffect(() => {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const trackHeight = barRef.current?.clientHeight;
  }, []);

  const handleScroll = (clientY: number) => {
    window.scrollTo(0, clientY);
    setClientY(clientY);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: PointerEvent) => handleScroll(e.clientY);
    const onEnd = () => setIsDragging(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onEnd);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
    };
  }, [isDragging]);

  return (
    <div
      style={{ top: `${clientY}px` }}
      onPointerDown={() => setIsDragging(true)}
      ref={barRef}
      className={`customScrollbar-parent ${isDragging ? "isDraggingWidth" : ""}`}
    ></div>
  );
}
