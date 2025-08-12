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
    avatar: null,
  });

  const [preview, setPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({ ...prev, avatar: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      if (data.avatar) formData.append("avatar", data.avatar);

      const response = await axios.post(
        "https://news-blog-abh6.vercel.app/auth/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Registered Successfully");
      if (response) navigate("/login");
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
        style={{ maxWidth: 500, width: "100%" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Create Account</h2>
          <p className="text-muted">Register to continue</p>
        </div>

        <form onSubmit={handleRegister} encType="multipart/form-data">
          {/* Avatar Upload */}
          <div className="mb-3 text-center">
            {preview ? (
              <img
                src={preview}
                alt="avatar preview"
                className="rounded-circle mb-2"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
            ) : (
              <div
                className={`rounded-circle mb-2 d-inline-block ${
                  darkMode ? "bg-secondary" : "bg-light border"
                }`}
                style={{ width: 100, height: 100 }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="form-control form-control-sm"
              style={{ maxWidth: 250, margin: "0 auto" }}
            />
          </div>

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
              autoComplete="username"
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
              autoComplete="current-password"
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
          <span>Already have an account? </span>
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
