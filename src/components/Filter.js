import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./css/Filter.css";
import Search from "./images/Search";
import Expand from "./images/Expand";

const Filter = ({ newFilteredData, data, changeIsFiltering }) => {
  const [inputFilter, setInputFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleChange = useCallback((e) => {
    setInputFilter(e.target.value);
  }, []);
  const handleRegionChange = useCallback(
    (region) => {
      setIsDropDownOpen(false);
      if (region === regionFilter) {
        setRegionFilter("");
      } else {
        setRegionFilter(region);
      }
    },
    [regionFilter]
  );

  useEffect(() => {
    if (isDropDownOpen) {
      document.body.addEventListener("click", () => setIsDropDownOpen(false));
    } else {
      document.body.removeEventListener("click", () =>
        setIsDropDownOpen(false)
      );
    }
  }, [isDropDownOpen]);

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
          data.name.toLowerCase().includes(inputFilter.toLowerCase())
        );
    },
    [inputFilter]
  );

  useEffect(() => {
    if (regionFilter && data.length > 0) {
      const countries = filterData(
        [...data].filter((country) => country.region.includes(regionFilter))
      );
      changeIsFiltering(true);
      newFilteredData(countries);
    } else {
      if (data.length > 0 && inputFilter) {
        changeIsFiltering(true);
        newFilteredData(filterData([...data]));
      }
    }
    if (inputFilter === "" && !regionFilter) {
      changeIsFiltering(false);
    }
  }, [
    inputFilter,
    newFilteredData,
    data,
    regionFilter,
    changeIsFiltering,
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
      <div className="CategoryFilterRegion">
        <button
          className="CategoryFilter"
          onKeyDown={(e) => {
            e.shiftKey && e.keyCode === 9 && setIsDropDownOpen(false);
          }}
          onClick={(e) => {
            setIsDropDownOpen(!isDropDownOpen);
            e.stopPropagation();
          }}
        >
          {regionFilter || "Filter by Region"}
          <Expand width={12} height={12} />
        </button>
        <div
          className="CategoryFilter__dropDown"
          style={{ display: isDropDownOpen ? "block" : "none" }}
        >
          <button onClick={() => handleRegionChange("Africa")}>Africa</button>
          <button onClick={() => handleRegionChange("America")}>America</button>
          <button onClick={() => handleRegionChange("Asia")}>Asia</button>
          <button onClick={() => handleRegionChange("Europe")}>Europe</button>
          <button
            onClick={() => handleRegionChange("Oceania")}
            onKeyDown={(e) => e.keyCode === 9 && setIsDropDownOpen(false)}
          >
            Oceania
          </button>
        </div>
      </div>
    </div>
  );
};

Filter.propTypes = {
  newFilteredData: PropTypes.func,
  changeIsFiltering: PropTypes.func,
  data: PropTypes.array,
};

export default Filter;
