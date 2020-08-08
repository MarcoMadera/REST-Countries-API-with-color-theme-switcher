import React, { useState, useEffect, useCallback } from "react";
import "./css/Filter.css";
import Search from "./images/Search";
import PropTypes from "prop-types";

const Filter = ({ filterDataByName, data, toggleIsSearching }) => {
  const [search, setSearch] = useState("");
  const [searchList, setListSearch] = useState();
  console.log(searchList);
  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);
  const handleListChange = useCallback((e) => {
    setListSearch(e.target.value);
  }, []);

  useEffect(() => {
    if (searchList && data.length > 0 && searchList) {
      const results = [...data]
        .filter((result) => result.region.includes(searchList))
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
      toggleIsSearching(true);
      filterDataByName(results);
    } else {
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
        toggleIsSearching(true);
        filterDataByName(results);
      }
    }
  }, [search, filterDataByName, data, searchList, toggleIsSearching]);

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
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          id="regions"
          defaultValue={"default"}
          name="regions"
          onChange={handleListChange}
        >
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
  toggleIsSearching: PropTypes.func,
  data: PropTypes.array,
};

export default Filter;
