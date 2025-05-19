import { authSlice } from "./authSlice";
import type { StateTypes, User } from "../utils";

const { setUser, clearUser, setLoading } = authSlice.actions;

describe("authSlice Reducers", () => {
  let initialState: StateTypes;

  beforeEach(() => {
    initialState = {
      isAuthenticated: false,
      currentUser: null,
      loading: true,
    };
  });

  test("should set user authentication details correctly", () => {
    const mockUser: User = { uid: "123", email: "test@test.com" };
    const newState = authSlice.reducer(
      initialState,
      setUser({ isAuthenticated: true, currentUser: mockUser })
    );

    expect(newState.isAuthenticated).toBe(true);
    expect(newState.currentUser).toEqual(mockUser);
  });

  test("should clear user authentication details (logout)", () => {
    const stateWithUser: StateTypes = {
      isAuthenticated: true,
      currentUser: { uid: "123", email: "test@test.com" },
      loading: false,
    };

    const newState = authSlice.reducer(stateWithUser, clearUser());

    expect(newState.isAuthenticated).toBe(false);
    expect(newState.currentUser).toBeNull();
  });

  test("should update loading state", () => {
    const newState = authSlice.reducer(initialState, setLoading(false));
    expect(newState.loading).toBe(false);
  });
});
