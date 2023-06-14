import React from "react";
import "./TodoList.css";

const TodoList = ({ todos, onDeleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id}>
          {/* Each child in a list should have a unique "key" prop. */}
          {todo.text}
          <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
