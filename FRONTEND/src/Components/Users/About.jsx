import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaLaptopCode,
  FaRegNewspaper,
  FaUsers,
} from "react-icons/fa";

const About = () => {
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
          minHeight: "40vh", // ✅ keeps height responsive
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
        <p className="lead mt-3">
          Stay informed with trusted, timely, and unbiased journalism.
        </p>
      </div>

      <Container className="my-5">
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
              <h3 className="fw-bold text-secondary mb-3">
                <FaRegNewspaper className="me-2 text-info" />
                Our Mission
              </h3>
              <p className="fs-5">
                In a world full of noise and misinformation, our goal is to
                empower people with authentic, accurate, and timely news. Every
                story we publish is well-researched and reader-focused.
              </p>
            </div>
          </Col>
        </Row>

        {/* Why Choose Us Section */}
        <Row className="mb-5 align-items-center">
          <Col md={6} className="order-2 order-md-1">
            <div className="px-3">
              <h3 className="fw-bold text-secondary mb-3">
                <FaCheckCircle className="me-2 text-success" />
                Why Choose Us?
              </h3>
              <ul className="fs-5 list-unstyled">
                <li className="border-start border-4 my-2 p-4 border-danger bg-light rounded-start rounded-end shadow-sm">
                  <FaCheckCircle className="text-success me-2" /> Timely News
                  Updates
                </li>
                <li className="border-start border-4 my-2 p-4 border-warning bg-light rounded-start rounded-end shadow-sm">
                  <FaCheckCircle className="text-success me-2" /> Well-Curated
                  Categories
                </li>
                <li className="border-start border-4 my-2 p-4 border-info bg-light rounded-start rounded-end shadow-sm">
                  <FaCheckCircle className="text-success me-2" /> Simple & Clean
                  UI
                </li>
                <li className="border-start border-4 my-2 p-4 border-primary bg-light rounded-start rounded-end shadow-sm">
                  <FaLaptopCode className="text-info me-2" /> Built with MERN
                  Stack
                </li>
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

        {/* Extra Section: Team Collaboration */}
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
              <h3 className="fw-bold text-secondary mb-3">
                <FaUsers className="me-2 text-warning" />
                Team Collaboration
              </h3>
              <p className="fs-5">
                Our editorial and tech teams work hand-in-hand to ensure that
                what you see is not only fast and functional, but also backed by
                journalistic integrity.
              </p>
            </div>
          </Col>
        </Row>

        {/* Developer Section */}
        <div className="bg-light p-5 rounded-4 shadow text-center border-danger border-1 border">
          <h4 className="fw-bold text-dark mb-4">Meet the Developer</h4>
          <img
            src="/images/mypic.jpg"
            alt="Developer"
            className="rounded mb-3 border border-3 border-muted"
            style={{ width: "150px", height: "165px", objectFit: "cover" }}
          />
          <h5 className="fw-semibold">Ved Tiwari</h5>
          <p className="text-dark mb-3 ">
            MERN Stack Developer | DSA Enthusiast | YouTuber
            <Link
              to="https://www.youtube.com/@Algo_Tap"
              className="text-decoration-none "
            >
              @ Algo_Tap
            </Link>
          </p>
          <p className="fs-5" style={{ maxWidth: "700px", margin: "0 auto" }}>
            This project is a part of my continuous learning and growth in
            full-stack development. I am passionate about building scalable,
            impactful, and user-centric applications.
          </p>
        </div>
      </Container>
    </>
  );
};

export default About;
