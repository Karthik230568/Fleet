import React from "react";
import "./Active.css";
import BookingCard1 from "./BookingCard1";
import { NavLink } from 'react-router-dom';
import CarData from "./CarData"; // Import car data

function Active() {
  // Filter cars that are booked and have status "active"
  const activeBookings = CarData.filter(car => car.booked && car.bookingStatus === "active");

  return (
    <div className="app-container_active">
      <div className="body_active">

        {/* Tabs */}
        <div className="tabs_active">
          <NavLink to='/home/active' className="active_active">Active</NavLink>
          <NavLink to='/home/past' className="past_active">Past journey</NavLink>
        </div>

        {/* Show active bookings */}
        {activeBookings.length > 0 ? (
          activeBookings.map((car, index) => <BookingCard1 key={index} booking={car} />)
        ) : (
          <h4>No car is booked yet</h4>
        )}

      </div>
    </div>
  );
}

export default Active;
