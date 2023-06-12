import React, { useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <fieldset>
      <legend>Counter.jsx</legend>
      <div className="counter">
        <p> 💙 ❤️ {count} </p>
        <button onClick={increment}>Add Likes</button>
      </div>
    </fieldset>
  );
};

export default Counter;
