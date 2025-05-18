import { getDatabase, ref, get, push, set, remove } from "firebase/database";
import { QueryClient } from "@tanstack/react-query";
import type {
  FormData,
  PostData,
  PostsGroups,
  PostGroup,
  FlattenedPost,
  UserData,
} from "../utils";

/**
 * Initializes the query client for caching and state management.
 * @constant {QueryClient}
 */
export const queryClient = new QueryClient();

/**
 * Fetches all posts from Firebase, flattens the grouped structure, and returns an array.
 * @async
 * @returns {Promise<FlattenedPost[]>} Array of flattened post objects.
 */
export async function fetchPosts(): Promise<FlattenedPost[]> {
  const db = getDatabase();
  const postsRef = ref(db, "posts/");
  const snapshot = await get(postsRef);
  if (snapshot.exists()) {
    const data: PostsGroups = snapshot.val();
    const postsArray: FlattenedPost[] = Object.entries(data).flatMap(
      ([groupKey, groupObj]) =>
        Object.entries(groupObj).map(([id, item]) => ({
          groupKey: `${groupKey}-${id}`,
          id,
          ...item,
        }))
    );
    return postsArray;
  }
  return [];
}

/**
 * Fetches all posts created by a specific user.
 * @async
 * @param {{ userId: string }} params - Object containing the user's ID.
 * @returns {Promise<FlattenedPost[]>} Array of posts authored by the user.
 */
export async function fetchPostsByUserId({
  userId,
}: {
  userId: string;
}): Promise<FlattenedPost[]> {
  const db = getDatabase();
  const postsRef = ref(db, `posts/${userId}`);
  const snapshot = await get(postsRef);
  if (snapshot.exists()) {
    const data: PostGroup = snapshot.val();
    return Object.entries(data).map(([id, item]) => ({
      groupKey: id,
      ...item,
    }));
  }
  return [];
}

/**
 * Fetches a specific post using the user and post IDs.
 * @async
 * @param {{ userId: string, postId: string }} params - Object containing the user and post IDs.
 * @returns {Promise<PostData | null>} The post data if found, otherwise null.
 */
export async function fetchPostByPostId({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}): Promise<PostData | null> {
  const db = getDatabase();
  const postsRef = ref(db, `posts/${userId}/${postId}`);
  const snapshot = await get(postsRef);
  return snapshot.exists() ? (snapshot.val() as PostData) : null;
}

/**
 * Fetches user information from Firebase.
 * @async
 * @param {{ userId: string }} params - Object containing the user's ID.
 * @returns {Promise<UserData | null>} User data object if found, otherwise null.
 */
export async function fetchUserInfo({
  userId,
}: {
  userId: string;
}): Promise<UserData | null> {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  return snapshot.exists()
    ? (Object.values(snapshot.val())[0] as UserData)
    : null;
}

/**
 * Stores user data in Firebase under the "users" node.
 * @async
 * @param {{ userId: string, filteredData: FormData }} params - Object containing user ID and filtered data.
 */
export async function storeUserData({
  userId,
  filteredData,
}: {
  userId: string;
  filteredData: FormData;
}): Promise<void> {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  const newUserRef = push(userRef);
  await set(newUserRef, filteredData);
}

/**
 * Creates a new post in Firebase under the user's posts.
 * @async
 * @param {{ userId: string, data: PostData }} params - Object containing user ID and post data.
 */
export async function createNewPost({
  userId,
  data,
}: {
  userId: string;
  data: PostData;
}): Promise<void> {
  const db = getDatabase();
  const postRef = ref(db, `posts/${userId}`);
  const newPostRef = push(postRef);
  await set(newPostRef, data);
}

/**
 * Updates an existing post in Firebase.
 * @async
 * @param {{ userId: string, postId: string, data: PostData }} params - Object containing user ID, post ID, and updated data.
 */
export async function updatePost({
  userId,
  postId,
  data,
}: {
  userId: string;
  postId: string;
  data: PostData;
}): Promise<void> {
  const db = getDatabase();
  const postRef = ref(db, `posts/${userId}/${postId}`);
  await set(postRef, data);
}

/**
 * Deletes a post from Firebase.
 * @async
 * @param {{ userId: string, postId: string }} params - Object containing user ID and post ID.
 */
export async function deletePost({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}): Promise<void> {
  const db = getDatabase();
  const postRef = ref(db, `posts/${userId}/${postId}`);
  await remove(postRef);
}
