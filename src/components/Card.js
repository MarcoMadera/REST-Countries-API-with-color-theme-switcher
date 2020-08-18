import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./css/Card.css";

const Card = ({ flag, name, population, region, capital, alpha3Code }) => {
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <Link to={`/details/${alpha3Code}`} className="Card">
      <header className="Card__flag">
        <img loading="lazy" src={flag} alt={`${name} flag`} />
      </header>
      <section className="Card__data">
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
      </section>
    </Link>
  );
};

Card.propTypes = {
  flag: PropTypes.string,
  name: PropTypes.string,
  population: PropTypes.number,
  region: PropTypes.string,
  capital: PropTypes.string,
  alpha3Code: PropTypes.string,
};

export default Card;
