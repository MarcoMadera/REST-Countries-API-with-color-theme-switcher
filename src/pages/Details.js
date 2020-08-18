import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./css/Details.css";
import NotFound from "../components/NotFound";
import BackArrow from "../components/images/BackArrow";

const Details = ({ data, match, history }) => {
  const country = data.find(
    (country) => country.alpha3Code === match.params.alpha3Code
  );

  const countryBordersNames = (border) => {
    const country = [...data].find(({ alpha3Code }) => alpha3Code === border);
    return (
      <Link
        to={`/details/${country.alpha3Code}`}
        key={country.alpha3Code}
        className="Country__border"
      >
        {country.name}
      </Link>
    );
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <main className="Country">
      {country ? (
        <>
          <button
            onClick={() => history.goBack()}
            className="Country__backButton"
          >
            <BackArrow width={15} height={15} /> Back
          </button>
          <div className="Country__datas">
            <div className="Country__flag">
              <img src={country.flag} alt={`${country.name} flag`} />
            </div>
            <div className="Country__data">
              <h1 className="Country__data-name">{country.name}</h1>
              <div className="Country__metaDatas">
                <p>
                  Native Name: <span>{country.nativeName}</span>
                </p>
                <p>
                  Population: <span>{formatNumber(country.population)}</span>
                </p>
                <p>
                  Region: <span>{country.region}</span>
                </p>
                <p>
                  Sub Region: <span>{country.subregion}</span>
                </p>
                <p>
                  Capital: <span>{country.capital}</span>
                </p>
                <p>
                  Top Level Domain:{" "}
                  {country.topLevelDomain.map((domain) => (
                    <span key={domain}>{domain} </span>
                  ))}
                </p>
                <p>
                  Currencies:{" "}
                  {country.currencies.map(({ name }, i) =>
                    country.currencies.length === i + 1 ? (
                      <span key={name}>{name}</span>
                    ) : (
                      <span key={name}>{name}, </span>
                    )
                  )}
                </p>
                <p>
                  Languages:{" "}
                  {country.languages.map(({ name }, i) =>
                    country.languages.length === i + 1 ? (
                      <span key={name}>{name}</span>
                    ) : (
                      <span key={name}>{name}, </span>
                    )
                  )}
                </p>
              </div>
              <div className="Country__borders">
                <p>Border Countries: </p>
                {country.borders.length ? (
                  country.borders.map((border) => countryBordersNames(border))
                ) : (
                  <span>None</span>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </main>
  );
};
Details.propTypes = {
  data: PropTypes.array,
  history: PropTypes.object,
  match: PropTypes.object,
};
export default Details;
