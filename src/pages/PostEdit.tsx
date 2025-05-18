import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { PostForm, LoadingIndicator, ErrorBlock } from "../components";
import { usePostByPostIdQuery } from "../queries/postQueries";
import { type RootState } from "../store";

/**
 * The component responsible for editing an existing post.
 * It fetches post data based on `postId` and `userId`, handling loading and error states.
 * If the user is not logged in, they are redirected to the authentication page.
 *
 * @component
 * @returns {JSX.Element} The rendered post edit form, loading indicator, error block, or navigation.
 */
const PostEdit: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isAuthenticated);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const userId = currentUser?.uid;
  const param = useParams();
  const postId = param.postId;

  /**
   * Fetches post data using custom query hook.
   * Disables the query when `currentUser` is `null`.
   */
  const { data, isPending, isError, error } = usePostByPostIdQuery(
    userId,
    postId,
    currentUser !== null
  );

  // Redirects unauthorized users to the login page.
  if (!isLoggedIn) {
    return <Navigate to="/auth?mode=login" />;
  }

  let content;

  // Displays loading state while fetching the post.
  if (isPending) {
    content = <LoadingIndicator />;
  }

  // Handles errors during post fetching.
  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error?.message || "Failed to fetch the post"}
      >
        {error.message}
      </ErrorBlock>
    );
  }

  // Displays the post edit form if data is available.
  if (data) {
    content = <PostForm post={data} />;
  }

  return <div>{content}</div>;
};

export default PostEdit;
