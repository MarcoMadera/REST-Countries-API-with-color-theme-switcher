import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./css/Home.css";
import Filter from "../components/Filter";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import NotFound from "../components/NotFound";

const Home = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const changeIsFiltering = useCallback((bool) => {
    setIsFiltering(bool);
  }, []);

  const newFilteredData = useCallback((data) => {
    setFilteredData(data);
  }, []);

  return (
    <>
      <Filter
        newFilteredData={newFilteredData}
        data={data}
        changeIsFiltering={changeIsFiltering}
      />
      {data.length > 0 ? (
        <main className="Countries">
          {(isFiltering === false ? data : filteredData).map((props) => (
            <Card key={props.name} {...props} />
          ))}
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
