import {
  fetchPosts,
  fetchPostsByUserId,
  fetchPostByPostId,
  fetchUserInfo,
  storeUserData,
  createNewPost,
  updatePost,
  deletePost,
} from "./requests";
import { get, push, set, remove } from "firebase/database";

jest.mock("firebase/database", () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  get: jest.fn(),
  push: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

describe("Firebase Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch all posts and flatten structure", async () => {
    const mockSnapshot = {
      exists: () => true,
      val: () => ({
        group1: { post1: { content: "Hello" }, post2: { content: "World" } },
      }),
    };
    (get as jest.Mock).mockResolvedValue(mockSnapshot);

    const result = await fetchPosts();
    expect(result).toEqual([
      { groupKey: "group1-post1", id: "post1", content: "Hello" },
      { groupKey: "group1-post2", id: "post2", content: "World" },
    ]);
  });

  test("should return empty array when no posts exist", async () => {
    (get as jest.Mock).mockResolvedValue({ exists: () => false });

    const result = await fetchPosts();
    expect(result).toEqual([]);
  });

  test("should fetch posts by user ID", async () => {
    const mockSnapshot = {
      exists: () => true,
      val: () => ({ post1: { content: "User Post" } }),
    };
    (get as jest.Mock).mockResolvedValue(mockSnapshot);

    const result = await fetchPostsByUserId({ userId: "123" });
    expect(result).toEqual([{ groupKey: "post1", content: "User Post" }]);
  });

  test("should fetch a specific post by user ID and post ID", async () => {
    const mockSnapshot = {
      exists: () => true,
      val: () => ({ content: "Specific Post" }),
    };
    (get as jest.Mock).mockResolvedValue(mockSnapshot);

    const result = await fetchPostByPostId({ userId: "123", postId: "456" });
    expect(result).toEqual({ content: "Specific Post" });
  });

  test("should store user data in Firebase", async () => {
    await storeUserData({
      userId: "123",
      filteredData: {
        email: "test@example.com",
        password: "securePass",
        name: "Test User",
        location: "Test Location",
        position: "Test Position",
        bio: "Test Bio",
      },
    });
    expect(push).toHaveBeenCalled();
    expect(set).toHaveBeenCalled();
  });

  test("should fetch user information by user ID", async () => {
    const mockSnapshot = {
      exists: () => true,
      val: () => [{ userId: "123", name: "Alice", email: "alice@example.com" }],
    };
    (get as jest.Mock).mockResolvedValue(mockSnapshot);

    const result = await fetchUserInfo({ userId: "123" });
    console.log(result);

    expect(result).toEqual({
      userId: "123",
      name: "Alice",
      email: "alice@example.com",
    });
    expect(get).toHaveBeenCalled();
  });

  test("should return null if user information does not exist", async () => {
    (get as jest.Mock).mockResolvedValue({ exists: () => false });

    const result = await fetchUserInfo({ userId: "456" });

    expect(result).toBeNull();
  });

  test("should create a new post", async () => {
    await createNewPost({
      userId: "123",
      data: {
        title: "New Post",
        author: "Mohamed Ali",
        date: "12-05-2025",
        content: "Test Content",
      },
    });
    expect(push).toHaveBeenCalled();
    expect(set).toHaveBeenCalled();
  });

  test("should update an existing post", async () => {
    await updatePost({
      userId: "123",
      postId: "456",
      data: {
        title: "Updated Post",
        author: "Mohamed Ali",
        date: "12-05-2025",
        content: "Test Content",
      },
    });
    expect(set).toHaveBeenCalled();
  });

  test("should delete a post", async () => {
    await deletePost({ userId: "123", postId: "456" });
    expect(remove).toHaveBeenCalled();
  });
});
