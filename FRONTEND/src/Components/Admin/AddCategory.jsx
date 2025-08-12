import React, { useRef, useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { CategoryContext } from "../context/CategoryContext";
import { motion } from "framer-motion";
import { FaPlus, FaTags } from "react-icons/fa";

const AddCategory = ({ darkMode }) => {
  const categoryName = useRef();
  const token = localStorage.getItem("token");
  const [submitting, setSubmitting] = useState(false);
  const { categories, fetchCategories } = useContext(CategoryContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = categoryName.current.value.trim();
    if (!name) {
      alert("Please enter a category name");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(
        "https://news-blog-abh6.vercel.app/admin/add-category",
        { categoryName: name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      categoryName.current.value = "";
      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        {/* Left Card - Add Category */}
        <div className="col-lg-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`card border-0 rounded-4 shadow-lg ${
              darkMode ? "bg-dark bg-opacity-75 text-light" : "bg-white"
            }`}
            style={{
              backdropFilter: "blur(12px)",
              border: darkMode
                ? "1px solid rgba(255,255,255,0.2)"
                : "1px solid rgba(0,0,0,0.05)",
              transition: "0.3s ease-in-out",
            }}
          >
            <div
              className={`card-header fw-bold rounded-top-4 d-flex align-items-center gap-2 ${
                darkMode ? "bg-gradient text-light" : "bg-primary text-white"
              }`}
              style={{
                background: darkMode
                  ? "linear-gradient(45deg, rgba(0,123,255,0.2), rgba(0,255,200,0.2))"
                  : "linear-gradient(45deg, #102943ff, #0cd4eeff)",
              }}
            >
              <FaPlus /> Add New Category
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="categoryName"
                    className="form-label fw-semibold"
                  >
                    Category Name
                  </label>
                  <input
                    ref={categoryName}
                    type="text"
                    className={`form-control rounded-pill px-3 py-2 shadow-sm ${
                      darkMode
                        ? "bg-dark text-light border-light"
                        : "bg-light border-secondary"
                    }`}
                    id="categoryName"
                    placeholder="Enter category name"
                    style={{ transition: "all 0.3s" }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow = "0 0 8px rgba(0,123,255,0.5)")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100 fw-semibold rounded-pill py-2 shadow-sm"
                  disabled={submitting}
                >
                  {submitting && (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  )}
                  {submitting ? "Submitting..." : "Add Category"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Right Card - All Categories */}
        <div className="col-lg-8">
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className={`card border-0 rounded-4 shadow-lg ${
              darkMode ? "bg-dark bg-opacity-75 text-light" : "bg-white"
            }`}
            style={{
              backdropFilter: "blur(12px)",
              border: darkMode
                ? "1px solid rgba(255,255,255,0.2)"
                : "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div
              className={`card-header fw-bold rounded-top-4 d-flex align-items-center gap-2 ${
                darkMode ? "bg-gradient text-light" : "bg-dark text-white"
              }`}
              style={{
                background: darkMode
                  ? "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(0,123,255,0.2))"
                  : "linear-gradient(45deg, #343a40, #495057)",
              }}
            >
              <FaTags /> All Categories
            </div>
            <div className="card-body p-0">
              {categories.length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                  <table
                    className={`table table-hover mb-0 align-middle ${
                      darkMode ? "table-dark table-striped" : "table-light"
                    }`}
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <thead
                      className={darkMode ? "table-secondary" : "table-light"}
                    >
                      <tr>
                        <th style={{ width: "60px" }}>#</th>
                        <th>Category Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((cat, index) => (
                        <motion.tr
                          key={cat._id}
                          whileHover={{
                            backgroundColor: darkMode
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(0,0,0,0.05)",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{index + 1}</td>
                          <td>{cat.categoryName}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-3 text-muted text-center">
                  No categories found
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
