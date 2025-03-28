import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css';
import fleetLogo from './Fleet Logo.png';

export default function Signin() {
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
    // Navigate to user home page after successful login
    navigate("/home");
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
          <h2 className="auth-title">Sign In</h2>

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
            </div>

            <button type="submit" className="btn">Sign In</button>
          </form>

          <div className="auth-links">
            <span>New here? </span>
            <a href="/auth/signup">Create an account</a>
          </div>

          <div className="auth-links">
            <span>Admin? </span>
            <a href="/auth/adminsignin">Sign in as admin</a>
          </div>
        </div>
      </div>
    </div>
  );
}
