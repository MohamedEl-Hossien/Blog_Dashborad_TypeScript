import { Outlet } from "react-router-dom";
import { PostsNav } from "../components";

/**
 * The root layout component for managing post-related routes.
 * It includes the navigation bar and dynamically renders nested routes.
 *
 * @component
 * @returns {JSX.Element} The rendered post navigation and route outlet.
 */
export default function PostRoot() {
  return (
    <>
      <PostsNav />
      <Outlet />
    </>
  );
}
