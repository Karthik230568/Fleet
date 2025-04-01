import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css';
import fleetLogo from './Fleet Logo.png';

export default function Adminsignin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Email Validation Function
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Invalid Email Format!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    setError("");
    // Navigate to admin dashboard after successful login
    navigate("/admin");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/auth/signup", { state: { isForgotPassword: true, isAdmin: true } });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo-section">
          <img src={fleetLogo} alt="Fleet Logo" />
          <div className="brand">FLEET</div>
          <div className="tagline">DRIVE YOUR JOURNEY ANYTIME, ANYWHERE</div>
        </div>

        <div className="form-section">
          <h2 className="auth-title">Admin Sign In</h2>
          
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="mb-3">
              <label className="form-label">EMAIL</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">PASSWORD</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="forgot-password">
                <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
              </div>
            </div>

            <button type="submit" className="btn">Sign In</button>
          </form>

          <div className="auth-links">
            <a href="/auth/signin">Back to User Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}
