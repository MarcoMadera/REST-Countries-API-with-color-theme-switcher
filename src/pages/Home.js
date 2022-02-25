import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./css/Home.css";
import Filter from "../components/Filter";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import NotFound from "../components/NotFound";
import WorldMap from "../components/WorldMap";

const Home = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const changeIsFiltering = useCallback((bool) => {
    setIsFiltering(bool);
  }, []);

  const newFilteredData = useCallback((data) => {
    setFilteredData(data);
  }, []);
  function generateRandomNumber(min, max){
    const number= Math.floor(Math.random() * (max - min + 1)) + min;
    return number.toString();
  }

  const countriesdata = data?.reduce((result, countryData) => {
    if (!result[countryData.alpha3Code]) {
      result[countryData.alpha3Code] = {...countryData, fillKey: generateRandomNumber(1,25)};
    }
    return result;
  }, {});

  
  return (
    <>
      <WorldMap onClick={(e)=>{console.log("hey",e);}} data={countriesdata}/>
      <Filter
        newFilteredData={newFilteredData}
        data={data}
        changeIsFiltering={changeIsFiltering}
      />
      {data.length > 0 ? (
        <main>
          <section className="Countries">
            {(isFiltering === false ? data : filteredData).map((props) => (
              <Card key={props.name} {...props} />
            ))}
          </section>
        </main>
      ) : (
        <Spinner />
      )}
      {isFiltering === true && filteredData.length === 0 && <NotFound />}
    </>
  );
};

Home.propTypes = {
  data: PropTypes.array,
  name: PropTypes.string,
};

export default Home;
