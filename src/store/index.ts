import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import type { User } from "../utils";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

/**
 * Authentication actions from the Redux slice.
 */
export const authActions = authSlice.actions;

/**
 * Authentication reducer from the Redux slice.
 */
export const authReducer = authSlice.reducer;

/**
 * Configures and exports the Redux store for the application.
 *
 * The store is created using the `configureStore` method from Redux Toolkit,
 * and it is initialized with a single reducer, `authReducer`, which is responsible
 * for handling authentication-related state.
 *
 * @constant
 */
export const store = configureStore({
  reducer: authReducer,
});

/**
 * Initializes the authentication state listener using Firebase's `onAuthStateChanged` method.
 * This function listens for changes in the user's authentication state and updates the application state accordingly.
 *
 * - If a user is authenticated:
 *   - Retrieves the user's UID and email.
 *   - Fetches the user's ID token and stores it in `localStorage` under the key `firebaseToken`.
 *   - Dispatches an action to update the Redux store with the user's information and sets `isAuthenticated` to `true`.
 * - If no user is authenticated:
 *   - Removes the `firebaseToken` from `localStorage`.
 *   - Dispatches an action to clear the user information from the Redux store.
 *
 * Regardless of the authentication state, it dispatches an action to set the loading state to `false`.
 *
 * @returns {void} This function does not return a value.
 */
export const initAuthListener = () =>
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      /**
       * Represents the authenticated user.
       * @constant
       */
      const currentUser: User = {
        uid: user.uid,
        email: user.email,
      };

      /** Retrieves Firebase authentication token */
      const token = await user.getIdToken();
      localStorage.setItem("firebaseToken", token);

      /** Dispatches authentication status to Redux */
      store.dispatch(
        authActions.setUser({ currentUser, isAuthenticated: true })
      );
    } else {
      /** Removes Firebase token and clears authentication state */
      localStorage.removeItem("firebaseToken");
      store.dispatch(authActions.clearUser());
    }

    /** Updates loading state */
    store.dispatch(authActions.setLoading(false));
  });

/**
 * Type representing the global state structure.
 */
export type RootState = ReturnType<typeof store.getState>;
