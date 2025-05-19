// import * as AuthFunctions from "./auth";
import { getAuthToken, signUp, logIn, logOut } from "./auth";
import { auth } from "./";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("./", () => ({
  auth: {
    signOut: jest.fn(),
  },
}));

describe("Authentication Functions", () => {
  beforeEach(() => {
    localStorage.clear();
    // jest.clearAllMocks();
  });

  // Test for getAuthToken
  test("should return token from localStorage", () => {
    const mockToken = "mockToken";
    localStorage.setItem("firebaseToken", mockToken);
    expect(getAuthToken()).toBe(mockToken);
  });

  test("should return null if no token exists", () => {
    expect(getAuthToken()).toBeNull();
  });

  // Test for signUp
  test("should call createUserWithEmailAndPassword with correct parameters", async () => {
    const mockUserCredential = { user: { uid: "123" } };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(
      mockUserCredential
    );

    const result = await signUp({
      email: "test@example.com",
      password: "securePass",
      name: "Test User",
      location: "Test Location",
      position: "Test Position",
      bio: "Test Bio",
    });
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "test@example.com",
      "securePass"
    );
    expect(result).toEqual(mockUserCredential);
  });

  // Test for logIn
  test("should call signInWithEmailAndPassword with correct parameters", async () => {
    const mockUserCredential = { user: { uid: "123" } };
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
      mockUserCredential
    );

    const result = await logIn({
      email: "test@example.com",
      password: "securePass",
      name: "",
      location: "",
      position: "",
      bio: "",
    });
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "test@example.com",
      "securePass"
    );
    expect(result).toEqual(mockUserCredential);
  });

  // Test for logOut
  test("should call auth.signOut", async () => {
    await logOut();
    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });
});
