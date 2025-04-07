import React from "react";
import "./bookinglist.css";

function AdminbookingList({ bookings }) {
  return (
    <div className="booking-list">
      {bookings.map((booking) => (
        <div key={booking.id} className="booking-card">
          <div className="vehicle-info">
            <span className="vehicle-name">{booking.vehicle}</span>
            <span className="user-name">{booking.user}</span>
          </div>
          <div className="booking-details">
            {booking.pickupDate} | {booking.duration} | {booking.returnDate}
          </div>
          
          <div className="driver-name">{booking.driverName}</div>
          <div className="vehicle-id">{booking.vehicleId}</div>
          <div className="price">{booking.totalAmount}</div>
        </div>
      ))}
    </div>
  );
}

export default AdminbookingList;
