import React, { useState, useEffect, useCallback } from "react";
import "./css/Filter.css";
import Search from "./images/Search";
import PropTypes from "prop-types";

const Filter = ({ filterDataByName, data }) => {
  const [search, setSearch] = useState();

  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  useEffect(() => {
    if (data.length > 0 && (search || search === "")) {
      const results = [...data]
        .map((data) => ({
          name: data.name,
          population: data.population,
          region: data.region,
          capital: data.capital,
          flag: data.flag,
        }))
        .filter((data) =>
          data.name.toLowerCase().includes(search.toLowerCase())
        );
      filterDataByName(results);
    }
  }, [search, filterDataByName, data]);

  return (
    <div className="Filter">
      <div className="SearchFilter">
        <label htmlFor="SearchFilter__input" className="SearchFilter__label">
          <Search width={18} height={18} />
        </label>
        <input
          id="SearchFilter__input"
          type="text"
          onChange={handleChange}
          className="SearchFilter__input"
          placeholder="Search for a country..."
        />
      </div>
      <div className="CategoryFilter">
        <select id="regions" defaultValue={"default"} name="regions">
          <option disabled value="default" hidden>
            Filter by Region
          </option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
};

Filter.propTypes = {
  filterDataByName: PropTypes.func,
  data: PropTypes.array,
};

export default Filter;
