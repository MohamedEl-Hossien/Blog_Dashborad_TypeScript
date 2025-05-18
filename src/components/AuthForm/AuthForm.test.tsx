import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {
  useSignUpMutation,
  useSignInMutation,
  useStoreUserDataMutation,
} from "../../queries";
import AuthForm from "./";

// Mock React Query mutations
jest.mock("../../queries", () => ({
  useSignUpMutation: jest.fn(),
  useSignInMutation: jest.fn(),
  useStoreUserDataMutation: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("AuthForm Component", () => {
  const mockSignUp = jest.fn().mockImplementation((data) => {
    // Simulate the mutation's success behavior
    mockStoreUserData({ userId: "678", filteredData: data });
  });
  const mockStoreUserData = jest.fn();
  const mockSignIn = jest.fn();

  beforeEach(() => {
    (useSignUpMutation as jest.Mock).mockReturnValue({
      mutate: mockSignUp,
      isPending: false,
      isError: false,
      error: null,
    });

    (useSignInMutation as jest.Mock).mockReturnValue({
      mutate: mockSignIn,
      isPending: false,
      isError: false,
      error: null,
    });

    (useStoreUserDataMutation as jest.Mock).mockReturnValue({
      mutate: mockStoreUserData,
    });

    (useSearchParams as jest.Mock).mockReturnValue([
      { get: (key: string) => (key === "mode" ? "login" : null) },
    ]);
  });

  test("renders login form by default", () => {
    render(
      <MemoryRouter>
        <AuthForm />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Log in/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("renders registration form when mode is signup", () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      { get: (key: string) => (key === "mode" ? "signup" : null) },
    ]);

    render(
      <MemoryRouter>
        <AuthForm />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Register/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/User Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Position/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Register/i })
    ).toBeInTheDocument();
  });

  test("validates missing fields before submission", async () => {
    render(
      <MemoryRouter>
        <AuthForm />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  test("calls sign-in mutation when login form is submitted correctly", async () => {
    render(
      <MemoryRouter>
        <AuthForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "123456789" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "123456789",
      });
    });
  });

  test("calls sign-up mutation when registration form is submitted correctly", async () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      { get: (key: string) => (key === "mode" ? "signup" : null) },
    ]);

    render(
      <MemoryRouter>
        <AuthForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "m123456789" },
    });
    fireEvent.change(screen.getByLabelText(/User Name/i), {
      target: { value: "Mohamed Ali" },
    });
    fireEvent.change(screen.getByLabelText(/Location/i), {
      target: { value: "Cairo" },
    });
    fireEvent.change(screen.getByLabelText(/Position/i), {
      target: { value: "React Developer" },
    });
    fireEvent.change(screen.getByLabelText(/Bio/i), {
      target: { value: "This is test bio." },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "m123456789",
        name: "Mohamed Ali",
        location: "Cairo",
        position: "React Developer",
        bio: "This is test bio.",
      });
      expect(mockStoreUserData).toHaveBeenCalledWith({
        userId: "678",
        filteredData: expect.any(Object),
      });
    });
  });

  test("displays error message when login fails", async () => {
    (useSignInMutation as jest.Mock).mockReturnValue({
      mutate: mockSignIn,
      isPending: false,
      isError: true,
      error: { code: "auth/wrong-password", message: "Incorrect password" },
    });

    render(
      <MemoryRouter>
        <AuthForm />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Incorrect password/i)).toBeInTheDocument();
    });
  });

  test("displays error message when registration fails", async () => {
    (useSignUpMutation as jest.Mock).mockReturnValue({
      mutate: mockSignUp,
      isPending: false,
      isError: true,
      error: {
        code: "auth/email-already-in-use",
        message: "Email already exists",
      },
    });

    (useSearchParams as jest.Mock).mockReturnValue([
      { get: (key: string) => (key === "mode" ? "signup" : null) },
    ]);

    render(
      <MemoryRouter>
        <AuthForm />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/This email is already registered./i)
      ).toBeInTheDocument();
    });
  });
});
