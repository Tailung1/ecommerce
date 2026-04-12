import { useEffect, useState } from "react";

export default function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const hanldeResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", hanldeResize);

    return () => window.removeEventListener("resize", hanldeResize);
  }, []);

  return width;
}
