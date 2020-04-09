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
});
