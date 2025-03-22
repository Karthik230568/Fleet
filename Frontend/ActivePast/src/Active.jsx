import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Active.css";
import BookingCard1 from "./BookingCard1.jsx";

function Active() {
  return (
    <Router>
    <div className="app-container">
      <body>
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src="/Logo.png" alt="🚗 FLEET" />
        </div>
        <div className="buttons">
          <button className="help-btn">Help</button>
          <button className="bookings-btn">Bookings</button>
          <div className="profile-icon">A</div>
        </div>
      </header>

      {/* Tabs */}
      <div className="tabs">
        <button className="tab">Active</button>
        <button className="active">Past journey</button>
      </div>

      {/* Booking Card1 */}
      <BookingCard1 />
      </body>
    </div>
    </Router>
  );
}

export default Active;
