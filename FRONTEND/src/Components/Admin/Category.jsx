import React, { useEffect, useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import { CategoryContext } from "../contex/CategoryContext";

const Category = () => {
  const [alldata, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { categories, fetchCategories } = useContext(CategoryContext);
  alldata=categories;

  let userData = {};
  if (token) {
    userData = jwtDecode(token);
    console.log("👤 Decoded User Data:", userData);
    console.log("🆔 User ID:", userData.id);
    console.log("User Name:", userData.name);
  }

  const fetchAll = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      //     setLoading(true); // Start loader
      //     const response = await axios.get(
      //       "https://news-blog-abh6.vercel.app/admin/get-categories",
      //       {
      //         headers: {
      //           Authorization: `Bearer ${token}`,
      //         },
      //       }
      //     );
      //     setAllData(response.data.data);
      fetchCategories();
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log("🪪 Token from localStorage:", token);

      await axios.delete(
        `https://news-blog-abh6.vercel.app/admin/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAll(); // Refresh list
    } catch (error) {
      alert("Failed to delete category");
      console.error("The cat error", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary fw-bold">All CATEGORY</h3>
        <Link to="/admin/add-category" className="btn btn-success">
          + ADD CATEGORY
        </Link>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading categories...</p>
        </div>
      ) : (
        <table className="table table-bordered table-striped table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>S.No.</th>
              <th>Category Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {alldata.length > 0 ? (
              alldata.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{category.categoryName}</strong>
                  </td>
                  <td>
                    <Link
                      to={`/admin/edit-category/${category._id}`}
                      className="btn btn-sm btn-warning"
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
                <td colSpan="4" className="text-center">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <Link to="/" className="btn btn-outline-primary mt-4 rounded-pill px-4">
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default Category;
