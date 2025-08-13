import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { NewsContext } from "../context/NewContext";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";

const UserWise = () => {
  const { id } = useParams();
  const { news, loading } = useContext(NewsContext);
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const [filteredNews, setFilteredNews] = useState([]);

  // Filter posts by this user
  useEffect(() => {
    if (news.length)
      setFilteredNews(news.filter((post) => post.author?._id === id));
  }, [news, id]);

  const author = user.find((u) => u._id === id) || {};
  const fullName =
    author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.username || "Unknown";
  const avatar =
    author.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName
    )}&background=0D8ABC&color=fff&size=128`;
  const joinDate = author.createdAt
    ? new Date(author.createdAt).toLocaleDateString()
    : "Unknown";
  const role = author.role || "user";

  return (
    <div
      className="container mt-4"
      style={{ minHeight: "80vh", color: darkMode ? "#fffdfdff" : "#111" }}
    >
      {/* User Info */}
      <div
        className="d-flex align-items-center mb-4 p-3 rounded"
        style={{ backgroundColor: darkMode ? "#111" : "rgba(255, 255, 255, 1)" }}
      >
        <img
          src={avatar}
          alt={fullName}
          className="border border-2"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            marginRight: 16,
          }}
        />
        <div className="fw-semibold">
          <h4>{fullName}</h4>
          <p>
            Role: {role} • Joined: {joinDate}
          </p>
          <p>Email: {author.email || "N/A"}</p>
        </div>
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
              <h5>No posts found by this author.</h5>
            </div>
          ) : (
            <div className="row g-3">
              {filteredNews.map((post) => (
                <div key={post._id} className="col-sm-12 col-md-6 col-lg-4">
                  <div className="card h-100">
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
                      <h6
                        className="card-title text-truncate"
                        title={post.title}
                      >
                        {post.title}
                      </h6>
                      <p className="text-muted mb-2" style={{ fontSize: 12 }}>
                        {fullName} •{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <p
                        className="card-text text-truncate"
                        title={post.description}
                      >
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

export default UserWise;
