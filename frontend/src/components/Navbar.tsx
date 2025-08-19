import { NavLink } from "react-router-dom";
import "../css/style.css"; // make sure the path is correct

export default function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          EduCrafted Forms
        </NavLink>

        <nav className="navbar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/forms/new"
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            Create Form
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

