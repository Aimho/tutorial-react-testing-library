import React from "react";
import { render } from "@testing-library/react";
import Profile from "./Profile";

describe("<Profile />", () => {
  // react-testing-library에서 컴포넌트를 렌더링 할 때 render()라는 함수를 사용함
  // 결과물에는 DOM을 선택할 수 있는 다양한 쿼리들과 container(최상위 DOM)가 포함되어 있음
  const utils = render(<Profile username="AimHo" name="조준호" />);
  it("matches snapshot", () => expect(utils.container).toMatchSnapshot());

  it("shows the props correctly", () => {
    // AimHo 라는 텍스트를 가진 element가 있는지 확인
    utils.getByText("AimHo");
    utils.getByText("(조준호)");
    utils.getByText(/조/);
  });
});
