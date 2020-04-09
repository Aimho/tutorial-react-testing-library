import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe("<TodoFrom />", () => {
  // jest.fn(): jest에서 제공하는 mock 함수
  // 이 함수가 호출된 다음 toBeCalled or toBeCalledWith 같은 matcher를 사용해 함수가 호출됐는지,
  // 호출 됐다면 어떤 파라미터로 호출 됐는지 등을 쉽게 알 수 있음
  const onInsert = jest.fn();
  const { getByText, getByPlaceholderText } = render(
    <TodoForm onInsert={onInsert} />
  );

  // check input and btn
  const input = getByPlaceholderText("할 일을 입력하세요");
  const btn = getByText("등록");

  it("changes input", () => {
    fireEvent.change(input, {
      target: {
        value: "TDD 배우기",
      },
    });
    // toHaveAttribute: DOM에 특정 속성이 있는지 확인해줌
    expect(input).toHaveAttribute("value", "TDD 배우기");
  });

  it("call onInsert and clears input", () => {
    fireEvent.click(btn);
    // check onInsert parameter
    expect(onInsert).toBeCalledWith("TDD 배우기");
    // check input clear
    expect(input).toHaveAttribute("value", "");
  });
});
