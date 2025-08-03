import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { NewsContext } from "../context/NewContext";

const Single = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { news } = useContext(NewsContext);
  // console.log(news);

  useEffect(() => {
    const matchedItem = news.find((item) => item._id === id);
    setData(matchedItem);
  }, [id, news]);

  return (
    <div className="container my-5">
      {data ? (
        <div
          className="card shadow-lg border-0 rounded-4 overflow-hidden"
          style={{ maxWidth: "850px", margin: "0 auto" }}
        >
          {/* Top Gradient Strip */}
          <div
            style={{
              height: "6px",
              background: "linear-gradient(90deg, #0d6efd, #6610f2)",
            }}
          ></div>

          {/* Image */}
          <img
            src={data.image}
            className="w-100"
            alt={data.title}
            style={{ objectFit: "cover", maxHeight: "420px" }}
          />

          {/* Meta Info */}
          <div className="d-flex justify-content-between align-items-center px-4 pt-3">
            <Link
              to={`/category/${data.category._id}`}
              className="text-decoration-none "
            >
              <button className="btn btn-outline-dark">
                {" "}
                {data.category.categoryName}
              </button>
            </Link>
            <span className="text-muted small">
              {new Date(data.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Content */}
          <div className="card-body px-4 pb-4">
            <h2 className="card-title text-primary fw-bold mt-3">
              {data.title}
            </h2>
            <p
              className="card-text fs-5 text-secondary mt-3"
              style={{ lineHeight: "1.7" }}
            >
              {data.description}
            </p>
            <Link
              to="/"
              className="btn btn-outline-primary mt-4 rounded-pill px-4"
            >
              ⬅ Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading post...</p>
        </div>
      )}
    </div>
  );
};

export default Single;
