import React, { useState } from "react";
import TodoList from "../TodoList/TodoList";

const TodoApp = (props) => {
  const [todos, setTodos] = useState(props.initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleDeleteTodo = (id) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  };
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo("");
    }
  };

  return (
    <div>
      <fieldset>
        <legend>TodoApp.jsx</legend>
        <h1>Todo App</h1>
        <div>
          <input
            type="text"
            value={newTodo}
            onChange={handleNewTodoChange}
            placeholder="Enter a new todo..."
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>

        {todos.length > 0 ? (
          <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
        ) : (
          <p>No todos available</p>
        )}
      </fieldset>
    </div>
  );
};

export default TodoApp;
