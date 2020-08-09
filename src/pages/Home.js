import React, { useState, useCallback } from "react";
import Filter from "../components/Filter";
import Countries from "../components/Countries";
import Spinner from "../components/Spinner";
import NotFound from "../components/NotFound";
import "./css/Home.css";
import PropTypes from "prop-types";

const Home = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const toggleIsSearching = useCallback((value) => {
    setIsSearching(value);
  }, []);

  const filterDataByName = useCallback((datos) => {
    setFilteredData(datos);
  }, []);

  return (
    <>
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
      {isSearching === true && filteredData.length === 0 && <NotFound />}
    </>
  );
};

Home.propTypes = {
  data: PropTypes.array,
};

export default Home;
