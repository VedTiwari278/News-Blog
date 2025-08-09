import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../context/NewContext";
import { ThemeContext } from "../context/ThemeContext";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { Carousel } from "react-bootstrap";
import { easeInOut, motion } from "framer-motion";
import "../CSS/News.css";
import axios from "axios";

const News = () => {
  const { news, setNews, loading, FetchNews, error } = useContext(NewsContext);
  const { darkMode } = useContext(ThemeContext);
  const [likeCounts, setLikeCounts] = useState({});
  const [isLiked, setIsLiked] = useState({});

  useEffect(() => {
    FetchNews();
  }, []);

  const recentPosts = [...news]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/300x200?text=Image+Not+Available";
    e.target.style.objectFit = "contain";
  };

  const handleLike = async (postId) => {
    // Prevent multiple likes (you can toggle instead if needed)
    if (isLiked[postId]) return;

    setLikeCounts((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));

    setIsLiked((prev) => ({
      ...prev,
      [postId]: true,
    }));

    try {
      await axios.post(
        `https://news-blog-abh6.vercel.app/api/posts/${postId}/like`
      );
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  const SkeletonCard = () => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 px-2">
      <div className="skeleton-card card h-100 p-3 rounded-4 border-0 shadow-sm">
        <div className="skeleton-image mb-3"></div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="skeleton-badge"></div>
          <div className="skeleton-readtime"></div>
        </div>
        <div className="skeleton-title mb-2"></div>
        <div className="skeleton-line w-100 mb-2"></div>
        <div className="skeleton-line w-75 mb-3"></div>
        <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
          <div className="d-flex align-items-center gap-2 mt-2">
            <div className="skeleton-author-line mb-1"></div>
            <div className="skeleton-author-line w-50"></div>
          </div>
          <div className="d-flex align-items-center gap-3 mt-2">
            <div className="skeleton-icon"></div>
            <div className="skeleton-icon"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div
        className={`alert alert-danger ${darkMode ? "bg-dark text-light" : ""}`}
      >
        Failed to load news: {error.message}
      </div>
    );
  }

  return (
    <div className="container-fluid px-3">
      {/* Carousel */}
      {!loading && recentPosts.length > 0 && (
        <div className="mb-5">
          <h4 className={`mb-4 ${darkMode ? "text-light" : "text-dark"}`}>
            Recent Highlights
          </h4>
          <Carousel fade indicators={false} interval={4000} pause="hover">
            {recentPosts.map((post) => (
              <Carousel.Item key={post._id}>
                <Link to={`/post/${post._id}`} className="text-decoration-none">
                  <motion.div
                    whileHover={{
                      border: `${
                        darkMode ? "2px solid white" : "5px solid black"
                      }`,
                    }}
                    whileTap={{
                      border: `${
                        darkMode ? "2px solid white" : "5px solid black"
                      }`,
                    }}
                    className="position-relative"
                    style={{
                      height: "350px",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      className="d-block w-100 h-100"
                      src={post.image}
                      alt={post.title}
                      onError={handleImageError}
                      style={{
                        objectFit: "cover",
                        filter: darkMode
                          ? "brightness(0.6)"
                          : "brightness(0.8)",
                      }}
                    />
                    <div
                      className="position-absolute bottom-0 start-0 p-4 w-100"
                      style={{
                        background: darkMode
                          ? "linear-gradient(to top, rgba(0,0,0,0.9), transparent)"
                          : "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                        color: "white",
                      }}
                    >
                      <h3>{post.title}</h3>
                      <div className="d-flex align-items-center gap-3">
                        <span
                          className={`badge ${
                            darkMode ? "bg-primary" : "bg-light text-dark"
                          }`}
                        >
                          {post.category?.categoryName || "Uncategorized"}
                        </span>
                        <small>
                          {formatDistanceToNow(new Date(post.createdAt), {
                            addSuffix: true,
                          })}
                        </small>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}

      {/* News Cards */}
      <div className="row g-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : news.map((item) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 px-2"
                key={item._id}
              >
                <div
                  className={`card h-100 shadow-sm ${
                    darkMode ? "text-light bg-dark" : "text-dark bg-light"
                  }`}
                  style={{
                    border: darkMode ? "1px solid #444" : "1px solid #e0e0e0",
                    borderRadius: "10px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Image */}
                  <div
                    className="overflow-hidden"
                    style={{ height: "200px", backgroundColor: "#e9ecef" }}
                  >
                    <Link
                      to={`/post/${item._id}`}
                      className="text-decoration-none"
                    >
                      <motion.img
                        src={item.image}
                        alt="News"
                        className="w-100 h-100 object-fit-cover zoom-image"
                        onError={handleImageError}
                        whileHover={{
                          scale: 1.1,
                          rotate: 360,
                          transition: { duration: 0.5, ease: "easeInOut" },
                        }}
                      />
                    </Link>
                  </div>

                  {/* Card Body */}
                  <motion.div
                    className="card-body d-flex flex-column p-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    viewport={{ amount: 0.2 }}
                  >
                    {/* Category + Time */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Link
                        to={`/category/${item.category?._id || ""}`}
                        className={`badge rounded-pill px-3 py-1 fw-semibold text-decoration-none ${
                          darkMode ? "bg-primary" : "bg-info text-dark"
                        }`}
                      >
                        {item.category?.categoryName || "Uncategorized"}
                      </Link>
                      <div className="d-flex align-items-center">
                        <small
                          className={darkMode ? "text-light" : "text-muted"}
                        >
                          {formatDistanceToNow(new Date(item.createdAt), {
                            addSuffix: true,
                          })}
                        </small>
                      </div>
                    </div>

                    {/* Title */}
                    <h5
                      className="fw-semibold mb-2"
                      style={{ fontSize: "1.1rem", minHeight: "3rem" }}
                    >
                      <Link
                        to={`/post/${item._id}`}
                        className={`text-decoration-none ${
                          darkMode ? "text-light" : "text-dark"
                        }`}
                      >
                        {item.title?.length > 70
                          ? `${item.title.substring(0, 70)}...`
                          : item.title}
                      </Link>
                    </h5>

                    {/* Description */}
                    <p
                      className={`small mb-3 ${
                        darkMode ? "text-light" : "text-muted"
                      }`}
                      style={{ lineHeight: "1.5", minHeight: "3rem" }}
                    >
                      {item.description?.length > 100
                        ? `${item.description.substring(0, 100)}...`
                        : item.description}
                    </p>

                    {/* Footer */}
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                      {/* Author */}
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className={`rounded-circle d-flex align-items-center justify-content-center fw-semibold ${
                            darkMode ? "bg-secondary" : "bg-primary"
                          } text-light`}
                          style={{
                            width: "36px",
                            height: "36px",
                            fontSize: "14px",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.author?.username?.[0] || "A"}
                        </div>
                        <div className="d-flex flex-column">
                          <span
                            className={`fw-semibold ${
                              darkMode ? "text-light" : "text-dark"
                            }`}
                            style={{ fontSize: "0.85rem" }}
                          >
                            {item.author?.username || "Anonymous"}
                          </span>
                        </div>
                      </div>

                      {/* Icons */}
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className={`d-flex align-items-center gap-1 ${
                            darkMode ? "text-light" : "text-muted"
                          }`}
                        >
                          <FaRegHeart
                            size={16}
                            onClick={() => handleLike(item._id)}
                            style={{
                              cursor: "pointer",
                              color: isLiked[item._id]
                                ? "red"
                                : darkMode
                                ? "white"
                                : "gray",
                            }}
                          />
                          {likeCounts[item._id] !== undefined
                            ? item.likes + likeCounts[item._id]
                            : item.likes}
                        </span>

                        <span
                          className={`d-flex align-items-center gap-1 ${
                            darkMode ? "text-light" : "text-muted"
                          }`}
                        >
                          <FaRegComment size={16} />{" "}
                          {item.comments?.length || 0}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default News;
