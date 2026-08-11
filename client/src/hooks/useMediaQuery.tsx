import { useEffect, useState } from "react";

export default function useIsDesktop() {
  // typeof always returns a string, e.g., "object" for window or "undefined" if it doesn't exist
  //   const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const mediaQuery = window.matchMedia("(min-width:1024px)");

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
}
