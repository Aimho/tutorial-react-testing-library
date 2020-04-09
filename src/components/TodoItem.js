import React, { useCallback } from "react";

const TodoItem = ({ todo, onToggle, onRemove }) => {
  const { id, text, done } = todo;
  const toggle = useCallback(() => onToggle(id), [id, onToggle]);
  const remove = useCallback(() => onRemove(id), [id, onRemove]);

  const spanStyle = {
    textDecoration: done ? "line-through" : "",
  };

  return (
    <li>
      <span style={spanStyle} onClick={toggle}>
        {text}
      </span>
      <button onClick={remove}>삭제</button>
    </li>
  );
};

export default TodoItem;
