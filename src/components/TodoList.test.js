import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

describe("<TodoList />", () => {
  const mock = [
    { id: 1, text: "TDD 배우기", done: true },
    { id: 2, text: "testing-library 사용하기", done: true },
  ];

  it("renders todo properly", () => {
    const { getByText } = render(<TodoList todos={mock} />);
    getByText(mock[0].text);
    getByText(mock[1].text);
  });

  beforeEach(() => (document.body.innerHTML = ""));

  it("calls onToggle and onRemove", () => {
    const onToggle = jest.fn();
    const onRemove = jest.fn();
    const { getByText, getAllByText } = render(
      <TodoList todos={mock} onToggle={onToggle} onRemove={onRemove} />
    );

    fireEvent.click(getByText(mock[0].text));
    expect(onToggle).toBeCalledWith(mock[0].id);

    // 첫 번째 삭제 버튼 클릭
    fireEvent.click(getAllByText("삭제")[0]);
    expect(onRemove).toBeCalledWith(mock[0].id);
  });
});
