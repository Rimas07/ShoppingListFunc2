import  { useEffect, useState } from "react";

const ScreenSizeListener = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [screenType, setScreenType] = useState("initial Mode");

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return function cleanup() {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth > 1300) {
      setScreenType("DESKTOP MODE");
    } else if (window.innerWidth <= 1300 && window.innerWidth > 800) {
      setScreenType("TABLET MODE");
    } else {
      setScreenType("MOBILE MODE");
    }
  };

    return {
        windowWidth,
        screenType
  };
};

export default ScreenSizeListener;
