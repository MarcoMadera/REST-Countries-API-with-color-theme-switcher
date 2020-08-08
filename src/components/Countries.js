import React from "react";
import "./css/Countries.css";
import Card from "./Card";
import PropTypes from "prop-types";
const Countries = ({ data }) => {
  return (
    <div className="Countries">
      {data.map(({ name, flag, population, region, capital }) => (
        <Card
          key={name}
          image={flag}
          name={name}
          population={population}
          region={region}
          capital={capital}
        />
      ))}
    </div>
  );
};

Countries.propTypes = {
  data: PropTypes.array,
};

export default Countries;
