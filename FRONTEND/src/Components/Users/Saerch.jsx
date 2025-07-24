import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Saerch = () => {
  const navigate = useNavigate(); // for navigation
  const searchTerm = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const term = searchTerm.current.value.trim();
    if (term) {
      navigate(`/search?term=${encodeURIComponent(term)}`);
    }
  };

  return (
    <div className="search-class container my-4">
      <h5 className="mb-3 text-center">Search News</h5>

      <div className="row justify-content-center">
        <div className="col-12">
          <form
            onSubmit={handleOnSubmit}
            className="d-flex justify-content-center"
          >
            <div
              className="input-group"
              style={{ maxWidth: "500px", width: "100%" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search term..."
                ref={searchTerm}
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Saerch;
