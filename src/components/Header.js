import React from "react";
import "./css/Header.css";
import Moon from "./images/Moon";
import Sun from "./images/Sun";
import PropTypes from "prop-types";
const Header = ({ darkMode, switchDarkMode }) => {
  return (
    <div className="Header">
      <h1 className="Header__Title">Where in the world?</h1>
      <div className="Header__darkMode">
        {darkMode ? (
          <Moon
            onClick={() => switchDarkMode()}
            width={20}
            heigth={20}
            fill="rgb(250, 250, 250)"
          />
        ) : (
          <Sun onClick={() => switchDarkMode()} width={20} heigth={20} />
        )}
        <p className="Header__darkMode-Title">Dark Mode</p>
      </div>
    </div>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool,
  switchDarkMode: PropTypes.func,
};

export default Header;
