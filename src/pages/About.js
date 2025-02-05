import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the styles for animations
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ECF0F1", // Light background color for the page
        paddingTop: "0", // Remove extra space on top
        minHeight: "100vh", // Ensure full height
      }}
    >
      <div className="container mt-5 pt-5">
        {/* Hero Section */}
        <div className="text-center" data-aos="fade-up">
          <h1 className="display-4" style={{ color: "#2C3E50" }}>
            About PlanIT
          </h1>
          <p style={{ color: "#7F8C8D" }}>
            PlanIT is a seamless event management platform that helps you
            create, manage, and join events with integrated payments.
          </p>
        </div>

        {/* About Us Section */}
        <div className="row mt-5" data-aos="fade-right">
          <div className="col-md-6">
            <h3 style={{ color: "#3498DB" }}>Our Vision</h3>
            <p style={{ color: "#7F8C8D" }}>
              At PlanIT, we strive to make event organization easier for
              everyone. Whether you're planning a small get-together or a
              corporate event, our platform provides the tools you need to make
              it a success.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="img/logo.png"
              alt="PlanIT"
              className="img-fluid rounded"
              data-aos="fade-left"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center mt-5" data-aos="zoom-in">
          <h3 className="display-5" style={{ color: "#3498DB" }}>
            Features of PlanIT
          </h3>
          <div className="row">
            <div className="col-md-4 mb-3" data-aos="flip-left">
              <div className="card text-center" style={{ borderRadius: "10px" }}>
                <div className="card-body">
                  <h4 className="card-title" style={{ color: "#2C3E50" }}>
                    Event Creation
                  </h4>
                  <p className="card-text" style={{ color: "#7F8C8D" }}>
                    Easily create events with dates, locations, and participants.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3" data-aos="flip-left">
              <div className="card text-center" style={{ borderRadius: "10px" }}>
                <div className="card-body">
                  <h4 className="card-title" style={{ color: "#2C3E50" }}>
                    Seamless Payments
                  </h4>
                  <p className="card-text" style={{ color: "#7F8C8D" }}>
                    Pay your share of the event cost with integrated payment
                    systems like Razorpay.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3" data-aos="flip-left">
              <div className="card text-center" style={{ borderRadius: "10px" }}>
                <div className="card-body">
                  <h4 className="card-title" style={{ color: "#2C3E50" }}>
                    Join Events
                  </h4>
                  <p className="card-text" style={{ color: "#7F8C8D" }}>
                    Browse events, send join requests, and participate in events
                    that match your interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-5" data-aos="fade-up">
          <p className="lead" style={{ color: "#7F8C8D" }}>
            Join us today and manage your events with ease, all in one place.
          </p>
          <Link to="/create-event" className="btn" style={{ backgroundColor: "#3498DB", color: "#fff" }}>
            Start Creating Events
          </Link>
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

export default About;
