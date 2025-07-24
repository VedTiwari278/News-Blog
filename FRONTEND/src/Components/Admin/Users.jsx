import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      setLoading(true); // Start loader
      const response = await axios.get(
        "https://news-blog-abh6.vercel.app//admin/get-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      navigate("/login");
    } finally {
      setLoading(false); // Stop loader
    }
  };

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
      fetchUser(); // Refresh list
    } catch (error) {
      alert("Failed to delete User");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary fw-bold">All USERS</h3>
        {/* Optional Add User Button */}
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading users...</p>
        </div>
      ) : (
        <table className="table table-bordered table-striped table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Full Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Role</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {user.length > 0 ? (
              user.map((users, index) => (
                <tr key={users._id}>
                  <td>{index + 1}</td>
                  <td>
                    {users.firstName} {users.lastName}
                  </td>
                  <td>{users.username}</td>
                  <td>{users.role}</td>
                  <td>
                    <Link
                      to={`/admin/edit-user/${users._id}`}
                      className="text-warning"
                      title="Edit User"
                    >
                      <FaEdit size={18} />
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
                <td colSpan="6" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
