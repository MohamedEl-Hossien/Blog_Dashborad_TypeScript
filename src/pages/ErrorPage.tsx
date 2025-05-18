import { Link, useRouteError } from "react-router-dom";
import { MainNav } from "../components";

/**
 * The error page component that displays error messages based on the status code.
 * It provides feedback for `500` (server error) and `404` (not found) responses.
 * Includes a navigation link back to the home page.
 *
 * @component
 * @returns {JSX.Element} The rendered error message and a link to return home.
 */
export default function ErrorPage() {
  /**
   * Retrieves the route error and extracts the status and message.
   * @constant
   * @type {{ status: number; data: string }}
   */
  const error = useRouteError() as { status: number; data: string };

  let title = "An Error Occurred!";
  let message = "Something Went Wrong!";

  // Handles server errors (500)
  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  // Handles resource not found errors (404)
  if (error.status === 404) {
    title = "Not Found";
    message = "Could not find resource";
  }

  return (
    <>
      <MainNav />
      <div>
        <h1>{title}</h1>
        <p>{message}</p>
        <Link to="/">Home</Link>
      </div>
    </>
  );
}
