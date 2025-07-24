import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/js/bootstrap.bundle.min";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Daily News Analysis
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
            {/* Writer and Admin can access Category and Posts */}
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

            {/* Only Admin can access Users */}
            {role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/users">
                  Users
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto gap-2 align-items-center">
            {/* Show Welcome Username */}
            {user && (
              <li className="nav-item m-3">
                <span className="text-light fw-semibold">Welcome, {user}</span>
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
