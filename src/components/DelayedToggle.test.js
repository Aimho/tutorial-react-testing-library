import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import DelayedToggle from "./DelayedToggle";

describe("<DelayedToggle />", () => {
  const { getByText } = render(<DelayedToggle />);
  const toggleBtn = getByText("toggle");

  it("reveals text when toggle is ON", async () => {
    fireEvent.click(toggleBtn);
    await waitFor(() => getByText("onToggle!!"));
    fireEvent.click(toggleBtn);
  });
});
