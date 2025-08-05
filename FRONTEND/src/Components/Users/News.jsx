import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../context/NewContext";
import { ThemeContext } from "../context/ThemeContext";
import "../CSS/News.css";

const News = () => {
  const { news, loading, FetchNews } = useContext(NewsContext);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    FetchNews();
  }, []);

  const SkeletonCard = () => (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm skeleton-card">
        <div className="skeleton-image shimmer"></div>
        <div className="card-body">
          <div className="skeleton-title shimmer mb-3"></div>
          <div className="skeleton-line shimmer mb-2 w-75"></div>
          <div className="skeleton-line shimmer mb-2 w-50"></div>
          <div className="skeleton-line shimmer mb-2 w-100"></div>
          <div className="skeleton-btn shimmer mt-3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container my-4">
      <div className="row g-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : news.map((item) => (
              <div className="col-12 col-md-6 col-lg-4" key={item._id}>
                <div
                  className={`card h-100 shadow-sm ${
                    darkMode ? "bg-dark text-light" : "bg-light text-dark"
                  }`}
                  style={{
                    background: "#cdd0d1fa",
                    border: "2px solid #cacacafa",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={item.image}
                    alt="News"
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{item.title}</h5>
                      <ul className="list-inline mb-2 text-muted small">
                        <li className="list-inline-item">
                          <Link
                            to={`/category/${item.category._id}`}
                            className="text-decoration-none"
                          >
                            {item.category.categoryName}
                          </Link>
                        </li>
                        <li className="list-inline-item">|</li>
                        <li className="list-inline-item">
                          {item.author.username}
                        </li>
                        <li className="list-inline-item">|</li>
                        <li className="list-inline-item">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </li>
                      </ul>
                    </div>
                    <p className="card-text small mb-2 text-truncate">
                      {item.description.length > 100
                        ? item.description.slice(0, 100) + "..."
                        : item.description}
                    </p>
                    <Link
                      to={`/post/${item._id}`}
                      className="btn btn-sm btn-outline-primary mt-auto"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default News;
