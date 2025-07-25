import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdatePost = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const [Title, SetTitle] = useState("");
  const [Description, SetDescription] = useState("");
  const [Category, SetCategory] = useState("");

  // Token
  const token = localStorage.getItem("token");

  // Axios config with token
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://news-blog-abh6.vercel.app/admin/get-categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(res.data.data);
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
      }
    };

    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://news-blog-abh6.vercel.app/admin/get-post/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const post = response.data.data;
        SetTitle(post.title);
        SetDescription(post.description);
        SetCategory(post.category._id);
      } catch (error) {
        console.error("❌ Error fetching post:", error);
      }
    };

    fetchCategories();
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = {
        Title,
        Description,
        Category,
      };

      const res = await axios.put(
        `https://news-blog-abh6.vercel.app/admin/update-post/${id}`,
        updatedPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ Post updated:", res.data);
      navigate("/admin/posts");
    } catch (error) {
      console.error("❌ Error updating post:", error);
      alert("❌ Failed to update post");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Update Post</h3>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={Title}
            onChange={(e) => SetTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={Description}
            onChange={(e) => SetDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            value={Category}
            onChange={(e) => SetCategory(e.target.value)}
            required
          >
            <option value="">-- Choose Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-outline-warning">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
