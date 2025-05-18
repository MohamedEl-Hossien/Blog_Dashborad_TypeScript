import React from "react";
import { useSelector } from "react-redux";
import { useUserProfileQuery } from "../../queries";
import { LoadingIndicator, ErrorBlock } from "../";
import type { RootState } from "../../store";
import classes from "./ProfileInfo.module.css";

/**
 * The `ProfileInfo` component displays the authenticated user's profile information.
 * It fetches the user's details using React Query and handles loading and error states.
 *
 * @component
 * @returns {JSX.Element} The rendered profile information or an error/loading state.
 */
const ProfileInfo: React.FC = () => {
  /**
   * Retrieves the current user's details from Redux state.
   * @constant
   * @type {Object}
   */
  const currentUser = useSelector((state: RootState) => state.currentUser);

  /**
   * Fetches the authenticated user's profile information.
   */
  const { data, isPending, isError, error } = useUserProfileQuery(
    currentUser?.uid || "",
    currentUser !== null
  );

  let content;

  // Displays a loading indicator while fetching user data.
  if (isPending) {
    content = <LoadingIndicator />;
  }

  // Handles errors during data fetching.
  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error?.message || "Failed to fetch user information"}
      >
        {error.message}
      </ErrorBlock>
    );
  }

  // Displays the user's profile information if data is available.
  if (data) {
    content = (
      <div className={classes.userData}>
        <div className={classes.userDetails}>
          <p>
            <span>Name:</span> {data.name}
          </p>
          <p>
            <span>Email:</span> {data.email}
          </p>
          <p>
            <span>Position:</span> {data.position}
          </p>
          <p>
            <span>Location:</span> {data.location}
          </p>
        </div>
        <p className={classes.bio}>{data.bio}</p>
      </div>
    );
  }

  return (
    <div className={classes.profileInfo}>
      <h2>Profile Information</h2>
      {content}
    </div>
  );
};

export default ProfileInfo;
