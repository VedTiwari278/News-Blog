import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";

function Register() {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "reader",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://news-blog-abh6.vercel.app/auth/register",
        data
      );
      alert("Registered Successfully");
      if (response) {
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div
      className={`min-vh-100 d-flex align-items-center justify-content-center ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div
        className={`card shadow-lg border-0 p-4 ${
          darkMode ? "bg-transparent text-light" : "bg-white text-dark"
        }`}
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Create Account</h2>
          <p className="text-muted">Register to continue</p>
        </div>

        <form onSubmit={handleRegister}>
          {/* First Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${
                darkMode ? "bg-dark text-light border-secondary" : ""
              }`}
              id="floatingFirstName"
              placeholder="First Name"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              required
            />
            <label
              htmlFor="floatingFirstName"
              className={darkMode ? "text-light" : ""}
            >
              First Name
            </label>
          </div>

          {/* Last Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${
                darkMode ? "bg-dark text-light border-secondary" : ""
              }`}
              id="floatingLastName"
              placeholder="Last Name"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              required
            />
            <label
              htmlFor="floatingLastName"
              className={darkMode ? "text-light" : ""}
            >
              Last Name
            </label>
          </div>

          {/* Username */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${
                darkMode ? "bg-dark text-light border-secondary" : ""
              }`}
              id="floatingUsername"
              placeholder="Username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
            <label
              htmlFor="floatingUsername"
              className={darkMode ? "text-light" : ""}
            >
              Username
            </label>
          </div>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${
                darkMode ? "bg-dark text-light border-secondary" : ""
              }`}
              id="floatingEmail"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
            <label
              htmlFor="floatingEmail"
              className={darkMode ? "text-light" : ""}
            >
              Email address
            </label>
          </div>

          {/* Password */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${
                darkMode ? "bg-dark text-light border-secondary" : ""
              }`}
              id="floatingPassword"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
            <label
              htmlFor="floatingPassword"
              className={darkMode ? "text-light" : ""}
            >
              Password
            </label>
          </div>

          {/* Role */}
          <div className="form-floating mb-4">
            <select
              className={`form-select ${
                darkMode ? "bg-dark text-light border-secondary" : ""
              }`}
              id="floatingRole"
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
            >
              <option value="reader">Reader</option>
              <option value="writer">Writer</option>
            </select>
            <label
              htmlFor="floatingRole"
              className={darkMode ? "text-light" : ""}
            >
              Select Role
            </label>
          </div>

          <button className="btn btn-primary w-100 py-2 rounded">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="">Already have an account? </span>
          <Link
            to="/login"
            className="fw-semibold text-decoration-none text-primary"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
