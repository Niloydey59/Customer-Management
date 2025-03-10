import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../styling/error.css";

// Components
import PageTitle from "../components/common/pageTitle";

const Error = () => {
  const [animateError, setAnimateError] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimateError(true);
  }, []);

  return (
    <div className="error-container">
      <PageTitle title="Error Page" />

      <div className={`error-content ${animateError ? "animate" : ""}`}>
        <div className="error-icon">404</div>
        <h1>Page Not Found</h1>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="error-actions">
          <Link to="/" className="primary-btn">
            Return Home
          </Link>
          <Link to="/contact" className="secondary-btn">
            Contact Support
          </Link>
        </div>
      </div>

      <div className={`error-illustration ${animateError ? "animate" : ""}`}>
        <div className="lost-page-illustration"></div>
      </div>
    </div>
  );
};

export default Error;
