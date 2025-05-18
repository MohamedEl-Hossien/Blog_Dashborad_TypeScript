import { PostsList, LoadingIndicator, ErrorBlock } from "../components";
import { useAllPostsQuery } from "../queries";

/**
 * The component responsible for displaying all posts.
 * Fetches post data using React Query, handles loading and error states, and sorts posts by date.
 *
 * @component
 * @returns {JSX.Element} The rendered list of posts, loading indicator, or error block.
 */
export default function AllPosts() {
  /**
   * Fetches posts using custom query hook.
   */
  const { data, isPending, isError, error } = useAllPostsQuery();

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
      <h1>All Posts</h1>
      <PostsList posts={data} />
    </div>
  );
}
