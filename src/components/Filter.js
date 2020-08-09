import React, { useState, useEffect, useCallback } from "react";
import "./css/Filter.css";
import Search from "./images/Search";
import PropTypes from "prop-types";

const Filter = ({ filterDataByName, data, toggleIsSearching }) => {
  const [search, setSearch] = useState("");
  const [searchList, setListSearch] = useState();
  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);
  const handleListChange = useCallback((e) => {
    setListSearch(e.target.value);
  }, []);

  const filterData = useCallback(
    (data) => {
      return data
        .map((data) => ({
          name: data.name,
          population: data.population,
          region: data.region,
          capital: data.capital,
          flag: data.flag,
          alpha3Code: data.alpha3Code,
        }))
        .filter((data) =>
          data.name.toLowerCase().includes(search.toLowerCase())
        );
    },
    [search]
  );

  useEffect(() => {
    if (searchList && data.length > 0 && searchList) {
      const results = filterData(
        [...data].filter((result) => result.region.includes(searchList))
      );
      toggleIsSearching(true);
      filterDataByName(results);
    } else {
      if (data.length > 0 && search) {
        toggleIsSearching(true);
        filterDataByName(filterData([...data]));
      }
    }
    if (search === "" && !searchList) {
      toggleIsSearching(false);
    }
  }, [
    search,
    filterDataByName,
    data,
    searchList,
    toggleIsSearching,
    filterData,
  ]);

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
          aria-label="Filter by region"
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
