import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Input from "./";

describe("Input Component", () => {
  test("renders label and input correctly", () => {
    render(<Input label="Email" name="email" type="text" error="" />);

    // Check if label is displayed correctly
    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    // Check if input field is rendered
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders textarea when textArea prop is true", () => {
    render(
      <Input label="Bio" name="bio" type="text" textArea rows={5} error="" />
    );

    // Check if textarea is rendered instead of input
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
  });

  test("displays error message when error prop is set", () => {
    render(
      <Input
        label="Email"
        name="email"
        type="email"
        error="Invalid email format"
      />
    );

    // Check if error message is displayed
    expect(screen.getByText("Invalid email format")).toBeInTheDocument();
  });
});
