import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { NewsContext } from "../context/NewContext";
import { ThemeContext } from "../context/ThemeContext";

const CategoryWise = () => {
  const { id } = useParams();
  const { news, loading } = useContext(NewsContext);
  const { darkMode } = useContext(ThemeContext);
  const [filteredNews, setFilteredNews] = useState([]);

  // Filter posts by category
  useEffect(() => {
    if (news.length) setFilteredNews(news.filter((post) => post.category?._id === id));
  }, [news, id]);

  const categoryName =
    filteredNews.length > 0
      ? filteredNews[0].category?.categoryName
      : "Unknown Category";

  return (
    <div
      className="container mt-4"
      style={{ minHeight: "80vh", color: darkMode ? "#fff" : "#111" }}
    >
      {/* Category Info */}
      <div
        className="mb-4 p-3 rounded"
        style={{ backgroundColor: darkMode ? "#111" : "#f8f9fa" }}
      >
        <h4>Category: {categoryName}</h4>
      </div>
      <hr />

      {/* Posts */}
      <div className="row">
        <div className="col-md-9">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p>Loading posts...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="alert text-center py-4">
              <h5>No posts found in this category.</h5>
            </div>
          ) : (
            <div className="row g-3">
              {filteredNews.map((post) => (
                <div key={post._id} className="col-sm-12 col-md-6 col-lg-4">
                  <div className={`card h-100 ${darkMode ? "bg-dark text-light" : ""}`}>
                    <Link to={`/post/${post._id}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="card-img-top"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/300x180?text=No+Image")
                        }
                      />
                    </Link>
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title text-truncate" title={post.title}>
                        {post.title}
                      </h6>
                      <p className="text-muted mb-2" style={{ fontSize: 12 }}>
                        {post.author?.username || "Unknown"} •{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <p className="card-text text-truncate" title={post.description}>
                        {post.description}
                      </p>
                      <Link
                        to={`/post/${post._id}`}
                        className="mt-auto btn btn-sm btn-outline-primary"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-md-3">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default CategoryWise;
