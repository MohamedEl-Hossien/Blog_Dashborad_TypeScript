import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingIndicator } from "../";
import type { RootState } from "../../store";
import classes from "./GetStarted.module.css";

/**
 * The `GetStarted` component provides an introduction to the blog dashboard.
 * It displays a welcome message and guides users on navigation options.
 * If the app is loading, it shows a loading indicator.
 *
 * @component
 * @returns {JSX.Element} The welcome message or a loading indicator.
 */
const GetStarted: React.FC = () => {
  /**
   * Retrieves loading state from Redux store to determine if content should be displayed.
   * @constant
   */
  const isLoading = useSelector((state: RootState) => state.loading);

  return (
    <>
      {!isLoading ? (
        <div className={classes.getStarted}>
          <h1>Welcome to the Blog Dashboard</h1>
          <p>
            Welcome to our blog! To get started, you can create a new post or
            explore existing ones. Use the navigation menu to find your way
            around.
          </p>
          <p>
            If you're new here, we recommend checking out our
            <Link className={classes.start} to="/posts">
              Posts
            </Link>
            section to see what others are writing about.
          </p>
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default GetStarted;
