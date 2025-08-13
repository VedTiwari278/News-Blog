import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../context/NewContext";
import { ThemeContext } from "../context/ThemeContext";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import "../CSS/News.css"; // keep only minimal styling for skeletons etc
import axios from "axios";

const News = () => {
  const { news, loading, FetchNews, error } = useContext(NewsContext);
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

  const cardBgClass = darkMode ? "text-light bg-dark" : "text-dark bg-light";
  const borderColor = darkMode ? "#444" : "#e0e0e0";
  const badgeClass = darkMode ? "bg-primary" : "bg-info text-dark";
  const textLightOrMuted = darkMode ? "text-light" : "text-muted";

  const heartColor = (liked) => (liked ? "red" : darkMode ? "white" : "gray");

  if (error)
    return (
      <div
        className={`alert alert-danger ${darkMode ? "bg-dark text-light" : ""}`}
      >
        Failed to load news: {error.message}
      </div>
    );

  return (
    <div className="container-fluid px-3">
      {/* Carousel */}
      {!loading && recentPosts.length > 0 && (
        <div className="mb-5">
          <h4 className={darkMode ? "text-light" : "text-dark"}>
            Recent Highlights
          </h4>
          <Carousel fade indicators={false} interval={4000} pause="hover">
            {recentPosts.map((post) => (
              <Carousel.Item key={post._id}>
                <Link to={`/post/${post._id}`} className="text-decoration-none">
                  <motion.div
                    whileHover={{
                      borderColor: darkMode ? "#fff" : "#000",
                      borderWidth: 3,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="position-relative"
                    style={{
                      height: 350,
                      borderRadius: 10,
                      overflow: "hidden",
                      borderStyle: "solid",
                      borderColor: "transparent",
                      borderWidth: 2,
                    }}
                  >
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      onError={handleImageError}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        filter: darkMode
                          ? "brightness(0.6)"
                          : "brightness(0.8)",
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div
                      className="position-absolute bottom-0 start-0 p-3 w-100"
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
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 px-2">
                <div className="card skeleton-card h-100 p-3 rounded-4 border-0 shadow-sm"></div>
              </div>
            ))
          : news.map((item) => (
              <motion.div
                key={item._id}
                className={`col-12 col-sm-6 col-md-4 col-lg-3 px-2`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  className={`card h-100 shadow-sm ${cardBgClass}`}
                  style={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: 10,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to={`/post/${item._id}`}
                    className="text-decoration-none"
                  >
                    <motion.img
                      src={item.image}
                      alt="News"
                      className="w-100"
                      style={{ height: 200, objectFit: "cover" }}
                      onError={handleImageError}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>

                  <div className="card-body d-flex flex-column p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Link
                        to={`/category/${item.category?._id || ""}`}
                        className={`badge rounded-pill px-3 py-1 fw-semibold text-decoration-none ${badgeClass}`}
                      >
                        {item.category?.categoryName || "Uncategorized"}
                      </Link>
                      <small className={textLightOrMuted}>
                        {formatDistanceToNow(new Date(item.createdAt), {
                          addSuffix: true,
                        })}
                      </small>
                    </div>

                    <h5
                      className={`fw-semibold mb-2 ${
                        darkMode ? "text-light" : "text-dark"
                      }`}
                      style={{ fontSize: "1.1rem", minHeight: "3rem" }}
                    >
                      <Link
                        to={`/post/${item._id}`}
                        className="text-decoration-none"
                      >
                        {item.title?.length > 70
                          ? `${item.title.substring(0, 70)}...`
                          : item.title}
                      </Link>
                    </h5>

                    <p
                      className={`small mb-3 ${textLightOrMuted}`}
                      style={{ lineHeight: 1.5, minHeight: "3rem" }}
                    >
                      {item.description?.length > 100
                        ? `${item.description.substring(0, 100)}...`
                        : item.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                      <div className="d-flex align-items-center gap-2">
                        {/* Author avatar or default avatar */}
                        {item.author?.avatar ? (
                          <Link to={`/user/${item.author._id}`}>
                            <img
                              src={item.author.avatar}
                              alt={item.author.username || "User avatar"}
                              className="rounded-circle"
                              style={{
                                width: 36,
                                height: 36,
                                objectFit: "cover",
                                display: "block",
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/images/avtar.avif";
                              }}
                            />
                          </Link>
                        ) : (
                          <Link to={`/user/${item.author._id}`}>
                            <img
                              src="/images/avtar.avif"
                              alt="Default avatar"
                              className="rounded-circle"
                              style={{
                                width: 36,
                                height: 36,
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                          </Link>
                        )}

                        <div className="d-flex flex-column ms-2">
                          <span
                            className={`fw-semibold ${
                              darkMode ? "text-light" : "text-dark"
                            }`}
                            style={{ fontSize: 14 }}
                          >
                            {item.author?.username || "Anonymous"}
                          </span>
                        </div>
                      </div>

                      <motion.div
                        className="d-flex align-items-center"
                        whileTap={{ scale: 0.8 }}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleLike(item._id)}
                      >
                        <FaRegHeart
                          size={16}
                          color={heartColor(isLiked[item._id])}
                        />
                        <span className={`ms-1 ${textLightOrMuted}`}>
                          {likeCounts[item._id] !== undefined
                            ? item.likes + likeCounts[item._id]
                            : item.likes}
                        </span>
                      </motion.div>

                      <div className="d-flex align-items-center gap-1 text-muted">
                        <FaRegComment
                          size={16}
                          style={{
                            color: `${darkMode ? "white" : ""}`,
                          }}
                        />
                        <span className={` ${textLightOrMuted}`}>
                          {item.comments?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default News;
