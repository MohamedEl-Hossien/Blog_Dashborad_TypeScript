import { Navigate } from "react-router-dom";
import { AuthForm } from "../components";
import { getAuthToken } from "../firebase";

/**
 * The login component that handles authentication logic.
 * If the user is already authenticated, they are redirected to the posts page.
 * Otherwise, the authentication form is displayed.
 *
 * @component
 * @returns {JSX.Element} The authentication form or navigation redirect.
 */
export default function Login() {
  const token = getAuthToken();

  // Redirects authenticated users to the posts page.
  if (token !== null) {
    return <Navigate to="/posts" />;
  }

  // Displays the authentication form for login.
  return <AuthForm />;
}
