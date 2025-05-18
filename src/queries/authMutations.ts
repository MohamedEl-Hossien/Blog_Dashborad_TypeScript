import { useMutation } from "@tanstack/react-query";
import { logIn, signUp, logOut } from "../firebase";
import {
  storeUserData,
  type FormData,
  type AuthError,
  type StoredData,
} from "../utils";
import type { UserCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for logging out the user.
 * @param onSuccess Optional callback for successful logout.
 */
export function useLogoutMutation(onSuccess?: () => void) {
  return useMutation<void, AuthError>({
    mutationFn: logOut,
    onSuccess,
  });
}

/**
 * Custom hook for user registration.
 * On success, stores additional user details in the database.
 */
export function useSignUpMutation(
  storeUserDataMutation: ReturnType<typeof useStoreUserDataMutation>
) {
  return useMutation<UserCredential, AuthError, FormData>({
    mutationFn: signUp,
    onSuccess: (authResult, data) => {
      const filteredData = { ...data };
      if ("password" in filteredData) {
        delete (filteredData as { password?: string }).password;
      }
      const userId: string = authResult.user.uid;
      storeUserDataMutation.mutate({ userId, filteredData });
    },
  });
}

/**
 * Custom hook for user login.
 * On success, redirects the user to the dashboard.
 */
export function useSignInMutation() {
  const navigate = useNavigate();
  return useMutation<UserCredential, AuthError, FormData>({
    mutationFn: logIn,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });
}

/**
 * Custom hook for storing additional user data upon registration.
 * On success, redirects to the dashboard.
 */
export function useStoreUserDataMutation() {
  const navigate = useNavigate();
  return useMutation<void, AuthError, StoredData>({
    mutationFn: storeUserData,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });
}
