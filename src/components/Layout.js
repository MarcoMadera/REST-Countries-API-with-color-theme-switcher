import React, { Fragment } from "react";
import Header from "../components/Header";
import PropTypes from "prop-types";

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
