import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostsNav from "./";

describe("PostsNav Component", () => {
  test("renders nav posts links without errors", () => {
    render(
      <MemoryRouter>
        <PostsNav />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("contains two navigation links", () => {
    render(
      <MemoryRouter>
        <PostsNav />
      </MemoryRouter>
    );
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  test("All Posts link has correct text and points to correct route", () => {
    render(
      <MemoryRouter>
        <PostsNav />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("link", { name: /All Posts/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /All Posts/i })).toHaveAttribute(
      "href",
      "/"
    );
  });

  test("New Post link has correct text and points to correct route", () => {
    render(
      <MemoryRouter>
        <PostsNav />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /new post/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /new post/i })).toHaveAttribute(
      "href",
      "/new"
    );
  });

  test("All Posts link should have active class when on /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PostsNav />
      </MemoryRouter>
    );
    const allPostsLink = screen.getByRole("link", { name: /All Posts/i });
    expect(allPostsLink).toHaveClass("active");
  });

  test("New Post link should have active class when on /new", () => {
    render(
      <MemoryRouter initialEntries={["/new"]}>
        <PostsNav />
      </MemoryRouter>
    );
    const newPostLink = screen.getByRole("link", { name: /New Post/i });
    expect(newPostLink).toHaveClass("active");
  });
});
