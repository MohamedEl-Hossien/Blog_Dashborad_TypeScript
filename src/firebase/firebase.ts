import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/**
 * Firebase configuration object containing credentials and project details.
 * It is recommended to store sensitive values in environment variables (`process.env`) for security.
 *
 * @constant
 * @type {Object}
 */
const firebaseConfig = {
  apiKey: "AIzaSyDUVV7OxSzEWM5G6tT9aaukNX6Ape-gX_8",
  authDomain: "blog-dashboard-17633.firebaseapp.com",
  databaseURL: "https://blog-dashboard-17633-default-rtdb.firebaseio.com",
  projectId: "blog-dashboard-17633",
  storageBucket: "blog-dashboard-17633.firebasestorage.app",
  messagingSenderId: "677969949324",
  appId: "1:677969949324:web:5ce22647281a3acdf0c1a9",
  measurementId: "G-M77PM6319W",
};

/**
 * Initializes Firebase with the provided configuration.
 *
 * @constant
 * @type {FirebaseApp}
 */
const app = initializeApp(firebaseConfig);

/**
 * Firebase authentication instance for managing user authentication.
 *
 * @constant
 * @type {Auth}
 */
const auth = getAuth(app);

export { app, auth };
