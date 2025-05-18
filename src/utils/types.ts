/**
 * Represents the structure of a blog post.
 */
export type PostData = {
  /** The title of the post */
  title: string;
  /** The author of the post */
  author: string;
  /** The date when the post was created */
  date: string;
  /** The main content of the post */
  content: string;
};

/**
 * Represents a collection of posts within a group.
 * The key is the post ID, and the value is the `PostData`.
 */
export type PostGroup = {
  [postId: string]: PostData;
};

/**
 * Represents all posts categorized by group keys.
 * The key is the group identifier, and the value is a `PostGroup`.
 */
export type PostsGroups = {
  [groupKey: string]: PostGroup;
};

/**
 * Represents a flattened version of `PostData`, adding groupKey and an optional ID.
 */
export type FlattenedPost = PostData & {
  /** Unique identifier for the post group */
  groupKey: string;
  /** Optional unique identifier for the post */
  id?: string;
};

/**
 * Represents the data structure for user form input.
 */
export type FormData = {
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
  /** User's full name */
  name: string;
  /** User's location  */
  location: string;
  /** User's job position */
  position: string;
  /** Short biography of the user */
  bio: string;
};

/**
 * Represents a user profile without the password field.
 */
export type UserData = Omit<FormData, "password">;

/**
 * Represents an authentication error with additional details.
 */
export interface AuthError extends Error {
  /** Error code returned from authentication */
  code: string;
  /** Additional information about the error */
  info: string;
}

/**
 * Represents the structure of stored user data.
 */
export type StoredData = {
  /** Unique user ID */
  userId: string;
  /** The filtered form data for storage */
  filteredData: FormData;
};

/**
 * Represents a user in the authentication state.
 */
export type User = {
  /** Unique identifier for the user */
  uid: string;
  /** User's email address, nullable */
  email: string | null;
};

/**
 * Defines the structure of the authentication state.
 */
export type StateTypes = {
  /** Indicates if the user is authenticated */
  isAuthenticated: boolean;
  /** Stores the current user's details or `null` if logged out */
  currentUser: User | null;
  /** Represents the loading state for authentication */
  loading: boolean;
};
