import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeletePostMutation } from "../../queries/postMutations";
import { type FlattenedPost } from "../../utils";
import type { RootState } from "../../store";
import classes from "./PostsList.module.css";

/**
 * The component responsible for displaying a list of posts.
 * Provides options for editing and deleting posts if the user is authenticated and on the dashboard.
 *
 * @component
 * @param {{ posts: FlattenedPost[], from?: string }} props - The posts to display and optional source context.
 * @returns {JSX.Element} The rendered list of posts with available actions.
 */
const PostsList: React.FC<{ posts: FlattenedPost[]; from?: string }> = ({
  posts,
  from,
}) => {
  /**
   * Retrieves authentication status and current user details from Redux state.
   * @constant
   */
  const isLoggedIn = useSelector((state: RootState) => state.isAuthenticated);
  const currentUser = useSelector((state: RootState) => state.currentUser);

  /**
   * Deletes a post using React Query's mutation function.
   * Invalidates the post cache and redirects to the dashboard upon success.
   *
   * @constant
   */
  const { mutate } = useDeletePostMutation();

  /**
   * Handles post deletion with a confirmation prompt.
   *
   * @function
   * @param {string} postId - The ID of the post to delete.
   */
  function handleDeletePost(postId: string) {
    const userId = currentUser?.uid;
    const response = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (response && userId) {
      mutate({ userId, postId });
    }
  }

  return (
    <>
      {posts && posts.length > 0 ? (
        <div className={classes.postsContainer}>
          {posts.map((post) => (
            <div className={classes.post} key={post.groupKey}>
              <div className={classes.postHeader}>
                <h2>{post.title}</h2>
                <p className={classes.author}>Author: {post.author}</p>
                <p className={classes.date}>
                  Date: {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
              <p className={classes.content}>{post.content}</p>
              <div className={classes.actions}>
                {isLoggedIn && from === "dashboard" && (
                  <>
                    <Link
                      className={classes.edit}
                      to={`/dashboard/${post.groupKey}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      className={classes.delete}
                      onClick={() => handleDeletePost(post.groupKey)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={classes.emptyPosts}>No Posts Available</p>
      )}
    </>
  );
};

export default PostsList;
