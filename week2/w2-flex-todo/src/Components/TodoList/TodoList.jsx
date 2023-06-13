import React from "react";

const TodoList = ({ todos, onDeleteTodo }) => {
  return (
    <div>
      <fieldset>
        <legend>TodoList.jsx</legend>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => onDeleteTodo(todo.id)}> Delete </button>
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
};

export default TodoList;
