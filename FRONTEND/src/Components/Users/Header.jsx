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
  }, []);

  return (
    <>
      <div className="Brand text-center py-3 bg-light shadow-sm">
        <img
          src="/images/News.jpeg"
          alt="No Logo Found"
          className="img-fluid logo"
        />
      </div>
      <div className="category-bar d-flex justify-content-center gap-4 py-2 bg-primary">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category._id}`}
            className="text-white text-decoration-none fw-semibold"
          >
            {category.categoryName}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Header;
