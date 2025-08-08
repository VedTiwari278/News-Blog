import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { CategoryContext } from "../context/CategoryContext";
import { motion } from "framer-motion";

// Create a motion-enhanced Link
const MotionLink = motion(Link);

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
          ? Array.from({ length: 6 }).map((_, index) => (
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
          : categories.map((category) => (
              <MotionLink
                key={category._id}
                to={`/category/${category._id}`}
                className="text-decoration-none fw-semibold px-2"
                style={{
                  flex: "0 0 auto",
                  display: "inline-block",
                  color: "#ffffff", // default white
                }}
                whileHover={{
                  rotate: 5,
                  scale: 1.1,
                  color: "#ff0000ff", // hover color
                }}
                whileTap={{
                  rotate: 5,
                  color: "#ff0000ff",
                  scale: 0.95,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {category.categoryName}
              </MotionLink>
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
