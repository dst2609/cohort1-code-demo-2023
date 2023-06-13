import React from "react";
import "./App.css";
import TodoApp from "./Components/TodoApp/TodoApp";

const App = () => {
  const initialTodos = [
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build an app" },
    { id: 3, text: "Implement React" },
  ];

  return (
    <div>
      <fieldset>
        <legend>App.jsx</legend>
        <TodoApp initialTodos={initialTodos} />
      </fieldset>
    </div>
  );
};

export default App;
