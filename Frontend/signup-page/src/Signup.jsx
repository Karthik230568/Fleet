import React, { useState } from "react";
import OTPVerification from "./otpverification";

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
    <div className="d-flex justify-content-center align-items-center vh-100">
      {!showOtp ? (
        <div className="p-4 rounded" style={{ width: "350px" }}>
          <h2 className="text-center" style={{ fontSize: "40px" }}>Create New Account</h2>
          <p className="text-center text-muted">
            Already Registered? <a href="#">Sign in</a>
          </p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} style={{ backgroundColor: "#e1d3fa" }}>
            <div className="mb-3">
              <label className="form-label fw-bold">EMAIL</label>
              <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">PASSWORD</label>
              <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">CONFIRM PASSWORD</label>
              <input type="password" className="form-control" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            <button className="btn btn-dark w-100" type="submit">Send OTP</button>
          </form>
        </div>
      ) : (
        <OTPVerification email={email} />
      )}
    </div>
  );
}
