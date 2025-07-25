import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const titleRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/admin/get-categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("✅ Categories:", res.data.data);
        setCategories(res.data.data);
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", titleRef.current.value);
    data.append("description", descRef.current.value);
    data.append("category", categoryRef.current.value);
    data.append("image", imageRef.current.files[0]);

    // ✅ Log FormData values
    console.log("🚀 FormData being sent:");
    for (let pair of data.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      console.log("hello jo");
      const response = await axios.post(
        "http://localhost:3000/admin/add-post/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ Post Submitted:", response.data.message);
      navigate("/admin/posts");
    } catch (err) {
      console.error("❌ Error submitting post:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4">Add New Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter post title"
            ref={titleRef}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            placeholder="Enter post description"
            ref={descRef}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            ref={categoryRef}
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

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Post Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            ref={imageRef}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
