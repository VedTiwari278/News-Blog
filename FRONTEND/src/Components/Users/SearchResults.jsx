import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  // Extract query string like ?term=modi
  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get("term");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(
          `https://news-blog-abh6.vercel.app/search?term=${term}`
        );
        setResults(res.data.data);
      } catch (error) {
        console.error("Search failed", error);
      }
    };

    if (term) fetchSearchResults();
  }, [term]);

  return (
    <div className="container my-4">
      <h4 className="mb-4">
        Search Results for "<strong>{term}</strong>"
      </h4>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="d-flex flex-column gap-4 align-items-center">
          {results.map((newsItem) => (
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
                src={newsItem.image}
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
                        to={`/category/${newsItem.category?._id}`}
                        className="text-decoration-none"
                      >
                        {newsItem.category?.categoryName}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
