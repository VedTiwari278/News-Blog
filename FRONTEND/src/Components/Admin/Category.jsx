import React, { useEffect, useContext, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { CategoryContext } from "../context/CategoryContext";
import { ThemeContext } from "../context/ThemeContext";

const Category = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { categories, fetchCategories } = useContext(CategoryContext);
  const { darkMode } = useContext(ThemeContext);

  const fetchAll = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      fetchCategories();
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://news-blog-abh6.vercel.app/admin/delete-category/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAll();
    } catch (error) {
      alert("Failed to delete category");
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
            Category Management
          </h3>
          <div className="d-flex gap-2 flex-wrap">
            <Link
              to="/admin/add-category"
              className="btn btn-success rounded-pill px-4"
            >
              <FaPlus className="me-2" /> Add Category
            </Link>
            <Link
              to="/"
              className={`btn rounded-pill px-4 ${
                darkMode ? "btn-outline-light" : "btn-outline-dark"
              }`}
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
              <p className="mt-2">Loading categories...</p>
            </div>
          ) : (
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
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category, index) => (
                      <tr
                        key={category._id || index}
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
                        <td className="fw-semibold">{category.categoryName}</td>
                        <td className="fw-semibold">
                          {`This category contains articles and posts related to ${category.categoryName}`}
                        </td>
                        <td>
                          <Link
                            to={`/admin/edit-category/${category._id}`}
                            className="btn btn-sm btn-warning"
                            title="Edit Category"
                          >
                            <FaEdit />
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(category._id)}
                          >
                            <FaDeleteLeft />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No categories found
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

export default Category;
