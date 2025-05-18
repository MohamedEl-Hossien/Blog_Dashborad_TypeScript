import React from "react";
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { LoadingIndicator, Input } from "../";
import {
  signUpValidation,
  signInValidation,
  ERROR_MESSAGES,
  type FormData,
} from "../../utils";
import {
  useSignUpMutation,
  useSignInMutation,
  useStoreUserDataMutation,
} from "../../queries";
import classes from "./AuthForm.module.css";

/**
 * The `AuthForm` component handles user authentication.
 * Supports both login and registration, including validation and error handling.
 *
 * @component
 * @returns {JSX.Element} The authentication form with dynamic fields based on the mode.
 */
const AuthForm: React.FC = () => {
  /**
   * State for managing validation errors.
   * @constant
   */
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Retrieves query parameters to determine if the form is for login or registration.
   * @constant
   */
  const [searchParams] = useSearchParams();
  const isLogin: boolean = searchParams.get("mode") === "login";

  /**
   * Mutation for storing additional user data upon registration.
   * On success, redirects to the dashboard.
   *
   * @constant
   */
  const storeUserDataMutation = useStoreUserDataMutation();

  /**
   * Mutation for user registration.
   * On success, stores additional user details in the database.
   *
   * @constant
   */
  const signUpMutation = useSignUpMutation(storeUserDataMutation);

  /**
   * Mutation for user login.
   * On success, redirects the user to the dashboard.
   *
   * @constant
   */
  const signInMutation = useSignInMutation();

  /**
   * Handles form submission and performs validation before authentication.
   *
   * @function
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as FormData;

    let validationErrors: { [key: string]: string };
    if (isLogin) {
      validationErrors = signInValidation(data);
    } else {
      validationErrors = signUpValidation(data);
    }

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      if (isLogin) {
        signInMutation.mutate(data);
      } else {
        signUpMutation.mutate(data);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <form onSubmit={handleAuth} className={classes.form}>
        <h2>{isLogin ? "Log in" : "Register"}</h2>
        <Input
          label="Email"
          name="email"
          type="email"
          error={errors?.email ?? ""}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          error={errors?.password ?? ""}
        />
        {!isLogin && (
          <>
            <Input
              label="User Name"
              name="name"
              type="text"
              error={errors?.name ?? ""}
            />
            <Input
              label="Location"
              name="location"
              type="text"
              error={errors?.location ?? ""}
            />
            <Input
              label="Position"
              name="position"
              type="text"
              error={errors?.position ?? ""}
            />
            <Input
              label="Bio"
              name="bio"
              type="text"
              textArea
              rows={5}
              error={errors?.bio ?? ""}
            />
          </>
        )}
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Register" : "Login"}
          </Link>
          <button disabled={signUpMutation.isPending}>
            {signUpMutation.isPending
              ? "Submitting..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </div>
      </form>
      {(signInMutation.isPending || signUpMutation.isPending) && (
        <>
          <p className={classes.loading}>
            {isLogin ? "Signing In..." : "Signing Up..."}
          </p>
          <LoadingIndicator />
        </>
      )}
      {signInMutation.isError && (
        <p className={classes.error}>
          {ERROR_MESSAGES[signInMutation.error?.code] ??
            "Failed to login. An unknown error occurred."}
        </p>
      )}
      {signUpMutation.isError && (
        <p className={classes.error}>
          {ERROR_MESSAGES[signUpMutation.error?.code] ??
            "Failed to register. An unknown error occurred."}
        </p>
      )}
    </>
  );
};

export default AuthForm;
