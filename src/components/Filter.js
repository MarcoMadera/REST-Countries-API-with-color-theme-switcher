import React, { useState, useEffect, useCallback } from "react";
import "./css/Filter.css";
import Search from "./images/Search";
import PropTypes from "prop-types";
import Expand from "./images/Expand";

const Filter = ({ newFilteredData, data, toggleIsSearching }) => {
  const [search, setSearch] = useState("");
  const [searchList, setListSearch] = useState();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);
  const handleListChange = useCallback(
    (e) => {
      setIsDropDownOpen(false);
      if (e === searchList) {
        setListSearch("");
      } else {
        setListSearch(e);
      }
    },
    [searchList]
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
      newFilteredData(results);
    } else {
      if (data.length > 0 && search) {
        toggleIsSearching(true);
        newFilteredData(filterData([...data]));
      }
    }
    if (search === "" && !searchList) {
      toggleIsSearching(false);
    }
  }, [
    search,
    newFilteredData,
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
          {searchList || "Filter by Region"}
          <Expand width={12} height={12} />
        </button>
        <div
          className="CategoryFilter__dropDown"
          style={{ display: isDropDownOpen ? "block" : "none" }}
        >
          <button onClick={() => handleListChange("Africa")}>Africa</button>
          <button onClick={() => handleListChange("America")}>America</button>
          <button onClick={() => handleListChange("Asia")}>Asia</button>
          <button onClick={() => handleListChange("Europe")}>Europe</button>
          <button
            onClick={() => handleListChange("Oceania")}
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
  toggleIsSearching: PropTypes.func,
  data: PropTypes.array,
};

export default Filter;
