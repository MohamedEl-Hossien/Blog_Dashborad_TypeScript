import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import configureStore from "redux-mock-store";
import { useDeletePostMutation } from "../../queries";
import PostsList from "./";

// Mock React Query mutation
jest.mock("../../queries/postMutations", () => ({
  useDeletePostMutation: jest.fn(),
}));

// Create a mock Redux store
const mockStore = configureStore([]);
// Creates a Jest mock function for the delete post mutation.
// This mock replaces the actual function during tests, preventing API calls.
const mockDeletePost = jest.fn();

describe("PostsList Component", () => {
  beforeEach(() => {
    // Mocks the `useDeletePostMutation` hook to return our predefined mock function.
    // Ensures a fresh mock setup before each test to avoid state contamination.
    (useDeletePostMutation as jest.Mock).mockReturnValue({
      mutate: mockDeletePost,
    });

    // Always returns 'true' for confirmation
    jest.spyOn(window, "confirm").mockReturnValue(true);
  });

  test("shows 'No Posts Available' when no posts exist", () => {
    const store = mockStore({
      isAuthenticated: true,
      currentUser: { uid: "123" },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostsList posts={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No Posts Available/i)).toBeInTheDocument();
  });

  test("does not show delete button and edit link when authenticated and posts available but not from dashboard", () => {
    const store = mockStore({
      isAuthenticated: true,
      currentUser: { uid: "123" },
    });

    const mockPosts = [
      {
        groupKey: "1",
        title: "Test Post",
        author: "John Doe",
        date: new Date().toISOString(),
        content: "This is a test post",
      },
    ];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostsList posts={mockPosts} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Edit/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Delete/i)).not.toBeInTheDocument();
  });

  test("shows 'Edit' & 'Delete' buttons when authenticated, posts available and from dashboard", () => {
    const store = mockStore({
      isAuthenticated: true,
      currentUser: { uid: "123" },
    });

    const mockPosts = [
      {
        groupKey: "1",
        title: "Test Post",
        author: "John Doe",
        date: new Date().toISOString(),
        content: "This is a test post",
      },
    ];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostsList posts={mockPosts} from="dashboard" />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("link", { name: /Edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
  });

  test("calls delete function when clicking the delete button", async () => {
    const store = mockStore({
      isAuthenticated: true,
      currentUser: { uid: "123" },
    });

    const mockPosts = [
      {
        groupKey: "1",
        title: "Test Post",
        author: "John Doe",
        date: new Date().toISOString(),
        content: "This is a test post",
      },
    ];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostsList posts={mockPosts} from="dashboard" />
        </MemoryRouter>
      </Provider>
    );

    const deleteButton = screen.getByText(/Delete/i);
    await userEvent.click(deleteButton);

    expect(mockDeletePost).toHaveBeenCalledWith({ userId: "123", postId: "1" });
  });
});
