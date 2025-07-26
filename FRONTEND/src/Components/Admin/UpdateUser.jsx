import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const navigate = useNavigate();

  const [Firstname, SetFirstName] = useState("");
  const [Lastname, SetLastName] = useState("");
  const [username, setUserName] = useState("");
  const [Role, SetRole] = useState("");
  const [updating, setUpdating] = useState(false); // new state

  const { id } = useParams();

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `https://news-blog-abh6.vercel.app/admin/get-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = response.data.data;
      SetFirstName(user.firstName);
      SetLastName(user.lastName);
      setUserName(user.username);
      SetRole(user.role);
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Failed to fetch user. Unauthorized or server error.");
    }
  };

  useEffect(() => {
    setInterval(() => {
      fetchUser();
    }, interval);
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true); // set loading to true

    try {
      const updatedUser = {
        FirstName: Firstname,
        LastName: Lastname,
        username: username,
        Role: Role,
      };

      const res = await axios.put(
        `https://news-blog-abh6.vercel.app/admin/update-user/${id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ User updated successfully!");
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("❌ Failed to update user");
    } finally {
      setUpdating(false); // always reset after completion
    }
  };

  return (
    <div className="container mt-4">
      <h3>Update User</h3>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            value={Firstname}
            onChange={(e) => SetFirstName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            value={Lastname}
            onChange={(e) => SetLastName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <input
            type="text"
            className="form-control"
            value={Role}
            onChange={(e) => SetRole(e.target.value)}
          />
        </div>

        <button className="btn btn-outline-warning" disabled={updating}>
          {updating ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
