import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./PostsNav.module.css";

/**
 * The navigation component for the posts section.
 * Provides links to view all posts and create a new post.
 * Highlights the active route using dynamic styling.
 *
 * @component
 * @returns {JSX.Element} The rendered navigation menu for posts.
 */
const PostsNav: React.FC = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Post
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default PostsNav;
