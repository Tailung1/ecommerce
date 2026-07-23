// import { useEffect, useState } from "react";

// export default function useWindowWidth() {
//   // typeof always returns a string, e.g., "object" for window or "undefined" if it doesn't exist
//   const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
//   useEffect(() => {
//     const handleResize = () => {
//       setWidth(window.innerWidth);
//     };
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return width;
// }

import { useEffect } from "react";
import { useMyContext } from "../contexts/MyContext";

export default function useWindowWidth() {
  const { setResoltion } = useMyContext();
  // typeof always returns a string, e.g., "object" for window or "undefined" if it doesn't exist
  //   const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
  useEffect(() => {
    const handleResize = () => {
      setResoltion({
        isIpad: window.innerWidth >= 768 && window.innerWidth < 1024,
        isPc: window.innerWidth > 1023,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //   return width;
}
