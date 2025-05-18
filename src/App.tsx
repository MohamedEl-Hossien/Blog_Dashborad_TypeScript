import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  MainRoot,
  Home,
  AllPosts,
  Login,
  PostEdit,
  PostsRoot,
  NewPost,
  Dashboard,
  ErrorPage,
} from "./pages";
import { queryClient } from "./utils";
import { initAuthListener } from "./store";

/**
 * Creates a router configuration using `react-router-dom` with nested routes.
 * The router includes paths for authentication, posts, and dashboard features.
 *
 * @constant
 */
const router = createHashRouter([
  {
    path: "/",
    element: <MainRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <Login />,
      },
      {
        path: "posts",
        element: <PostsRoot />,
        children: [
          {
            index: true,
            element: <AllPosts />,
          },
          {
            path: "new",
            element: <NewPost />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/:postId/edit",
        element: <PostEdit />,
      },
    ],
  },
]);

/**
 * The main application component responsible for initializing authentication
 * and providing global query and routing configurations.
 *
 * @component
 * @returns {JSX.Element} The rendered application with routing and query client providers.
 */
function App() {
  initAuthListener();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
