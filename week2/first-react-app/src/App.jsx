import React from "react";
import { ReactDOM } from "react";
import Message from "./Components/Message/Message";
import NumberList from "./Components/NumberList/NumberList";
import Counter from "./Components/Counter/Counter";

const App = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, , 8, 9, 10];

  return (
    <fieldset>
      <legend> App.jsx</legend>
      <Message message="Hello, World!!" title="ABCD" />
      {/* <Message message="Hello, Cohort 1!!" title="ABCD" />
      <Message message="Hello, Monday!!" title="ABCD" /> */}

      <NumberList singleNumber={numbers} />

      <Counter />
    </fieldset>
  );
};

export default App;
