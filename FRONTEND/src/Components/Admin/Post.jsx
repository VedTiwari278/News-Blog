import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NewsContext } from "../context/NewContext";
const Post = () => {
  // const [news, setNews] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { news, setNews, loading,FetchNews } =
    useContext(NewsContext);
  // useEffect(() => {
  //   const FetchNews = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://news-blog-abh6.vercel.app/getAllPost"
  //       );
  //       if (response) {
  //         setNews(response.data.data);
  //       }
  //     } catch (err) {
  //       console.error("No Posts Found", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   FetchNews();
  // }, []);
  useEffect(() => {
    FetchNews();
  }, [news]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      FetchNews();
    }
  }, []);

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
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h3 className="text-primary fw-bold">Post Table</h3>
        <Link to="/admin/add-post" className="btn btn-success mt-2 mt-md-0">
          + ADD POST
        </Link>

        <Link to="/" className="btn btn-outline-primary mt-4 rounded-pill px-4">
          ⬅ Back to Home
        </Link>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p>Loading posts...</p>
        </div>
      ) : (
        <div className="table-responsive">
          {" "}
          {/* ✅ Responsive wrapper */}
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
              {Array.isArray(news) && news.length > 0 ? (
                news.map((post, index) => (
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
        </div>
      )}
    </div>
  );
};

export default Post;
