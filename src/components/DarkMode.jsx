import React from "react";
import { ReactComponent as Sun } from "../svg/Sun.svg";
import { ReactComponent as Moon } from "../svg/Moon.svg";
import "../css/DarkMode.css";
import useResponsive from "../hooks/useResponsive";

const DarkMode = () => {
  const { screenType } = useResponsive();

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const ToggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  const darkModeStyle = {
  fontSize: screenType === "DESKTOP" ? "24px" : "16px",
  position: "fixed",
  top: "1em", 
  right: "4em",  
};

  const darkModeLabelStyle = {
    width: screenType === "DESKTOP" ? "65px" : "40px",
    height: screenType === "DESKTOP" ? "30px" : "20px",
  };

  return (
    <div className="dark_mode" style={darkModeStyle}>
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={ToggleTheme}
      />
      <label
        className="dark_mode_label"
        htmlFor="darkmode-toggle"
        style={darkModeLabelStyle}
      >
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
