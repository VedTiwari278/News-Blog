import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

const CategoryWise = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const FetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/getAllPostById/${id}`
        );
        if (response) {
          setNews(response.data.data);
        }
      } catch (err) {
        console.error("No Posts Found", err);
      } finally {
        setLoading(false);
      }
    };
    FetchNews();
  }, [id]);

  const categoryName =
    news.length > 0 ? news[0].category?.categoryName : "Unknown Category";

  return (
    <div className="container mt-4">
      {/* Category Marquee */}
      <h3 className="text-dark text-center mb-4">
        <marquee behavior="scroll" direction="left">
          {`Category: ${categoryName}`}
        </marquee>
      </h3>

      <div className="row">
        {/* Left Column */}
        <div
          className="col-md-9 d-flex flex-column align-items-center"
          style={{ minHeight: "70vh" }}
        >
          {loading ? (
            <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "60vh" }}>
              <div className="text-center">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading posts...</p>
              </div>
            </div>
          ) : news.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ minHeight: "60vh" }}
            >
              <div
                className="alert alert-danger text-center shadow p-4 rounded"
                style={{ maxWidth: "700px", width: "100%" }}
              >
                <h5 className="text-danger fw-bold mb-2">🚫 No Posts Found</h5>
                <h6 className="mb-0 text-muted">
                  No content is available under this category.
                </h6>
              </div>
            </div>
          ) : (
            news.map((newsItem) => (
              <div
                className="card shadow-sm flex-row mb-3"
                style={{
                  width: "100%",
                  maxWidth: "700px",
                  height: "180px",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
                key={newsItem._id}
              >
                {/* Left Image */}
                <img
                  src={`http://localhost:3000/uploads/${newsItem.image}`}
                  alt="News"
                  style={{
                    width: "200px",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Right Content */}
                <div
                  className="card-body d-flex flex-column justify-content-between"
                  style={{ flex: 1 }}
                >
                  <div>
                    <h5 className="card-title mb-1">{newsItem.title}</h5>
                    <ul className="list-inline mb-2 text-muted small">
                      <li className="list-inline-item">
                        <Link
                          to={`/category/${newsItem.category._id}`}
                          className="text-decoration-none"
                        >
                          {newsItem.category.categoryName}
                        </Link>
                      </li>
                      <li className="list-inline-item">|</li>
                      <li className="list-inline-item">
                        <a href="#" className="text-decoration-none">
                          {newsItem.author?.username || "Unknown"}
                        </a>
                      </li>
                      <li className="list-inline-item">|</li>
                      <li className="list-inline-item">
                        {new Date(newsItem.createdAt).toLocaleDateString()}
                      </li>
                    </ul>
                  </div>

                  <div className="d-flex flex-column">
                    <p
                      className="card-text small mb-2"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {newsItem.description.length > 100
                        ? newsItem.description.slice(0, 40) + "..."
                        : newsItem.description}
                    </p>
                    <div>
                      <Link
                        to={`/post/${newsItem._id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Sidebar */}
        <div className="col-md-3">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default CategoryWise;
