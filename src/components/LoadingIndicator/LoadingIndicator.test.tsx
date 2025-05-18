import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingIndicator from "./";

describe("LoadingIndicator Component", () => {
  test("render loading animation", () => {
    render(<LoadingIndicator />);

    //  Check if LoadingIndicator is rendered
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders four childs div", () => {
    render(<LoadingIndicator />);

    //Check if five divs is rendered
    const divs = screen.getAllByRole("generic");
    expect(divs).toHaveLength(5);
  });
});
