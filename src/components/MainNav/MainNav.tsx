import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../../queries/authMutations";
import { ErrorBlock } from "../";
import { authActions, type RootState } from "../../store";
import { ERROR_MESSAGES } from "../../utils";
import classes from "./MainNav.module.css";

/**
 * The main navigation component for the application.
 * Provides links to different sections and handles authentication status.
 * Includes a mobile menu toggle and logout functionality.
 *
 * @component
 * @returns {JSX.Element} The rendered navigation menu with dynamic styling.
 */
const MainNav: React.FC = () => {
  /**
   * React Router navigation instance for redirects.
   * @constant
   */
  const navigate = useNavigate();

  /**
   * Redux dispatch function for managing authentication state.
   * @constant
   */
  const dispatch = useDispatch();

  /**
   * React Router location instance to detect route changes.
   * @constant
   */
  const location = useLocation();

  /**
   * Manages the open/closed state of the mobile menu.
   * @constant
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /**
   * Retrieves authentication status from Redux store.
   * @constant
   */
  const isLoggedIn = useSelector((state: RootState) => state.isAuthenticated);

  /**
   * Closes the navigation menu when the route changes.
   * @effect
   */
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  /**
   * Handles user logout using Firebase authentication.
   * On success, clears user session and redirects to the login page.
   *
   * @constant
   */
  const { mutate, isError, error } = useLogoutMutation(() => {
    dispatch(authActions.clearUser());
    navigate("/auth?mode=login");
  });

  /**
   * Toggles the mobile navigation menu visibility.
   *
   * @function
   */
  function handleToggleNav() {
    setIsOpen((prevState) => !prevState);
  }

  /**
   * Handles user logout event.
   * Prevents default behavior and triggers mutation.
   *
   * @function
   * @param {React.MouseEvent} event - The logout button click event.
   */
  function handleLogout(event: React.MouseEvent) {
    event.preventDefault();
    mutate();
  }

  if (isError) {
    return (
      <ErrorBlock
        title="An error occurred"
        message={error.code ? ERROR_MESSAGES[error.code] : "Failed to logout"}
      >
        {error.message}
      </ErrorBlock>
    );
  }

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div
          className={classes.menuIcon}
          onClick={handleToggleNav}
          role="menuIcon"
        >
          &#9776;
        </div>
        <ul className={`${classes.navLinks} ${isOpen ? classes.open : ""}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Dashboard
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Login
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNav;
