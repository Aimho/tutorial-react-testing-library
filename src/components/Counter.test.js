import React from "react";
// fireEvent() - 이벤트 발생시켜주는 함수
import { render, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("<Counter />", () => {
  const utils = render(<Counter />);
  const number = utils.getByText("0");
  const plusBtn = utils.getByText("+1");
  const minusBtn = utils.getByText("-1");

  it("matches snapshot", () => expect(utils.container).toMatchSnapshot());

  it("has a number and two buttons", () => {
    // 버튼과 숫자가 있는지 확인
    utils.getByText("0");
    utils.getByText("+1");
    utils.getByText("-1");
  });

  it("increase", () => {
    // 클릭 이벤트 두번 발생
    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);

    // jest-dom의 확장 matcher 사용
    expect(number).toHaveTextContent("2");
    // textContent 직접 비교
    expect(number.textContent).toBe("2");
  });

  it("decrease", () => {
    fireEvent.click(minusBtn);
    fireEvent.click(minusBtn);

    expect(number).toHaveTextContent("0");
    expect(number.textContent).toBe("0");
  });
});
