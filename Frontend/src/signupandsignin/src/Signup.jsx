import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import fleetLogo from "../../../public/greylogo.png"; // Import logo
import OTPVerification from "./otpverification";
import useAuthStore from "./../../../store/AuthStore.js";

export default function Signup() {
  const navigate = useNavigate();
  const { setSignupData, sendOtp } = useAuthStore();
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
      const res = await sendOtp();
      // if (res.status !== 200) {
      //   setError(res.message);
      //   console.log(res.message);
      //   return;
      // }
      console.log(res);
      setError("");
      setShowOtp(true); 
    }
      catch (error) {
        console.error("Error sending OTP:", error.response?.data || error.message);
        setError("Failed to send OTP. Please try again.");
      }
      // Show OTP verification instead of navigating
  
  };

  if (showOtp) {
    console.log("Navigating to OTP verification page...");
    return <OTPVerification />;
  }


  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo-section">
          <img src={fleetLogo} alt="Fleet Logo" />
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
