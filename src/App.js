import React, { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Spinner from "./components/Spinner";
import NotFound from "./components/NotFound";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const toggleIsSearching = useCallback((value) => {
    setIsSearching(value);
  }, []);
  const switchDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  const filterDataByName = useCallback((data) => {
    setFilteredData(data);
  }, []);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);
  return (
    <>
      <Header darkMode={darkMode} switchDarkMode={switchDarkMode} />
      <Filter
        filterDataByName={filterDataByName}
        data={data}
        toggleIsSearching={toggleIsSearching}
      />
      {data.length > 0 ? (
        <Countries
          data={
            filteredData.length > 0 && isSearching
              ? filteredData
              : isSearching === false
                ? data
                : []
          }
          filteredData={filteredData}
        />
      ) : (
        <Spinner />
      )}
      {isSearching === true && filteredData.length ===0 && (
        <NotFound />
      )}
    </>
  );
};

export default App;
