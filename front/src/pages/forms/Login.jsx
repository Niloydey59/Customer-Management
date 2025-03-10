import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import PageTitle from "../../components/common/pageTitle";
import "../../styling/forms/login.css";
import { signInUser } from "../../FetchApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(formData);
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container login-page">
      <PageTitle title="Login" />

      {/* Header with navigation back to home */}
      <header className="form-header">
        <Link to="/" className="back-to-home">
          <span className="logo">AppName</span>
        </Link>
      </header>

      <div className="auth-container">
        <div className="form-panel">
          <div className="form-content">
            <h1>Welcome Back</h1>
            <p className="form-subtitle">Sign in to your account to continue</p>

            {error && <div className="error-message">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="password-options">
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="primary-btn login-btn"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="auth-link">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="image-panel">
          <div className="image-content">
            <h2>Access Your Dashboard</h2>
            <p>Log in to manage your account, access insights, and more.</p>
            <div className="decoration-element"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
