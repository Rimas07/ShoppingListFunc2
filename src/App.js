import React from "react";
import Shop from "./pages/Shop";
import DarkMode from "./components/DarkMode";
import useResponsive from "./hooks/useResponsive";
import { BrowserRouter as Router,  } from "react-router-dom";


const App = () => {
  const { windowWidth, screenType } = useResponsive();

  const chartSizes = () => {
    if (screenType === "DESKTOP") {
      return {
        width: 1200,
        height: 500,
      };
    } else if (screenType === "TABLET") {
      return {
        width: windowWidth * 0.8,
        height: 400,
      };
    } else if (screenType === "MOBILE") {
      return {
        width: windowWidth * 0.8,
        height: 300,
      };
    } else {
      return {
        width: 0,
        height: 0,
      };
    }
  };

  const contentStyle = {
    width: "80%", 
  };

  if (
    screenType === "DESKTOP" ||
    screenType === "TABLET" ||
    screenType === "MOBILE"
  ) {
    contentStyle.width = "80%";
  }

return (
    <Router>
      <>
        
        <DarkMode />
        <Shop
          style={contentStyle}
          width={chartSizes().width}
          height={chartSizes().height}
        />
      </>
    </Router>
  );
};
export default App;
