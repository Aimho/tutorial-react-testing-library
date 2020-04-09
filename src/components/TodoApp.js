/**
 * TDD Todo app
 */

import React, { Fragment, useState, useCallback, useRef } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

const TodoApp = () => {
  const [mock, setMock] = useState([
    { id: 1, text: "TDD 배우기", done: true },
    { id: 2, text: "testing-library 사용하기", done: true },
  ]);
  const nextId = useRef(3);

  const onInsert = useCallback(
    (text) => {
      setMock(
        mock.concat({
          id: nextId.current,
          text,
          done: false,
        })
      );

      // nextId 1 더하기
      nextId.current += 1;
    },
    [mock]
  );

  const onToggle = useCallback(
    (id) =>
      setMock(
        mock.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      ),
    [mock]
  );

  const onRemove = useCallback(
    (id) => setMock(mock.filter((todo) => todo.id !== id)),
    [mock]
  );

  return (
    <Fragment>
      <TodoForm data-testid="hello world" onInsert={onInsert} />
      <TodoList todos={mock} onToggle={onToggle} onRemove={onRemove} />
    </Fragment>
  );
};

export default TodoApp;
