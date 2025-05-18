import { Outlet } from "react-router-dom";
import { MainNav } from "../components";

/**
 * The root layout component for the main application structure.
 * It includes the main navigation bar and dynamically renders nested routes.
 *
 * @component
 * @returns {JSX.Element} The main navigation and route outlet wrapped in a `<main>` element.
 */
export default function MainRoot() {
  return (
    <>
      <MainNav />
      <main>
        <Outlet />
      </main>
    </>
  );
}
