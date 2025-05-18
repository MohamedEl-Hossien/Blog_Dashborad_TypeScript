import { useMutation } from "@tanstack/react-query";
import {
  createNewPost,
  updatePost,
  deletePost,
  queryClient,
  type AuthError,
  type PostData,
} from "../utils";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for creating a new post.
 */
export function useCreateNewPostMutation() {
  const navigate = useNavigate();
  return useMutation<void, AuthError, { userId: string; data: PostData }>({
    mutationFn: createNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/dashboard");
    },
  });
}

/**
 * Custom hook for updating an existing post.
 */
export function useUpdatePostMutation() {
  const navigate = useNavigate();
  return useMutation<
    void,
    AuthError,
    { userId: string; postId: string; data: PostData }
  >({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/dashboard");
    },
  });
}

/**
 * Custom hook for deleting a post.
 * Invalidates the post cache and redirects to the dashboard upon success.
 */
export function useDeletePostMutation() {
  const navigate = useNavigate();
  return useMutation<void, AuthError, { userId: string; postId: string }>({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/dashboard");
    },
  });
}
