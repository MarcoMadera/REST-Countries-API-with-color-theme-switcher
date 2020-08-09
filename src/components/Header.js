import React from "react";
import "./css/Header.css";
import Moon from "./images/Moon";
import Sun from "./images/Sun";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Header = ({ darkMode, switchDarkMode }) => {
  return (
    <header className="Header">
      <Link to="/" className="Header__Title">
        Where in the world?
      </Link>
      <button
        onClick={() => switchDarkMode()}
        className="Header__darkMode Header__darkMode-Title"
        id="toggleDarkMode"
      >
        {darkMode ? (
          <Moon width={20} height={20} fill="rgb(250, 250, 250)" />
        ) : (
          <Sun width={20} height={20} />
        )}
        Dark Mode
      </button>
    </header>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool,
  switchDarkMode: PropTypes.func,
};

export default Header;
