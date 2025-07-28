import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const response = await axios.get(
          "https://news-blog-abh6.vercel.app/get-category"
        );
        console.log("📦 Categories:", response.data);
        setCategories(response.data.data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };
    fetchHeader();
    const updatedate = () => {
      fetchHeader();
    };
    window.addEventListener("dataupdate", updatedate);
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
        {categories.map((category) => (
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
    </>
  );
};

export default Header;
