import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/admin/get-posts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPost(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchPost();
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      if (!localStorage.getItem("token")) {
        navigate("/login");
        return;
      }

      await axios.delete(`http://localhost:3000/admin/delete-post/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchPost();
    } catch (error) {
      alert("Failed to delete post");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary fw-bold">Post Table</h3>
        <Link to="/admin/add-post" className="btn btn-success">
          + ADD POST
        </Link>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p>Loading posts...</p>
        </div>
      ) : (
        <table className="table table-bordered table-striped table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
              <th scope="col">Author</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(post) && post.length > 0 ? (
              post.map((post, index) => (
                <tr key={post._id || index}>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.category?.categoryName || "Unknown"}</td>
                  <td>{new Date(post.createdAt).toLocaleString()}</td>
                  <td>{post.author?.username || "Unknown"}</td>
                  <td>
                    <Link
                      to={`/admin/edit-post/${post._id}`}
                      className="text-warning"
                      title="Edit Post"
                    >
                      <FaEdit size={18} />
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(post._id)}
                    >
                      <FaDeleteLeft />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No posts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Post;
