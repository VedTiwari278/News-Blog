import React, { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NewsContext } from "../context/NewContext";
import { CategoryContext } from "../context/CategoryContext";
import { ThemeContext } from "../context/ThemeContext";

const AddPost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const titleRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();

  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);

  const { FetchNews } = useContext(NewsContext);
  const { categories } = useContext(CategoryContext);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    FetchNews();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("title", titleRef.current.value);
    data.append("description", descRef.current.value);
    data.append("category", categoryRef.current.value);
    data.append("image", imageRef.current.files[0]);

    try {
      await axios.post(
        "https://news-blog-abh6.vercel.app/admin/add-post/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      FetchNews();
      navigate("/admin/posts");
    } catch (err) {
      alert("Failed to submit post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-dark text-white" : "bg-transparent text-dark"
      }card shadow-lg border-0 -4 p-4 my-5`}
    >
      {/* Header */}
      <div className="mb-4 border-bottom pb-2">
        <h2 className="fw-bold text-gradient"> Add New Post</h2>
        <p className={`mb-0 ${darkMode ? "textlight" : "text-dark"}`}>
          Create and publish a new news article.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control rounded-3 shadow-sm"
              placeholder="Enter post title"
              ref={titleRef}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Category</label>
            <select
              className="form-select rounded-3 shadow-sm"
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

          <div className="col-12">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control rounded-3 shadow-sm"
              rows="4"
              placeholder="Enter post description"
              ref={descRef}
              required
            ></textarea>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Post Image</label>
            <input
              type="file"
              className="form-control rounded-3 shadow-sm"
              accept="image/*"
              ref={imageRef}
              onChange={handleImageChange}
              required
            />
          </div>

          {/* Image Preview */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded-4 shadow"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
            ) : (
              <div
                className={`${
                  darkMode
                    ? " border-light text-light"
                    : "border-dark text-dark"
                } border border-2 border-dashed rounded-4  d-flex flex-column align-items-center justify-content-center p-4`}
              >
                <span>Image Preview</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-end">
          <button
            type="submit"
            className="btn btn-primary px-4 py-2 rounded-3 shadow-sm"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Submitting...
              </>
            ) : (
              "Publish Post"
            )}
          </button>
        </div>
      </form>

      {/* Gradient CSS */}
      <style>{`
        .text-gradient {
          background: linear-gradient(90deg, #007bff, #00c6ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .border-dashed {
          border-style: dashed !important;
        }
      `}</style>
    </div>
  );
};

export default AddPost;
