import React, { useState } from "react";
import OTPVerification from "./otpVerification";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);

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
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setShowOtp(true); // Show OTP input after validation
  };

  return (
    <div className="signup-container">
      {!showOtp ? (
        <div className="signup-box">
          <h2>Create New Account</h2>
          <p className="signup-text-muted">
            Already Registered? <a href="#">Sign in</a>
          </p>

          {error && <div className="alert signup-alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="signup-form-group">
              <label>EMAIL</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="signup-form-group">
              <label>PASSWORD</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="signup-form-group">
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="signup-btn-submit" type="submit">Send OTP</button>
          </form>
        </div>
      ) : (
        <OTPVerification email={email} />
      )}
    </div>
  );
}