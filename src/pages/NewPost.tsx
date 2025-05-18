import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PostForm } from "../components";
import type { RootState } from "../store";

/**
 * The component responsible for rendering a form to create a new post.
 * Redirects the user to the authentication page if they are not logged in.
 *
 * @component
 * @returns {JSX.Element} The post creation form or a navigation redirect.
 */
const NewPost: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isAuthenticated);

  // Redirects unauthorized users to the login page.
  if (!isLoggedIn) {
    return <Navigate to="/auth?mode=login" />;
  }

  // Displays the post creation form.
  return <PostForm method="new" />;
};

export default NewPost;
