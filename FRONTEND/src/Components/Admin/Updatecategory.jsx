import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Updatecategory = () => {
  const [category, setCategory] = useState({ categoryName: "" });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `https://news-blog-abh6.vercel.app/admin/edit-category/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Data from backend:", response.data.data);
        setCategory(response.data.data);
      } catch (error) {
        console.error(
          "❌ Error fetching category:",
          error.response?.data || error.message
        );
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://news-blog-abh6.vercel.app/admin/update-category/${id}`,
        {
          categoryName: category.categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/admin/category");
    } catch (error) {
      console.error(
        "❌ Error updating category:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-primary fw-bold">Update Category</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Category Name:
          </label>
          <input
            type="text"
            id="categoryName"
            value={category.categoryName}
            onChange={(e) =>
              setCategory({ ...category, categoryName: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
};

export default Updatecategory;
