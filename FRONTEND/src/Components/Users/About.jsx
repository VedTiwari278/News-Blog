import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import {
  FaCheckCircle,
  FaLaptopCode,
  FaRegNewspaper,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  const { darkMode } = useContext(ThemeContext);

  const bgCard = darkMode ? "bg-dark text-light" : "bg-light text-dark";
  const sectionText = darkMode ? "text-light" : "text-dark";
  const headingText = darkMode ? "text-info" : "text-secondary";
  const developerBg = darkMode ? "bg-secondary text-light" : "bg-light text-dark";

  return (
    <>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://static.vecteezy.com/system/resources/previews/000/228/657/original/top-headlines-news-themem-background-vector.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          padding: "2rem",
        }}
        className="shadow-lg"
      >
        <h1 className="fw-bold display-4">Welcome to NewsBlog</h1>
        <p className="lead mt-3">Stay informed with trusted, timely, and unbiased journalism.</p>
      </div>

      <Container className={`my-5 ${sectionText}`}>
        {/* Mission Section */}
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.o9yk_oVkanFhcP7FEPHK9AHaEK?pid=Api&P=0&h=180"
              alt="Newsroom"
              className="img-fluid rounded-4 shadow-lg"
            />
          </Col>
          <Col md={6}>
            <div className="px-3">
              <h3 className={`fw-bold mb-3 ${headingText}`}>
                <FaRegNewspaper className="me-2 text-info" />
                Our Mission
              </h3>
              <p className="fs-5">
                In a world full of noise and misinformation, our goal is to empower people with authentic, accurate, and timely news.
              </p>
            </div>
          </Col>
        </Row>

        {/* Why Choose Us Section */}
        <Row className="mb-5 align-items-center">
          <Col md={6} className="order-2 order-md-1">
            <div className="px-3">
              <h3 className={`fw-bold mb-3 ${headingText}`}>
                <FaCheckCircle className="me-2 text-success" />
                Why Choose Us?
              </h3>
              <ul className="fs-5 list-unstyled">
                {[
                  { text: "Timely News Updates", border: "danger" },
                  { text: "Well-Curated Categories", border: "warning" },
                  { text: "Simple & Clean UI", border: "info" },
                  { text: "Built with MERN Stack", border: "primary", icon: <FaLaptopCode className="text-info me-2" /> },
                ].map(({ text, border, icon }, i) => (
                  <li
                    key={i}
                    className={`border-start border-4 my-2 p-4 border-${border} ${bgCard} rounded-start rounded-end shadow-sm`}
                  >
                    {icon || <FaCheckCircle className="text-success me-2" />} {text}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col md={6} className="order-1 order-md-2">
            <img
              src="https://tse4.mm.bing.net/th/id/OIP.iD8Re5AGijMuOtUTBJ7XVQHaEK?pid=Api&P=0&h=180"
              alt="Readers"
              className="img-fluid rounded-4 shadow-lg"
            />
          </Col>
        </Row>

        {/* Team Collaboration */}
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <img
              src="https://www.jcount.com/wp-content/uploads/2015/07/team.jpg"
              alt="Team"
              className="img-fluid rounded-4 shadow-lg"
            />
          </Col>
          <Col md={6}>
            <div className="px-3">
              <h3 className={`fw-bold mb-3 ${headingText}`}>
                <FaUsers className="me-2 text-warning" />
                Team Collaboration
              </h3>
              <p className="fs-5">
                Our editorial and tech teams work hand-in-hand to ensure that what you see is not only fast and functional, but also backed by journalistic integrity.
              </p>
            </div>
          </Col>
        </Row>

        {/* Developer Section */}
        <div className={`p-5 rounded-4 shadow text-center border border-1 border-danger ${developerBg}`}>
          <h4 className="fw-bold mb-4">Meet the Developer</h4>
          <img
            src="/images/mypic.jpg"
            alt="Developer"
            className="rounded mb-3 border border-3"
            style={{ width: "150px", height: "165px", objectFit: "cover" }}
          />
          <h5 className="fw-semibold">Ved Tiwari</h5>
          <p className="mb-3">
            MERN Stack Developer | DSA Enthusiast | YouTuber
            <Link to="https://www.youtube.com/@Algo_Tap" className="text-decoration-none text-info ms-1">
              @Algo_Tap
            </Link>
          </p>
          <p className="fs-5" style={{ maxWidth: "700px", margin: "0 auto" }}>
            This project is a part of my continuous learning and growth in full-stack development. I am passionate about building scalable, impactful, and user-centric applications.
          </p>
        </div>
      </Container>
    </>
  );
};

export default About;
