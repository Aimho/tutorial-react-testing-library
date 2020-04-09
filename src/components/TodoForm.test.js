import React from "react";
import { render } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe("<TodoFrom />", () => {
  const { getByText, getByPlaceholderText } = render(<TodoForm />);
  it("has input and a button", () => {
    // check input
    getByPlaceholderText("할 일을 입력하세요");
    // check button
    getByText("등록");
  });
});
