import React, { useContext, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // fix import - no {}
import axios from "axios";
import { NewsContext } from "../context/NewContext";
import { ThemeContext } from "../context/ThemeContext";

const Post = () => {
  const { news, loading, FetchNews } = useContext(NewsContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let decoded = null;
  try {
    decoded = token ? jwtDecode(token) : null;
  } catch (e) {
    console.error("Invalid token:", e);
    decoded = null;
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      FetchNews();
    }
  }, [token, navigate, FetchNews]);

  // Filter news by logged-in user's id (author._id === decoded.id)
  const filteredNews =
    Array.isArray(news) && decoded?.id
      ? decoded.role === "admin"
        ? news // admin: show all
        : news.filter((post) => post.author?._id === decoded.id) // normal user: filter by author
      : [];

  const handleDelete = async (id) => {
    try {
      if (!localStorage.getItem("token")) {
        navigate("/login");
        return;
      }
      await axios.delete(
        `https://news-blog-abh6.vercel.app/admin/delete-post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      FetchNews();
    } catch (error) {
      alert("Failed to delete post");
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
        <div className="card-header border rounded d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 ">
          <h3
            className={`fw-bold mb-0 ${
              darkMode ? "text-info" : "text-primary"
            }`}
          >
            Post Management
          </h3>
          <div className="d-flex gap-2 flex-wrap">
            <Link
              to="/admin/add-post"
              className="btn btn-success rounded-pill px-4"
            >
              + Add Post
            </Link>
            <Link
              to="/"
              className={`${
                darkMode ? "btn btn-outline-light " : "btn  btn-outline-dark "
              }rounded-pill px-4`}
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
              <p className="mt-2">Loading posts...</p>
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="table-responsive" style={{ maxHeight: "65vh" }}>
              <table
                className={`table table-hover align-middle ${
                  darkMode ? "table-dark table-striped" : "table-striped"
                }`}
              >
                {/* Sticky Header */}
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
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Author</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredNews.map((post, index) => (
                    <tr
                      key={post._id || index}
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
                      {/* Post Image */}
                      <td>
                        <img
                          src={post.image || "https://via.placeholder.com/60"}
                          alt={post.title}
                          className="rounded shadow-sm"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            border: "2px solid #ddd",
                          }}
                        />
                      </td>
                      <td className="fw-semibold">{post.title}</td>
                      <td>
                        <span
                          className={`badge ${
                            darkMode
                              ? "bg-info text-dark"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {post.category?.categoryName || "Unknown"}
                        </span>
                      </td>
                      <td>{new Date(post.createdAt).toLocaleString()}</td>
                      <td>{post.author?.username || "Unknown"}</td>
                      <td>
                        <Link
                          to={`/admin/edit-post/${post._id}`}
                          className="btn btn-sm btn-warning"
                          title="Edit Post"
                        >
                          <FaEdit />
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
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-4">
              {loading ? "" : "No posts found for the logged-in user."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
