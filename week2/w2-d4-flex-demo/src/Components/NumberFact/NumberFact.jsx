import React, { useState } from "react";
import axios from "axios";
// import

const NumberFact = () => {
  const [number, setNumber] = useState("");
  const [fact, setFact] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setNumber(event.target.value);

    try {
      const response = await axios.get(`http://numbersapi.com/${number}`);
      setFact(response.data);
      //   console.log("Fact is: ", fact);
    } catch (error) {
      console.error("Fetching error: ", error);
    }
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={number}
          onChange={handleNumberChange}
          placeholder="Enter a number"
        />
        <button type="submit">Submit</button>
      </form>

      {/* {fact && <p>{fact}</p>} */}
      <p>{fact}</p>
    </div>
  );
};

export default NumberFact;
