import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";

const Layout = ({ darkMode, toggleDarkMode, children }) => {
  return (
    <Fragment>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {children}
    </Fragment>
  );
};

Layout.propTypes = {
  darkMode: PropTypes.bool,
  toggleDarkMode: PropTypes.func,
  children: PropTypes.node.isRequired,
};
export default Layout;
