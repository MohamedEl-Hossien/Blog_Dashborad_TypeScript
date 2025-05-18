import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateNewPostMutation, useUpdatePostMutation } from "../../queries";
import { LoadingIndicator, ErrorBlock } from "../";
import { postValidation, type PostData } from "../../utils";
import type { RootState } from "../../store";
import classes from "./PostForm.module.css";

/**
 * The `PostForm` component allows users to create or update a post.
 * It includes validation, error handling, and loading states.
 *
 * @component
 * @param {{ method?: string; post?: PostData }} props - Optional method and post data.
 * @returns {JSX.Element} The rendered form for creating or updating a post.
 */
const PostForm: React.FC<{ method?: string; post?: PostData }> = ({
  method,
  post,
}) => {
  /**
   * State for managing validation errors.
   * @constant
   */
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Retrieves current user details from Redux state.
   * @constant
   */
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const userId = currentUser?.uid;

  /**
   * Retrieves post ID from route parameters.
   * @constant
   */
  const param = useParams();
  const postId = param.postId;

  /**
   * React Router navigation instance.
   * @constant
   */
  const navigate = useNavigate();

  /**
   * Gets the current date in `YYYY-MM-DD` format.
   * @constant
   */
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  /**
   * Mutation for creating a new post.
   * @constant
   */
  const createNewPostMutation = useCreateNewPostMutation();

  /**
   * Mutation for updating an existing post.
   * @constant
   */
  const updatePostMutation = useUpdatePostMutation();

  /**
   * Handles form submission and validation.
   *
   * @function
   * @param {React.FormEvent} event - The form submission event.
   * @param {string} [method] - The method type (`new` or update).
   */
  function handleSubmitPost(
    event: React.FormEvent<HTMLFormElement>,
    method?: string
  ) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as PostData;
    const validationErrors = postValidation(data);
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      if (method === "new" && userId !== undefined) {
        createNewPostMutation.mutate({ userId, data });
      } else if (userId !== undefined && postId !== undefined) {
        updatePostMutation.mutate({ userId, postId, data });
      }
    } else {
      setErrors(validationErrors);
    }
  }

  /**
   * Cancels the post submission and redirects to the dashboard.
   *
   * @function
   */
  function cancelHandler() {
    navigate("/dashboard");
  }

  return (
    <>
      <form
        className={classes.form}
        onSubmit={(e) => handleSubmitPost(e, method)}
      >
        <div className={classes.control}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={post ? post.title : ""}
            maxLength={50}
          />
        </div>
        {errors.title && <p className={classes.controlError}>{errors.title}</p>}

        <div className={classes.control}>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            required
            defaultValue={post ? post.author : ""}
            readOnly={!method}
            maxLength={25}
          />
        </div>
        {errors.author && (
          <p className={classes.controlError}>{errors.author}</p>
        )}

        <div className={classes.control}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={method === "new" ? formattedDate : post ? post.date : ""}
            readOnly
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            rows={5}
            required
            defaultValue={post ? post.content : ""}
            maxLength={500}
          ></textarea>
        </div>
        {errors.content && (
          <p className={classes.controlError}>{errors.content}</p>
        )}

        <div className={classes.actions}>
          <button type="submit" className={classes.submit}>
            {method === "new" ? "Create Post" : "Update Post"}
          </button>
          <button
            type="button"
            className={classes.cancel}
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </form>

      {(createNewPostMutation.isPending || updatePostMutation.isPending) && (
        <>
          <p className={classes.loading}>
            {method === "new" ? "Creating Post..." : "Updating post..."}
          </p>
          <LoadingIndicator />
        </>
      )}

      {createNewPostMutation.isError && (
        <ErrorBlock
          title="An error occurred"
          message={
            createNewPostMutation.error.message ?? "Failed to create post"
          }
        />
      )}

      {updatePostMutation.isError && (
        <ErrorBlock
          title="An error occurred"
          message={updatePostMutation.error.message ?? "Failed to update post"}
        />
      )}
    </>
  );
};

export default PostForm;
