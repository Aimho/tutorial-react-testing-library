import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";

describe("<TodoItem />", () => {
  const initialProps = {
    todo: {
      id: 1,
      text: "TDD 배우기",
      done: false,
    },
  };

  // props으로 받아서 mock data를 변경할 수 있음
  const setup = (props) => {
    // clean mock data
    beforeEach(() => (document.body.innerHTML = ""));

    const utils = render(<TodoItem {...initialProps} {...props} />);
    const { getByText } = utils;
    const todo = (props && props.todo) || initialProps.todo;
    const span = getByText(todo.text);
    const btn = getByText("삭제");

    return {
      ...utils,
      span,
      btn,
    };
  };

  it("has span and btn", () => {
    const { span, btn } = setup();
    expect(span).toBeTruthy();
    expect(btn).toBeTruthy();
  });

  it("shows line-through on span when done is true", () => {
    const { span } = setup({ todo: { ...initialProps.todo, done: true } });
    // toHaveStyle: DOM에 특정 스타일이 있는지 확인 할 수 있음
    expect(span).toHaveStyle("text-decoration: line-through;");
  });

  it("does not shows line-through on span when done is false", () => {
    const { span } = setup({ todo: { ...initialProps.todo, done: false } });
    // not.*: 특정 조건이 만족하지 않아야 함을 의미
    expect(span).not.toHaveStyle("text-decoration: line-through;");
  });

  it("calls onToggle", () => {
    const onToggle = jest.fn();
    const { span } = setup({ onToggle });

    fireEvent.click(span);
    expect(onToggle).toBeCalledWith(initialProps.todo.id);
  });

  it("calls onRemove", () => {
    const onRemove = jest.fn();
    const { btn } = setup({ onRemove });

    fireEvent.click(btn);
    expect(onRemove).toBeCalledWith(initialProps.todo.id);
  });
});
