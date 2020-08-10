import React from "react";

const Expand = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 7" {...props}>
      <path
        fill="#FFF"
        fillRule="evenodd"
        d="M6.875.875L4 3.75 1.125.875.25 1.75 4 5.5l3.75-3.75z"
      ></path>
    </svg>
  );
};

export default Expand;
