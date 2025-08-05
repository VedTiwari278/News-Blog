import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ThemeContext } from "../context/ThemeContext";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  let role = null;
  let user = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      user = decoded.username;
    } catch (error) {
      console.error("Invalid token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav
      className={`navbar sticky-top navbar-expand-lg ${
        darkMode
          ? "navbar-dark bg-dark fw-bold"
          : "navbar-light bg-light fw-bold"
      } shadow`}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          TypeTide 
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-3">
            {["writer", "admin"].includes(role) && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/category">
                    Category
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/posts">
                    Posts
                  </Link>
                </li>
              </>
            )}
            {role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/users">
                  Users
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto gap-3 align-items-center">
            {/* 🌙 Theme toggle icon button */}
            <li className="nav-item">
              <button
                className="btn border-0"
                onClick={toggleTheme}
                style={{ fontSize: "1.5rem", color: darkMode ? "#fff" : "#000" }}
              >
                {darkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
              </button>
            </li>

            {user && (
              <li className="nav-item">
                <span
                  className={`fw-semibold ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  Welcome, {user}
                </span>
              </li>
            )}

            {!token ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <button className="btn btn-primary">Login / Signup</button>
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
