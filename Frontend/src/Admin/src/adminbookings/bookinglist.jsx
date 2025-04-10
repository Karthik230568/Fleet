import React from "react";
import "./bookinglist.css";

function AdminbookingList({ bookings }) {
  return (
    <div className="booking-list">
      <h1 style={{ color: "white" }}>Number of Active Bookings: {bookings.length}</h1>
      {bookings.map((booking) => (
        <div key={booking.bookingId} className="booking-card">
          <div className="vehicle-info">
            <span className="vehicle-name">{booking.vehicleName}</span>
            <span className="user-name">{booking.userName}</span>
          </div>
          <div className="booking-details">
            <span>Pickup Date and Time: {new Date(booking.pickupDate).toLocaleString()}</span>
            <br />
            <span>Return Date and Time: {new Date(booking.returnDate).toLocaleString()}</span>
          </div>
          <div className="driver-name">Driver: {booking.driverName}</div>
          <div className="vehicle-id">Vehicle ID: {booking.vehicleId}</div>
          <div className="price">Price: {booking.totalAmount}</div>
        </div>
      ))}
    </div>
  );
}

export default AdminbookingList;