import React,{Fragment} from "react";
import Header from "../components/Header";
import PropTypes from "prop-types";

const Layout = ({darkMode,switchDarkMode,children}) => {
  return(
    <Fragment>
      <Header darkMode={darkMode} switchDarkMode={switchDarkMode} />
      {children}
    </Fragment>
  );
};

Layout.propTypes = {
  darkMode: PropTypes.bool,
  switchDarkMode: PropTypes.func,
  children: PropTypes.node.isRequired,
};
export default Layout;