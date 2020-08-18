import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./css/Header.css";
import Moon from "./images/Moon";
import Sun from "./images/Sun";
const Header = () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkMode");
    } else {
      document.body.classList.remove("darkMode");
    }
  }, [darkMode]);

  return (
    <header className="Header">
      <Link to="/" className="Header__Title">
        Where in the world?
      </Link>
      <button
        onClick={() => toggleDarkMode()}
        className="Header__darkMode Header__darkMode-Title"
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
  toggleDarkMode: PropTypes.func,
};

export default Header;
