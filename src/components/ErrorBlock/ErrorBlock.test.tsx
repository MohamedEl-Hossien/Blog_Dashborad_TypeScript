import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBlock from "./";

describe("ErrorBlock Component", () => {
  test("renders the error title and message correctly", () => {
    render(<ErrorBlock title="Error Title" message="Something went wrong!" />);

    // Check if title is rendered
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Error Title"
    );

    // Check if message is rendered
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();

    // Check if icon exists
    expect(screen.getByText("!")).toBeInTheDocument();
  });

  test("renders additional children content when provided", () => {
    render(
      <ErrorBlock title="Error Title" message="Something went wrong!">
        Test Children Text
      </ErrorBlock>
    );

    // Check if the button is rendered inside the error block
    expect(screen.getByText("Children", { exact: false })).toBeInTheDocument();
  });
});
