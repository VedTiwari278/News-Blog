import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { CategoryContext } from "../context/CategoryContext";

const Header = () => {
  const { categories, fetchCategories } = useContext(CategoryContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      await fetchCategories();
      setLoading(false);
    };
    loadCategories();
  }, []);

  return (
    <>
      {/* Logo Section */}
      <div className="text-center py-3 bg-light shadow-sm">
        <img
          src="/images/News.jpeg"
          alt="No Logo Found"
          className="img-fluid"
          style={{ maxHeight: "80px", width: "auto" }}
        />
      </div>

      {/* Responsive Category Bar */}
      <div
        className="bg-primary py-2 px-2 overflow-auto d-flex justify-content-start justify-content-md-center"
        style={{ whiteSpace: "nowrap" }}
      >
        {loading
          ? // Skeleton placeholders
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="mx-2 rounded bg-white"
                style={{
                  height: "20px",
                  width: "80px",
                  opacity: 0.3,
                  animation: "pulse 1.5s infinite",
                }}
              ></div>
            ))
          : // Actual categories
            categories.map((category) => (
              <Link
                key={category._id}
                to={`/category/${category._id}`}
                className="text-white text-decoration-none fw-semibold px-2"
                style={{ flex: "0 0 auto" }}
              >
                {category.categoryName}
              </Link>
            ))}
      </div>

      {/* Skeleton animation keyframes */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.3; }
            50% { opacity: 0.7; }
            100% { opacity: 0.3; }
          }
        `}
      </style>
    </>
  );
};

export default Header;
