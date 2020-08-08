import React, {useEffect, useState, useCallback } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import "./App.css";
import Home from "./pages/Home";
import Country from "./pages/Country";

const App = () => {
  const [data,setData] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("dark-mode") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const switchDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  return (
    <BrowserRouter>
      <Layout darkMode={darkMode} switchDarkMode={switchDarkMode}>
        <Switch>
          <Route exact path="/" render={()=><Home data={data}/>} />
          <Route exact path="/country/:name" render={(props)=><Country data={data} {...props}/>} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;