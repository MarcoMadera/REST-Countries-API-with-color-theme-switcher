import React from "react";
import "./css/Card.css";
import PropTypes from "prop-types";

const Card = ({ image, name, population, region, capital }) => {
  const formatNumber=(number) =>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="Card">
      <div className="Card__flag">
        <img loading="lazy" src={image} alt={`${name} flag`} />
      </div>
      <div className="Card__data">
        <h1 className="Card__data-name">{name}</h1>
        <p className="Card__data-population">
          Population: <span>{formatNumber(population)}</span>
        </p>

        <p className="Card__data-region">
          Region: <span>{region}</span>
        </p>

        <p className="Card__data-capital">
          Capital: <span>{capital}</span>
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  population: PropTypes.number,
  region: PropTypes.string,
  capital: PropTypes.string,
};

export default Card;
