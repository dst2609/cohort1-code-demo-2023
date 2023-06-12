import React from "react";

const NumberList = (props) => {
  //filter for evenNumber
  const evenNumbers = props.singleNumber.filter(
    (number, index) => number % 2 === 0
  );

  //map to display as a list
  const numberItems = evenNumbers.map((number, key) => (
    <li key={number}> {number}</li>
  ));

  return (
    <div>
      <h2>Filtered Even numbers</h2>
      <ul>{numberItems}</ul>
    </div>
  );
};

export default NumberList;
