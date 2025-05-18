import React from "react";
import classes from "./LoadingIndicator.module.css";

/**
 * A loading indicator component that displays a ring animation.
 * Used to indicate a pending operation or data fetching status.
 *
 * @component
 * @returns {JSX.Element} The rendered loading animation.
 */
const LoadingIndicator: React.FC = () => {
  return (
    <div className={classes.ldsRing} role="status">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingIndicator;
