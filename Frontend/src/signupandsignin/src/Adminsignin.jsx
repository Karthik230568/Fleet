
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css';
import fleetLogo from '../../../public/greylogo.png';
import useAdminAuthStore from "../../../store/AdminAuthStore";

export default function Adminsignin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, error: storeError, checkAuth } = useAdminAuthStore();

  // Optionally clear any token on mount (if you want a fresh login)
  useEffect(() => {
    localStorage.removeItem('adminToken');
  }, []);

  // Check authentication on first render
  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuth = await checkAuth();
      if (isAuth) {
        // We use navigate without replace so that "/auth/admin" stays in history
        navigate("/admin"); 
      }
    };
    checkAuthentication();
  }, [checkAuth, navigate]);

  // Redirect after successful login
  useEffect(() => {
    if (isAuthenticated) {
      // Use navigate("/admin") without { replace: true } to preserve history
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  // Update error state when storeError changes
  useEffect(() => {
    if (storeError) {
      setError(storeError);
    }
  }, [storeError]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Invalid Email Format!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    try {
      setIsLoading(true);
      // Call your login function; ensure that it does not perform a navigation with replace.
      await login(email, password);
      // Navigation is handled in the useEffect when isAuthenticated becomes true
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo-section">
          <img src={fleetLogo} alt="Fleet Logo" />
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
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="auth-links">
            <a href="/auth/signin">Back to User Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}
