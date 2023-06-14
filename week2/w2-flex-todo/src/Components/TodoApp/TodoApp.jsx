import React, { useState } from "react";
import TodoList from "../../Components/TodoList/TodoList";
import "./TodoApp.css";

const TodoApp = (props) => {
  const [todos, setTodos] = useState(props.initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo(""); //need this line to empty the input field
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="add-todo">
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
    </div>
  );
};

export default TodoApp;
