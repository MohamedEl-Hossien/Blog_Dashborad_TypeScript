import { auth } from "./";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential,
} from "firebase/auth";
import type { FormData } from "../utils";

/**
 * Retrieves the authentication token from local storage.
 * If no token exists, returns `null`.
 *
 * @function
 * @returns {string | null} The stored authentication token or `null` if unavailable.
 */
export function getAuthToken(): string | null {
  const token: string | null = localStorage.getItem("firebaseToken");

  if (!token) {
    return null;
  }

  return token;
}

/**
 * Registers a new user using Firebase authentication.
 *
 * @async
 * @function
 * @param {FormData} data - The user's sign-up details.
 * @returns {Promise<UserCredential>} The Firebase user credential on successful sign-up.
 */
export const signUp = async (data: FormData): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, data.email, data.password);
};

/**
 * Logs in a user using Firebase authentication.
 *
 * @async
 * @function
 * @param {FormData} data - The user's login credentials.
 * @returns {Promise<UserCredential>} The Firebase user credential on successful login.
 */
export const logIn = async (data: FormData): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, data.email, data.password);
};

/**
 * Logs out the current user from Firebase authentication.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the user is signed out.
 */
export const logOut = (): Promise<void> => {
  return auth.signOut();
};
