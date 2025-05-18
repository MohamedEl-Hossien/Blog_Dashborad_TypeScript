import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import configureStore from "redux-mock-store";
import { useLogoutMutation } from "../../queries";
import MainNav from "./";

// Mock React Query mutation
jest.mock("../../queries/authMutations", () => ({
  useLogoutMutation: jest.fn(),
}));

// Create a mock Redux store
const mockStore = configureStore([]);
const mockLogout = jest.fn();

describe("MainNav Component", () => {
  beforeEach(() => {
    (useLogoutMutation as jest.Mock).mockReturnValue({
      mutate: mockLogout,
      isError: false,
      error: null,
    });
  });

  test("renders navigation links", () => {
    const store = mockStore({ isAuthenticated: false });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainNav />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Posts/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test("renders Logout button when user is authenticated", () => {
    const store = mockStore({ isAuthenticated: true });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainNav />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test("Login link is not visible when user is authenticated", () => {
    const store = mockStore({ isAuthenticated: true });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainNav />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
  });

  test("calls logout function when logout button is clicked", async () => {
    const store = mockStore({ isAuthenticated: true });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainNav />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Logout/i));

    expect(mockLogout).toHaveBeenCalled();
  });

  test("shows error message when logout fails", () => {
    (useLogoutMutation as jest.Mock).mockReturnValue({
      mutate: mockLogout,
      isError: true,
      error: { code: "auth/network-request-failed", message: "Network Error" },
    });

    const store = mockStore({ isAuthenticated: true });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainNav />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
    expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
  });

  test("toggles mobile menu when clicking menu icon", async () => {
    const store = mockStore({ isAuthenticated: false });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainNav />
        </MemoryRouter>
      </Provider>
    );

    const menuIcon = screen.getByRole("menuIcon");
    await userEvent.click(menuIcon);
    expect(screen.getByRole("list")).toHaveClass("open");
  });
});
