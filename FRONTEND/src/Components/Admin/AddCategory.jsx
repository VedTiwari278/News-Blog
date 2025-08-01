import React, { useRef, useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {CategoryContext} from '../contex/CategoryContext';
const AddCategory = () => {
  const categoryName = useRef();
  const token = localStorage.getItem("token");
  const [submitting, setSubmitting] = useState(false); // ⬅️ Track submission state
  const { categories ,fetchCategories} = useContext(CategoryContext);
  useEffect(() => {
    // const fetchCategories = async () => {
    //   try {
    //     const res = await axios.get(
    //       "https://news-blog-abh6.vercel.app/admin/get-categories",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     // setCategories(res.data.data);
    //   } catch (error) {
    //     console.error("❌ Error fetching categories:", error);
    //   }
    // };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = categoryName.current.value.trim();

    if (!name) {
      alert("Please enter a category name");
      return;
    }
    setSubmitting(true); // ⬅️ Show loading state
    try {
      console.log("sub2");
      await axios.post(
        "https://news-blog-abh6.vercel.app/admin/add-category",
        { categoryName: name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      categoryName.current.value = "";
      // Refresh categories
      // const updated = await axios.get(
      //   "https://news-blog-abh6.vercel.app/admin/get-categories",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      fetchCategories(); 
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
      console.error("❌ Error:", error);
    } finally {
      setSubmitting(false); // ⬅️ Reset loading state
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-primary fw-bold mb-4">Add New Category</h3>

      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Category Name
          </label>
          <input
            ref={categoryName}
            type="text"
            className="form-control"
            id="categoryName"
            placeholder="Enter category name"
          />
        </div>
         <button type="submit" className="btn btn-success" disabled={submitting}>
          {submitting ? "Submitting..." : "Add Category"}
        </button> 
      </form>

      <h4 className="fw-bold">All Available Categories</h4>
      <ul className="list-group mt-3">
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <li key={cat._id} className="list-group-item">
              {index + 1}. {cat.categoryName}
            </li>
          ))
        ) : (
          <li className="list-group-item">No categories found</li>
        )}
      </ul>
    </div>
  );
};

export default AddCategory;
