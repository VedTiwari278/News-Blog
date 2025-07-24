import React, { useEffect, useState } from "react";
import Saerch from "./Saerch";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getAllPost");
        if (response?.data?.data) {
          // Get the last 3 posts (you can change this logic as needed)
          const latestPosts = response.data.data.slice(-5).reverse();
          setRecentPosts(latestPosts);
        }
      } catch (err) {
        console.error("Failed to fetch recent posts", err);
      }
    };
    fetchRecentPosts();
  }, []);

  return (
    <div
      style={{
        padding: "10px",
        background: "#cdd0d1fa",
        border: "2px solid #cacacafa",
        marginTop: "25px",
        marginLeft: "10px",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <Saerch />
      </div>

      {/* Recent Posts Section */}
      <div>
        <h4
          style={{
            borderBottom: "2px solid #ccc",
            paddingBottom: "5px",
            display: "inline-block",
          }}
        >
          Recent Posts
        </h4>

        <div className="d-flex flex-column gap-3 mt-3">
          {recentPosts.map((post) => (
            <div
              key={post._id}
              className="card shadow-sm flex-row"
              style={{
                width: "100%",
                height: "100px",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {/* Left Image */}
              <img
                src={`http://localhost:3000/uploads/${post.image}`}
                alt="News"
                style={{
                  width: "80px",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Right Content */}
              <div
                className="card-body d-flex flex-column justify-content-between"
                style={{ padding: "8px", flex: 1 }}
              >
                <h6 className="card-title mb-1" style={{ fontSize: "14px" }}>
                  {post.title.length > 35
                    ? post.title.slice(0, 35) + "..."
                    : post.title}
                </h6>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-sm btn-outline-primary mt-1"
                >
                  Read 
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
