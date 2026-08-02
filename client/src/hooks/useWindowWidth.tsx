import { useEffect, useState } from "react";

export default function useIsDesktop() {
  // typeof always returns a string, e.g., "object" for window or "undefined" if it doesn't exist
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = width > 1023;

  return isDesktop;
}
