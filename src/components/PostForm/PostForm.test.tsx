import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { useCreateNewPostMutation, useUpdatePostMutation } from "../../queries";
import PostForm from "./";

// Mock React Query mutations
jest.mock("../../queries", () => ({
  useCreateNewPostMutation: jest.fn(),
  useUpdatePostMutation: jest.fn(),
}));

// Manually setting postId for edititing posts
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ postId: "456" }),
}));

// Create a mock Redux store
const mockStore = configureStore([]);

describe("PostForm Component", () => {
  const mockCreatePost = jest.fn();
  const mockUpdatePost = jest.fn();

  beforeEach(() => {
    (useCreateNewPostMutation as jest.Mock).mockReturnValue({
      mutate: mockCreatePost,
      isPending: false,
      isError: false,
      error: null,
    });

    (useUpdatePostMutation as jest.Mock).mockReturnValue({
      mutate: mockUpdatePost,
      isPending: false,
      isError: false,
      error: null,
    });
  });

  test("renders form fields correctly", () => {
    const store = mockStore({
      currentUser: { uid: "123" },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostForm method="new" />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content:/i)).toBeInTheDocument();
  });

  test("displays validation errors when fields are empty", async () => {
    const store = mockStore({
      currentUser: { uid: "123" },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostForm method="new" />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /Create Post/i });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Title must be/i)).toBeInTheDocument();
      expect(screen.getByText(/Author must be/i)).toBeInTheDocument();
      expect(screen.getByText(/Content must be/i)).toBeInTheDocument();
    });
  });

  test("calls create post mutation when form is submitted correctly", async () => {
    const store = mockStore({
      currentUser: { uid: "123" },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostForm method="new" />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Title:/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/Author:/i), {
      target: { value: "Mohamed Ali" },
    });
    fireEvent.change(screen.getByLabelText(/Date:/i), {
      target: { value: "18-5-2025" },
    });
    fireEvent.change(screen.getByLabelText(/Content:/i), {
      target: { value: "This is a test post." },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Create Post/i }));

    await waitFor(() => {
      expect(mockCreatePost).toHaveBeenCalledTimes(1);
      expect(mockCreatePost).toHaveBeenCalledWith({
        userId: "123",
        data: {
          title: "Test Title",
          author: "Mohamed Ali",
          content: "This is a test post.",
          date: expect.any(String),
        },
      });
    });
  });

  test("displays error block when create post mutation fails", async () => {
    (useCreateNewPostMutation as jest.Mock).mockReturnValue({
      mutate: mockCreatePost,
      isPending: false,
      isError: true,
      error: { code: "auth/network-error", message: "Failed to create post" },
    });

    const store = mockStore({
      currentUser: { uid: "123" },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostForm method="new" />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Create Post/i }));

    await waitFor(() => {
      expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
      expect(screen.getByText(/Failed to create post/i)).toBeInTheDocument();
    });
  });

  test("calls update post mutation when form is submitted correctly", async () => {
    const store = mockStore({
      currentUser: { uid: "123" },
    });

    const mockPost = {
      title: "Existing Post",
      author: "Mohamed Ali",
      date: "2025-05-18",
      content: "This is an existing post.",
    };

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["dashboard/456/edit"]}>
          <PostForm post={mockPost} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Update Post/i }));

    await waitFor(() => {
      expect(mockUpdatePost).toHaveBeenCalledWith({
        userId: "123",
        postId: "456",
        data: mockPost,
      });
    });
  });
});
