import React from "react";
import "./Message.css";

const Message = (props) => {
  return (
    <fieldset>
      <legend>Message.jsx</legend>
      <h1>{props.message}</h1>
      <h2>{props.title}</h2>
    </fieldset>
  );
};

export default Message;
