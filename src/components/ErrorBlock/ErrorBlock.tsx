import React from "react";
import classes from "./ErrorBlock.module.css";

/**
 * A reusable error message component.
 * Displays an error title and message inside a styled block.
 *
 * @component
 * @param {{ title: string; message: string; children?: string }} props - Error details and optional children.
 * @returns {JSX.Element} The rendered error block with an icon and message.
 */
const ErrorBlock: React.FC<{
  title: string;
  message: string;
  children?: string;
}> = ({ title, message, children }) => {
  return (
    <div className={classes.errorBlock} role="errorBlock">
      <div className={classes.errorBlockIcon}>!</div>
      <div className={classes.errorBlockText}>
        <h2>{title}</h2>
        <p>{message}</p>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default ErrorBlock;
