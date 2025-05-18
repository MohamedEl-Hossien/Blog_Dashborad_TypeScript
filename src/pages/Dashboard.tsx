import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useUserPostsQuery } from "../queries";
import {
  ProfileInfo,
  PostsList,
  LoadingIndicator,
  ErrorBlock,
} from "../components";
import type { RootState } from "../store";

/**
 * The dashboard component that displays user-specific posts and profile information.
 * It ensures that only authenticated users can access the dashboard.
 *
 * @component
 * @returns {JSX.Element} The dashboard with profile information and posts, or a navigation redirect.
 */
export default function Dashboard() {
  /**
   * Extracts authentication status and current user details from Redux state.
   * @constant
   */
  const isLoggedIn = useSelector((state: RootState) => state.isAuthenticated);
  const currentUser = useSelector((state: RootState) => state.currentUser);

  /**
   * Fetches posts for the current user using custom query hook.
   * Data is only fetched if the user is authenticated.
   *
   */
  const { data, isPending, isError, error } = useUserPostsQuery(
    currentUser?.uid || "",
    isLoggedIn
  );

  // Redirects unauthorized users to the login page.
  if (!isLoggedIn) {
    return <Navigate to="/auth?mode=login" />;
  }

  // Displays a loading indicator while fetching posts.
  if (isPending) {
    return <LoadingIndicator />;
  }

  // Handles errors during post fetching.
  if (isError) {
    return (
      <ErrorBlock
        title="An error occurred"
        message={error?.message || "Failed to fetch posts"}
      >
        {error.message}
      </ErrorBlock>
    );
  }

  // Sorts posts by date in descending order if data is available.
  if (data) {
    data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <ProfileInfo />
      <h2>Your Posts</h2>
      <PostsList posts={data} from="dashboard" />
    </div>
  );
}
