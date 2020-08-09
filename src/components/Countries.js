import React from "react";
import "./css/Countries.css";
import Card from "./Card";
import PropTypes from "prop-types";
const Countries = ({ data }) => {
  return (
    <main className="Countries">
      {data.map(({ name, flag, population, region, capital, alpha3Code }) => (
        <Card
          key={name}
          image={flag}
          name={name}
          population={population}
          region={region}
          capital={capital}
          alpha3Code={alpha3Code}
        />
      ))}
    </main>
  );
};

Countries.propTypes = {
  data: PropTypes.array,
};

export default Countries;
