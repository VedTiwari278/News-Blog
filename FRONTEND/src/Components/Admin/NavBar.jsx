import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // fixed import
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ThemeContext } from "../context/ThemeContext";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  let role = null;
  let user = null;
  let avatar = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      user = decoded.username;
      avatar = decoded.avatar;
      console.log("Avatar URL:", avatar);
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
          <img
            height={70}
            width={100}
            className={`${
              darkMode ? "border-2 border-light" : "border-2 border-dark"
            } rounded-circle`}
            src="/images/Logo.jpeg"
            alt="Logo"
          />
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
            {/* Theme toggle button */}
            <li className="nav-item">
              <button
                className="btn border-0"
                onClick={toggleTheme}
                style={{
                  fontSize: "1.5rem",
                  color: darkMode ? "#fff" : "#000",
                }}
                aria-label="Toggle theme"
              >
                {darkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
              </button>
            </li>

            {user && (
              <li className="nav-item d-flex align-items-center">
                <span
                  className={`fw-semibold ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  Welcome,
                </span>
                {avatar ? (
                  <img
                    src={avatar}
                    alt={`${user} avatar`}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "8px",
                      border: darkMode ? "2px solid white" : "2px solid black",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      backgroundColor: darkMode ? "#666" : "#ccc",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: darkMode ? "#fff" : "#000",
                      fontWeight: "bold",
                      marginLeft: "8px",
                    }}
                  >
                    {user.charAt(0).toUpperCase()}
                  </div>
                )}
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
