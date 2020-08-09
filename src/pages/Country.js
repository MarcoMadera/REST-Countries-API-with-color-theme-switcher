import React from "react";
import PropTypes from "prop-types";
import NotFound from "../components/NotFound";
import "./css/Country.css";
import BackArrow from "../components/images/BackArrow";
import { Link } from "react-router-dom";
const Country = ({ data, match, history }) => {
  const country = data.find(
    (country) => country.alpha3Code === match.params.alpha3Code
  );
  const countryBordersNames = (border) => {
    const datas = [...data].filter(({ alpha3Code }) => alpha3Code === border);
    return (
      <Link
        to={`/${datas[0].alpha3Code}`}
        key={border}
        className="Country__border"
      >
        {datas[0].name}
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
            <BackArrow width={14} height={14} /> Back
          </button>
          <div className="Country__datas">
            <div className="Country__flag">
              <img src={country.flag} alt={`${country.name} flag`} />
            </div>
            <div className="Country__data">
              <h1 className="Country__data-name">{country.name}</h1>
              <div className="Country__metaDatas">
                <p className="Country__data-nativeName">
                  Native Name: <span>{country.nativeName}</span>
                </p>
                <p className="Country__data-population">
                  Population: <span>{formatNumber(country.population)}</span>
                </p>
                <p className="Country__data-region">
                  Region: <span>{country.region}</span>
                </p>
                <p className="Country__data-subregion">
                  Sub Region: <span>{country.subregion}</span>
                </p>
                <p className="Country__data-capital">
                  Capital: <span>{country.capital}</span>
                </p>
                <p className="Country__data-capital">
                  Top Level Domain:{" "}
                  {country.topLevelDomain.map((domain) => (
                    <span key={domain}>{domain} </span>
                  ))}
                </p>
                <p className="Country__data-capital">
                  Currencies:{" "}
                  {country.currencies.map(({ name }) => (
                    <span key={name}>{name} </span>
                  ))}
                </p>
                <p className="Country__data-capital">
                  Languages:{" "}
                  {country.languages.map(({ name }) => (
                    <span key={name}>{name} </span>
                  ))}
                </p>
              </div>
              <div className="Country__borders">
                <p>Border Countries: </p>
                {country.borders.map((border) => countryBordersNames(border))}
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
Country.propTypes = {
  data: PropTypes.array,
  history: PropTypes.object,
  match: PropTypes.object,
};
export default Country;
