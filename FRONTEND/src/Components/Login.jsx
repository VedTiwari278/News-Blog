import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext"; // 👈 Import ThemeContext
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext); // 👈 Use darkMode

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://news-blog-abh6.vercel.app/auth/login",
        data
      );
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login Failed");
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
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Welcome Back</h2>
          <p className="text-muted">Login to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${
                darkMode ? "bg-dark text-light border-secondary" : ""
              }`}
              id="floatingEmail"
              placeholder="Email"
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

          <div className="form-floating mb-4">
            <input
              type="password"
              className={`form-control ${
                darkMode ? "bg-dark text-light border-secondary" : ""
              }`}
              id="floatingPassword"
              placeholder="Password"
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

          <button type="submit" className="btn btn-primary w-100 py-2">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="">Don't have an account? </span>
          <Link
            to="/register"
            className="fw-semibold text-decoration-none text-primary"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
