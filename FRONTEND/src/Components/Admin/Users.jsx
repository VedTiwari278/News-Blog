import React, { useContext, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ThemeContext } from "../context/ThemeContext";

const token = localStorage.getItem("token");

const Users = () => {
  const { setLoading, user, setUser, fetchUser, loading } =
    useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const fetchAllUser = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      fetchUser();
    } catch (error) {
      console.log("Error in fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://news-blog-abh6.vercel.app/admin/delete-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAllUser();
    } catch (error) {
      alert("Failed to delete User");
      console.error(error);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div
        className={`card shadow-lg border-0 rounded-4 ${
          darkMode ? "bg-dark text-light" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="card-header border rounded d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <h3
            className={`fw-bold mb-0 ${
              darkMode ? "text-info" : "text-primary"
            }`}
          >
            All USERS
          </h3>
          <div className="d-flex gap-2 flex-wrap">
            <Link
              to="/"
              className={`${
                darkMode ? "btn btn-outline-light" : "btn btn-outline-dark"
              } rounded-pill px-4`}
            >
              ⬅ Back to Home
            </Link>
          </div>
        </div>

        {/* Body */}
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2">Loading users...</p>
            </div>
          ) : (
            <div className="table-responsive" style={{ maxHeight: "65vh" }}>
              <table
                className={`table table-hover align-middle ${
                  darkMode ? "table-dark table-striped" : "table-striped"
                }`}
              >
                <thead
                  className={
                    darkMode
                      ? "bg-secondary text-light"
                      : "bg-primary text-white"
                  }
                  style={{ position: "sticky", top: 0, zIndex: 10 }}
                >
                  <tr>
                    <th>#</th>
                    <th>Avatar</th> {/* New Avatar column */}
                    <th>Full Name</th>
                    <th>User Name</th>
                    <th>Role</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {user.length > 0 ? (
                    user.map((users, index) => (
                      <tr
                        key={users._id}
                        style={{
                          transition: "all 0.2s ease-in-out",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.01)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={users.avatar || "/images/avtar.avif"} // default avatar if no avatar
                            alt={`${users.firstName} avatar`}
                            className="rounded-circle"
                            style={{
                              width: 40,
                              height: 40,
                              objectFit: "cover",
                              border: darkMode
                                ? "2px solid #0dcaf0"
                                : "2px solid #0d6efd",
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/avtar.avif"; // fallback avatar on error
                            }}
                          />
                        </td>
                        <td>
                          {users.firstName} {users.lastName}
                        </td>
                        <td>{users.username}</td>
                        <td>{users.role}</td>
                        <td>
                          <Link
                            to={`/admin/edit-user/${users._id}`}
                            className="btn btn-sm btn-warning"
                            title="Edit User"
                          >
                            <FaEdit />
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(users._id)}
                          >
                            <FaDeleteLeft />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
