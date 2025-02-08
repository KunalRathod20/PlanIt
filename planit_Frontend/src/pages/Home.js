import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const images = [
  {
    src: "/img/img1.jpg",
    alt: "Organize Your Events",
    title: "Organize Your Events",
    caption: "Create and manage your events effortlessly with PlanIT.",
  },
  {
    src: "/img/img2.jpg",
    alt: "Seamless Payments",
    title: "Seamless Payments",
    caption: "Pay and share event bills easily with integrated payment systems.",
  },
  {
    src: "/img/img3.jpg",
    alt: "Join Engaging Events",
    title: "Join Engaging Events",
    caption: "Discover exciting events, send join requests, and participate.",
  },
];

const Home = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
      once: true, // Animation triggers only once when in view
    });
  }, []);

 

  return (
    <div style={{ margin: 0, padding: 0 }}>
      

      

      {/* Hero Section */}
      <div className="container  conwidth  mt-2  " >
        <div className="text-center mb-2" data-aos="fade-up">
          <h1 className="display-4" style={{ color: "#2C3E50" }}>
            Welcome to PlanIT
          </h1>
          <p style={{ color: "#7F8C8D" }}>Your professional event management platform.</p>
        </div>

        {/* Slideshow / Carousel */}
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="2000" // Auto slide every 1000ms
          data-aos="fade-up"
        >
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={image.src}
                  className="d-block w-100"
                  alt={image.alt}
                  style={{ height: "300px", objectFit: "cover" }} // Minimized height for images
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 style={{ color: "#3498DB" }}>{image.title}</h5>
                  <p style={{ color: "#7F8C8D" }}>{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Feature Highlights Section */}
        <div className="row mt-5">
          <div className="col-md-4" data-aos="flip-left">
            <div className="card text-center" style={{ borderRadius: "10px" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#2C3E50" }}>Event Creation</h5>
                <p className="card-text" style={{ color: "#7F8C8D" }}>
                  Easily create and manage events with specific details, locations, and participants.
                </p>
                <Link to="/create-event" className="btn" style={{ backgroundColor: "#3498DB", color: "#fff" }}>
                  Create an Event
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4" data-aos="flip-left">
            <div className="card text-center" style={{ borderRadius: "10px" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#2C3E50" }}>Join Events</h5>
                <p className="card-text" style={{ color: "#7F8C8D" }}>
                  Discover events based on your interests and join with just a few clicks.
                </p>
                <Link to="/events" className="btn" style={{ backgroundColor: "#3498DB", color: "#fff" }}>
                  View Events
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4" data-aos="flip-left">
            <div className="card text-center" style={{ borderRadius: "10px" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#2C3E50" }}>Track Payments</h5>
                <p className="card-text" style={{ color: "#7F8C8D" }}>
                  Easily manage payments and track your share of event expenses.
                </p>
                <Link to="/my-events" className="btn" style={{ backgroundColor: "#3498DB", color: "#fff" }}>
                  My Events
                </Link>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    {/* Footer Section */}
    <footer style={{ backgroundColor: "#2C3E50", color: "#fff", paddingTop: "40px" }}>
          <div className="container">
            <div className="row">
              {/* About Us */}
              <div className="col-md-4" data-aos="fade-up">
                <h5>About Us</h5>
                <p>
                  PlanIT is your ultimate event management platform, helping you
                  organize and participate in amazing events seamlessly.
                </p>
              </div>

              {/* Quick Links */}
              <div className="col-md-4" data-aos="fade-up">
                <h5>Quick Links</h5>
                <ul>
                  <li>
                    <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" style={{ color: "#fff", textDecoration: "none" }}>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="col-md-4" data-aos="fade-up">
                <h5>Contact Us</h5>
                <p>Email: contact@planit.com</p>
                <p>Phone: +1 234 567 890</p>
              </div>
            </div>
            </div>

        </footer>
    </div>
    
    
  );
};

export default Home;
