import React from "react";
import Datamap from "react-datamaps";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "./css/WorldMap.css";

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function WorldMap({ data }) {
  const history = useHistory();
  function addClickHandlers (ref) {
    if (ref && ref.map) {
      ref.map.svg.selectAll(".datamaps-subunit").on("click", function(geography) {
        history.push(`/details/${geography.id.toUpperCase()}`);
      });
    }
  }

  return (
    <div>
      <Datamap
        ref={addClickHandlers}
        scope="world"
        responsive
        geographyConfig={{
          popupOnHover: true,
          highlightOnHover: true,
          hideAntarctica: true,
          hideHawaiiAndAlaska : true,
          borderColor: "#444",
          borderWidth: 0.5,
          borderOpacity: 0.8,
          popupTemplate: function(geography, data) { 
            return (
              `<div class="card">
                <div class="card-header">
                  <h3>${geography.properties.name}</h3>
                  ${data ? 
                `<div class="card__flag">
                      <img width="25" height="15" src="${data.flag}" alt="${geography.properties.name} flag" />
                    </div>
                </div>
                <div class="card-body">
                  <p>Population: ${formatNumber(data?.population)}</p>
                  <p>Area: ${formatNumber(data?.area)}</p>
                  <p>Region: ${data?.region}</p>
                  <p>Capital: ${data?.capital}</p>
                </div>`
                :
                "</div>"}    
              </div>`
            );
          },

        }}
        fills={{
          defaultFill: "#fff",
          1: "#ffc09f",
          2: "#ffee93",
          3: "#fcf5c7",
          4: "#a0ced9",
          5: "#adf7b6",
          6: "#809bce",
          7: "#95b8d1",
          8: "#b8e0d2",
          9: "#d6eadf",
          10: "#eac4d5",
          11: "#e8d1c5",
          12: "#eddcd2",
          13: "#fff1e6",
          14: "#f0efeb",
          15: "#eeddd3",
          16: "#e8dff5",
          17: "#fce1e4",
          18: "#fcf4dd",
          19: "#ddedea",
          20: "#daeaf6",
          21: "d4afb9",
          22: "d1cfe2",
          23: "9cadce",
          24: "7ec4cf",
          25: "52b2cf",
        }}
        data={data}
      />
    </div>
  );
}

WorldMap.propTypes = {
  data: PropTypes.object,
};
