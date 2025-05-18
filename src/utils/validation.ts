import type { FormData, PostData } from "./";

/**
 * Validates sign-up form data and returns an object containing error messages.
 *
 * @param {FormData} data - The sign-up form data.
 * @returns {Record<string, string>} An object mapping field names to error messages.
 */
export function signUpValidation(data: FormData): { [key: string]: string } {
  const errors: { [key: string]: string } = {};

  if (!validateEmail(data.email)) {
    errors.email =
      "Please enter a valid email address (e.g., user@example.com).";
  }

  if (data.password.length < 8) {
    errors.password = "At least 8 characters long.";
  } else {
    if (!validatePassword(data.password)) {
      errors.password = "At least one letter and one number.";
    }
  }

  if (!validateText(data.name)) {
    errors.name =
      "At least 3 characters, Can't contain numbers or special characters.";
  }

  if (!validateText(data.position)) {
    errors.position =
      "At least 3 characters, Can't contain numbers or special characters.";
  }

  if (!validateLocation(data.location)) {
    errors.location =
      "At least 3 characters, only letters, spaces, and commas.";
  }

  if (!validateBio(data.bio)) {
    errors.bio = "Bio can't exceed 500 characters.";
  }

  return errors;
}

/**
 * Validates sign-in form data and returns an object containing error messages.
 *
 * @param {FormData} data - The sign-in form data.
 * @returns {Record<string, string>} An object mapping field names to error messages.
 */
export function signInValidation(data: FormData): { [key: string]: string } {
  const errors: { [key: string]: string } = {};

  if (!validateEmail(data.email)) {
    errors.email =
      "Please enter a valid email address (e.g., user@example.com).";
  }

  return errors;
}

/**
 * Validates post submission data and returns an object containing error messages.
 *
 * @param {PostData} data - The post submission data.
 * @returns {Record<string, string>} An object mapping field names to error messages.
 */
export function postValidation(data: PostData): { [key: string]: string } {
  const errors: { [key: string]: string } = {};

  if (data.title.length < 3) {
    errors.title = "Title must be at least 3 characters.";
  }

  if (data.author.length < 3) {
    errors.author = "Author must be at least 3 characters";
  } else {
    if (!validateText(data.author)) {
      errors.author = "Author Can't contain numbers or special characters.";
    }
  }

  if (data.content.length < 3) {
    errors.content = "Content must be at least 3 characters.";
  }

  return errors;
}

/**
 * Checks if the provided email is in a valid format.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} `true` if valid, otherwise `false`.
 */
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Checks if the provided password meets the minimum requirements.
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} `true` if valid, otherwise `false`.
 */
function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

/**
 * Checks if the provided text consists of only letters and spaces with a minimum length.
 *
 * @param {string} name - The text to validate.
 * @returns {boolean} `true` if valid, otherwise `false`.
 */
function validateText(name: string): boolean {
  const nameRegex = /^[A-Za-z\s]{3,}$/;
  return nameRegex.test(name);
}

/**
 * Checks if the provided bio does not exceed the maximum allowed characters.
 *
 * @param {string} bio - The bio text to validate.
 * @returns {boolean} `true` if valid, otherwise `false`.
 */
function validateBio(bio: string): boolean {
  return bio.length <= 150;
}

/**
 * Checks if the provided location contains only allowed characters.
 *
 * @param {string} location - The location to validate.
 * @returns {boolean} `true` if valid, otherwise `false`.
 */
function validateLocation(location: string): boolean {
  const locationRegex = /^[A-Za-z\s,]{2,}$/;
  return locationRegex.test(location);
}
