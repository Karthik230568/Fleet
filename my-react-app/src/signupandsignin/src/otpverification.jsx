import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css';
import fleetLogo from './Fleet Logo.png';

export default function OTPVerification({ email }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(45);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [message, setMessage] = useState("");

  // Generate and send OTP when the component mounts
  useEffect(() => {
    generateAndSendOtp();
  }, []); // Added dependency array to prevent infinite loop

  // Timer Countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  // Function to Generate and Send OTP
  const generateAndSendOtp = async () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();
      console.log(data.message);
      setTimer(45);
      setResendEnabled(false);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Failed to send OTP. Please try again.");
    }
  };

  // Handle OTP Input Change
  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
    // Auto-focus previous input on backspace
    else if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Handle key press
  const handleKeyDown = (index, e) => {
    // On backspace, clear current input and focus previous
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Verify OTP Function
  const verifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === generatedOtp) {
      setMessage("OTP Verified Successfully!");
      // Navigate to home page after successful verification
      setTimeout(() => navigate("/home"), 1000);
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
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
          <h2 className="auth-title">Verify Your Email</h2>
          
          <p className="text-center mb-4">
            Enter the 6-digit code sent to<br />
            <strong>{email}</strong>
          </p>

          {message && (
            <div className={`alert ${message.includes("Successfully") ? "alert-success" : "alert-danger"}`}>
              {message}
            </div>
          )}

          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                className="otp-input"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoComplete="off"
              />
            ))}
          </div>

          <button className="btn mt-4" onClick={verifyOtp}>
            Verify OTP
          </button>

          <div className="auth-links">
            {!resendEnabled ? (
              <p>
                Resend OTP in <span className="timer">{timer}</span> seconds
              </p>
            ) : (
              <a href="#" onClick={(e) => { e.preventDefault(); generateAndSendOtp(); }}>
                Resend OTP
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}