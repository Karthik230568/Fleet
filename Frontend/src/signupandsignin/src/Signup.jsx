import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css';
import fleetLogo from './Fleet Logo.png';
import OTPVerification from './otpverification';
import useAuthStore from "./../../../store/AuthStore.js";

export default function Signup() {
  const navigate = useNavigate();
  const { setSignupData, sendOtp, isOtpSent } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
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
    try {
      setSignupData(email, password);
      await sendOtp();
      setError("");
      setShowOtp(true); // Show OTP verification instead of navigating
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  if (showOtp) {
    return <OTPVerification email={email} />;
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo-section">
          <img src={fleetLogo} alt="Fleet Logo" />
          <div className="brand">FLEET</div>
          <div className="tagline">DRIVE YOUR JOURNEY ANYTIME, ANYWHERE</div>
        </div>

        <div className="form-section">
          <h2 className="auth-title">Create New Account</h2>
          
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

            <div className="mb-3">
              <label className="form-label">CONFIRM PASSWORD</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn">Send OTP</button>
          </form>

          <div className="auth-links">
            <span>Already Registered? </span>
            <a href="/auth/signin">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}