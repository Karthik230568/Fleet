import React, { useState, useEffect } from "react";

export default function OTPVerification({ email }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(45);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [message, setMessage] = useState("");

  // Generate and send OTP when the component mounts
  useEffect(() => {
    generateAndSendOtp();
  }, []);

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
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    setGeneratedOtp(otpCode);
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();
      console.log(data.message);
      setTimer(45); // Reset timer
      setResendEnabled(false);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // Handle OTP Input Change
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Verify OTP Function
  const verifyOtp = () => {
    const enteredOtp = otp.join(""); // Combine all OTP digits
    if (enteredOtp === generatedOtp) {
      setMessage("✅ OTP Verified Successfully!");
    } else {
      setMessage("❌ Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center p-4 rounded" style={{ backgroundColor: "#E1D3FA", width: "350px" }}>
      <h2 className="fw-bold">Enter your 6-digit OTP</h2>

      {/* OTP Input Fields */}
      <div className="d-flex gap-2 my-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            className="form-control text-center"
            style={{ width: "50px", height: "50px", fontSize: "24px", fontWeight: "bold" }}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}
      </div>

      {/* Verify OTP Button */}
      <button className="btn btn-dark w-100 mt-2" onClick={verifyOtp}>
        Verify OTP
      </button>

      {/* Display OTP Verification Message */}
      {message && <p className={`mt-2 ${message.includes("✅") ? "text-success" : "text-danger"}`}>{message}</p>}

      {/* Timer or Resend OTP */}
      {!resendEnabled ? (
        <p className="text-muted">
          Resend OTP after <span className="text-primary fw-bold">{timer}</span> seconds
        </p>
      ) : (
        <button className="btn btn-link text-primary" onClick={generateAndSendOtp}>
          Resend OTP
        </button>
      )}
    </div>
  );
}
