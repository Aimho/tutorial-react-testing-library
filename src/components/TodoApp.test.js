import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoApp from "./TodoApp";

describe("<TodoApp />", () => {
  const { getByText, getByTestId, getByPlaceholderText } = render(<TodoApp />);

  it("renders TodoForm and TodoList", () => {
    getByText("등록");
    getByTestId("TodoList");
  });

  it("renders two defaults todo", () => {
    getByText("TDD 배우기");
    getByText("testing-library 사용하기");
  });

  it("creates new todo", () => {
    fireEvent.change(getByPlaceholderText("할 일을 입력하세요"), {
      target: {
        value: "새 항목 추가하기",
      },
    });
    fireEvent.click(getByText("등록"));

    // 해당 항목이 보여야 함
    getByText("새 항목 추가하기");
  });

  it("toggles todo", () => {
    const todoText = getByText("TDD 배우기");

    expect(todoText).toHaveStyle("text-decoration: line-through;");
    fireEvent.click(todoText);

    expect(todoText).not.toHaveStyle("text-decoration: line-through;");
    fireEvent.click(todoText);

    expect(todoText).toHaveStyle("text-decoration: line-through;");
  });

  it("removes todo", () => {
    const todoText = getByText("TDD 배우기");
    const removeBtn = todoText.nextSibling;
    fireEvent.click(removeBtn);
    // toBeInTheDocument: 특정 element가 document에 있는지 확인해주는 함수
    expect(todoText).not.toBeInTheDocument();
  });
});
