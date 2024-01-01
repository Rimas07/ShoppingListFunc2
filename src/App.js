import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import DarkMode from "./components/DarkMode";
import useResponsive from "./hooks/useResponsive";
// import LanguageSwitcher from "./pages/LanguageSwitcher";

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



  // useEffect(() => {
  //   async function getShops() {
  //     const res = await fetch("/api/shops");
  //     const Shops = await res.json();
  //    setMessage(Shops.mssg)
  //   }
  //   getShops();
  // }, []);
  const contentStyle = {
    width: "80%", // default value
  };

  // Adjust content style based on screen type
  if (screenType === "DESKTOP") {
    contentStyle.width = "80%";
  } else if (screenType === "TABLET" || screenType === "MOBILE") {
    contentStyle.width = "80%";
  }
  return (
    
    <Router>
 
         {/* <LanguageSwitcher /> */}
 <DarkMode/>
      <Routes>
        <Route
          path="/"
                element={<Shop style={contentStyle} width={chartSizes().width} height={chartSizes().height} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
