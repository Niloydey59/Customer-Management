import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styling/home.css";
import PageTitle from "../components/common/pageTitle";

const Home = () => {
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimateHero(true);
  }, []);

  return (
    <div className="home-container">
      <PageTitle title="Home" />

      {/* Hero Section */}
      <section className={`hero-section ${animateHero ? "animate" : ""}`}>
        <div className="hero-content">
          <h1>Welcome to Your Application</h1>
          <p>A secure and efficient platform for managing your needs</p>
          <div className="cta-buttons">
            <Link to="/register" className="primary-btn">
              Get Started
            </Link>
            <Link to="/features" className="secondary-btn">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-container">
            {/* Replace with an actual image if you have one */}
            <div className="placeholder-image"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Authentication</h3>
            <p>Enhanced security with our state-of-the-art login system</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Intuitive Dashboard</h3>
            <p>Access all your information in one well-organized place</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Performance</h3>
            <p>Optimized for speed and efficiency across all devices</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">AppName</div>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="footer-social">
            {/* Add your social icons here */}
            <a href="#" className="social-icon">
              📘
            </a>
            <a href="#" className="social-icon">
              📱
            </a>
            <a href="#" className="social-icon">
              📸
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AppName. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
