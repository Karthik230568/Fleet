import React from "react";
import "./App.css";

function BookingCard() {
  return (
    <div className="booking-card">
      <div className="details">
      <div className="left">
        <h3>KTM RC 360</h3>
        <p>31/01/2025 &nbsp; 11:00</p>
        <p className="rental-company">SHREE SAI RENTALS</p>
      </div>

      <div className="middle">
        <p>3 days 3 hours</p>
      </div>

      <div className="right">
        <h3>Ram</h3>
        <p>03/02/2025 &nbsp; 14:00</p>
        <p>9000 INR</p>
      </div>
      </div>
      <div className="feedback">
      <button className="feedback-btn">Submit feedback</button>
      </div>
    </div>
  );
}

export default BookingCard;
