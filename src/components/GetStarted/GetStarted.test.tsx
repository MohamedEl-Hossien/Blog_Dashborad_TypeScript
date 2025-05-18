import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import GetStarted from "./";

const mockStore = configureStore([]);

describe("GetStarted Component", () => {
  test("renders welcome message when not loading", () => {
    const store = mockStore({ loading: false });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <GetStarted />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText("Welcome to the Blog Dashboard")
    ).toBeInTheDocument();
    expect(screen.getByText(/To get started/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Posts/i })).toBeInTheDocument();
  });

  test("renders loading indicator when app is loading", () => {
    const store = mockStore({ loading: true });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <GetStarted />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
