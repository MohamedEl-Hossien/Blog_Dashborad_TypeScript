import React from "react";
import type { JSX } from "react";
import classes from "./Input.module.css";

/**
 * A reusable input component for forms.
 * Supports both text inputs and textareas dynamically based on props.
 *
 * @component
 * @param {{ label: string, name: string, type: string, textArea?: boolean, rows?: number, error: string }} props - Input properties.
 * @returns {JSX.Element} The rendered input field with validation error messaging.
 */
const Input: React.FC<{
  label: string;
  name: string;
  type: string;
  textArea?: boolean;
  rows?: number;
  error: string;
}> = ({ label, name, type, textArea, error, ...props }) => {
  /**
   * Determines whether the input field should be a `textarea` or `input`.
   * @constant
   * @type {keyof JSX.IntrinsicElements}
   */
  const InputField: keyof JSX.IntrinsicElements = textArea
    ? "textarea"
    : "input";

  return (
    <div className={classes.control}>
      <label htmlFor={name}>{label}</label>
      <InputField id={name} type={type} name={name} required {...props} />
      {error && <p className={classes.controlError}>{error}</p>}
    </div>
  );
};

export default Input;
