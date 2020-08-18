import React, { useState, useCallback } from "react";
import Filter from "../components/Filter";
import Card from "../components/Card";
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

  const newFilteredData = useCallback((data) => {
    setFilteredData(data);
  }, []);

  return (
    <>
      <Filter
        newFilteredData={newFilteredData}
        data={data}
        toggleIsSearching={toggleIsSearching}
      />
      {data.length > 0 ? (
        <main className="Countries">
          {(isSearching === false ? data : filteredData).map((props) => (
            <Card key={props.name} {...props} />
          ))}
        </main>
      ) : (
        <Spinner />
      )}
      {isSearching === true && filteredData.length === 0 && <NotFound />}
    </>
  );
};

Home.propTypes = {
  data: PropTypes.array,
  name: PropTypes.string,
};

export default Home;
