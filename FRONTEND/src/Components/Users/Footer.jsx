import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer
      className={`pt-4 pb-3 mt-5 fw-bold ${
        darkMode ? "bg-dark text-light" : "bg-secondary text-dark"
      }`}
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Left: About/Name */}
          <div className="col-md-4 mb-4">
            <h5>Ved Tiwari</h5>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>

          {/* Center: Quick Links */}
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-decoration-none d-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none d-block">
                  About
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-decoration-none d-block">
                  Start Writing
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Social Links */}
          <div className="col-md-4 mb-4">
            <h5>Follow Me</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-4 fs-5">
              <a
                href="https://www.instagram.com/vedprakash_431/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/ved-prakash-tiwari-b21522280/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/VedTiwari278"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:vedprakasht759@gmail.com"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <hr className={darkMode ? "bg-light" : "bg-dark"} />
        <p className="text-center mb-0">Made with ❤️ by Ved Tiwari</p>
      </div>
    </footer>
  );
};

export default Footer;
