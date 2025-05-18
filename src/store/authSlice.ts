import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, StateTypes } from "../utils";

/**
 * Initial authentication state configuration.
 */
const initialState: StateTypes = {
  isAuthenticated: false,
  currentUser: null,
  loading: true,
};

/**
 * Redux slice managing authentication state.
 */
export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    /**
     * Sets the authenticated user details.
     * @param {StateTypes} state - Current authentication state.
     * @param {PayloadAction<{ isAuthenticated: boolean; currentUser: User | null }>} action - Payload containing authentication status and user details.
     */
    setUser(
      state,
      action: PayloadAction<{
        isAuthenticated: boolean;
        currentUser: User | null;
      }>
    ) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.currentUser = action.payload.currentUser;
    },

    /**
     * Clears the user authentication state (logs out user).
     * @param {StateTypes} state - Current authentication state.
     */
    clearUser(state) {
      state.isAuthenticated = false;
      state.currentUser = null;
    },

    /**
     * Updates the loading state for authentication operations.
     * @param {StateTypes} state - Current authentication state.
     * @param {PayloadAction<boolean>} action - Boolean indicating loading state.
     */
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});
