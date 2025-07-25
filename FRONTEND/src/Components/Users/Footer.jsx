import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-5">
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
                <a href="/" className="text-white text-decoration-none d-block">
                  Home
                </a>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white text-decoration-none d-block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white text-decoration-none d-block"
                >
                  Be a Contributor
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Social Links */}
          <div className="col-md-4 mb-4">
            <h5>Follow Me</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-4">
              <a
                href="https://www.instagram.com/vedprakash_431/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/ved-prakash-tiwari-b21522280/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/VedTiwari278"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:vedprakasht759@gmail.com"
                className="text-white fs-5"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <hr className="bg-white" />
        <p className="text-center mb-0">Made with ❤️ by Ved Tiwari</p>
      </div>
    </footer>
  );
};

export default Footer;
