import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);
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
        <div className="row row-cols-1 g-4">
          {results.map((newsItem) => (
            <div className="col" key={newsItem._id}>
              <div
                className={`card shadow-sm h-100 ${
                  darkMode ? "bg-dark text-light" : "bg-light text-dark"
                }`}
              >
                <div className="row g-0 h-100">
                  {/* Image */}
                  <div className="col-md-5">
                    <img
                      src={newsItem.image}
                      alt="News"
                      className="img-fluid h-100"
                      style={{
                        objectFit: "cover",
                        minHeight: "200px",
                        width: "100%",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="col-md-7">
                    <div className="card-body d-flex flex-column h-100">
                      <div>
                        <h5 className="card-title mb-2">{newsItem.title}</h5>
                        <ul className="list-inline mb-2 text-muted small">
                          <li className="list-inline-item">
                            <Link
                              to={`/category/${newsItem.category?._id}`}
                              className="text-decoration-none"
                            >
                              {newsItem.category?.categoryName}
                            </Link>
                          </li>
                          <li className="list-inline-item d-none d-sm-inline">
                            |
                          </li>
                          <li className="list-inline-item">
                            <a href="#" className="text-decoration-none">
                              {newsItem.author.username}
                            </a>
                          </li>
                          <li className="list-inline-item d-none d-sm-inline">
                            |
                          </li>
                          <li className="list-inline-item">
                            {new Date(newsItem.createdAt).toLocaleDateString()}
                          </li>
                        </ul>
                      </div>

                      <p className="card-text small mb-3">
                        {newsItem.description.length > 100
                          ? newsItem.description.slice(0, 100) + "..."
                          : newsItem.description}
                      </p>

                      <div className="mt-auto">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
