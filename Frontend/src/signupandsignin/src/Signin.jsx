import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/AuthStore"; // Import Zustand store
import './Auth.css';
import fleetLogo from './Fleet Logo.png';

export default function Signin() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); // Zustand login function
  const errorFromStore = useAuthStore((state) => state.error); // Zustand error state

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Email Validation Function
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Invalid Email Format!");
      return;
    }
    // if (password.length < 6) {
    //   setError("Password must be at least 6 characters!");
    //   return;
    // }

    try {
      setError(""); // Clear local error
      const res = await login(email, password); // Call Zustand login function
      if (res.status !== 200) {
        setError(res.message); // Set error from response 
        return;
      }
      console.log("Login successful:", res);
      navigate("/home"); // Navigate to home page on success
    } catch (err) {
      console.error("Login failed:", err);
      setError(errorFromStore || "Login failed. Please try again."); // Use Zustand error
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/auth/signup", { state: { isForgotPassword: true } });
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

          {(error || errorFromStore) && (
            <div className="alert alert-danger">{error || errorFromStore}</div>
          )}

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