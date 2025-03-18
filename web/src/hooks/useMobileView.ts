import { useState, useEffect } from "react";

const useMobileView = (maxWidth = 600) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth <= maxWidth);
    };

    checkMobileView();

    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, [maxWidth]);

  return isMobile;
};

export default useMobileView;
