import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { useUserProfileQuery } from "../../queries";
import ProfileInfo from "./";

const mockStore = configureStore([]);
const store = mockStore({ currentUser: { uid: "123" } });

jest.mock("../../queries", () => ({
  useUserProfileQuery: jest.fn(),
}));

describe("ProfileInfo Component", () => {
  test("renders loading indicator when fetching user data", () => {
    (useUserProfileQuery as jest.Mock).mockReturnValue({
      isPending: true,
      isError: false,
      data: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileInfo />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders error message on query failure", () => {
    (useUserProfileQuery as jest.Mock).mockReturnValue({
      isPending: false,
      isError: true,
      error: { message: "Network Error" },
      data: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileInfo />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Network Error/i).length).toBe(2);
  });

  test("renders user profile information when data is available", () => {
    (useUserProfileQuery as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      data: {
        name: "Mohamed Ali",
        email: "test@test.com",
        position: "SW",
        location: "Cairo",
        bio: "React Developer",
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileInfo />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Mohamed Ali/i)).toBeInTheDocument();
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/SW/i)).toBeInTheDocument();
    expect(screen.getByText(/Cairo/i)).toBeInTheDocument();
    expect(screen.getByText(/React Developer/i)).toBeInTheDocument();
  });
});
