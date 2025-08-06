import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "reader", // default selected
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4 text-primary fw-bold">
          Create Account
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold">First Name</label>
            <input
              className="form-control rounded-pill"
              placeholder="Enter your first name"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Last Name</label>
            <input
              className="form-control rounded-pill"
              placeholder="Enter your last name"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">username</label>
            <input
              className="form-control rounded-pill"
              placeholder="Choose a username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Select Role</label>
            <select
              className="form-select rounded-pill"
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
            >
              <option value="reader">Reader</option>
              <option value="writer">Writer</option>
              {/* <option value="admin">Admin</option> */}
            </select>
          </div>

          <button className="btn btn-primary w-100 rounded-pill">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-decoration-none text-primary fw-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
