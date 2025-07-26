import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchNews = async () => {
      try {
        const response = await axios.get(
          "https://news-blog-abh6.vercel.app/getAllPost"
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
  }, []);

  return (
    <div className="container my-4">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {news.map((newsItem) => (
            <div className="col-12 col-md-6 col-lg-4" key={newsItem._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={newsItem.image}
                  alt="News"
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{newsItem.title}</h5>
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
                        {newsItem.author.username}
                      </li>
                      <li className="list-inline-item">|</li>
                      <li className="list-inline-item">
                        {new Date(newsItem.createdAt).toLocaleDateString()}
                      </li>
                    </ul>
                  </div>
                  <p className="card-text small mb-2 text-truncate">
                    {newsItem.description.length > 100
                      ? newsItem.description.slice(0, 100) + "..."
                      : newsItem.description}
                  </p>
                  <Link
                    to={`/post/${newsItem._id}`}
                    className="btn btn-sm btn-outline-primary mt-auto"
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
  );
};

export default News;
