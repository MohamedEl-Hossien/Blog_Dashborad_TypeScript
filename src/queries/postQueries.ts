import { useQuery } from "@tanstack/react-query";
import {
  fetchPosts,
  fetchPostsByUserId,
  fetchPostByPostId,
  type FlattenedPost,
  type PostData,
} from "../utils";

/**
 * Custom hook to fetch all posts using React Query.
 */
export function useAllPostsQuery() {
  return useQuery<FlattenedPost[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
}

/**
 * Custom hook to fetch posts for a specific user.
 * @param userId The user's unique ID.
 * @param enabled Whether the query should run.
 */
export function useUserPostsQuery(userId: string, enabled: boolean) {
  return useQuery<FlattenedPost[], Error>({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostsByUserId({ userId }),
    enabled,
  });
}

/**
 * Custom hook to fetch a single post by userId and postId.
 */
export function usePostByPostIdQuery(
  userId: string | undefined,
  postId: string | undefined,
  enabled: boolean
) {
  return useQuery<PostData | null, Error>({
    queryKey: ["posts", userId, postId],
    queryFn: () => {
      if (!userId || !postId) {
        throw new Error("User ID or Post ID is undefined");
      }
      return fetchPostByPostId({ userId, postId });
    },
    enabled,
  });
}
