import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    const FetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getAllPost");
        if (response) {
          console.log(response.data.data);

          setNews(response.data.data);
        }
      } catch (err) {
        console.error("No Posts Found", err);
      } finally {
        setLoading(false); // stop loader in both success and error
      }
    };
    FetchNews();
  }, []);

  return (
    <div className="d-flex flex-column gap-4 my-4 align-items-center">
      {loading ? (
        // Bootstrap Spinner Loader
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        news.map((newsItem) => (
          <div
            className="card shadow-sm flex-row"
            style={{
              width: "500px",
              height: "180px",
              borderRadius: "12px",
              overflow: "hidden",
            }}
            key={newsItem._id}
          >
            {/* Left Side Image */}
            <img
              src={`http://localhost:3000/uploads/${newsItem.image}`}
              alt="News"
              style={{
                width: "200px",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* Right Side Details */}
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
                      {newsItem.author.username}
                    </a>
                  </li>
                  <li className="list-inline-item">|</li>
                  <li className="list-inline-item">
                    {new Date(newsItem.createdAt).toLocaleDateString()}
                  </li>
                </ul>
              </div>

              {/* Description + Read More */}
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
  );
};

export default News;
