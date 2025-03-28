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
            {booking.startDate} | {booking.duration} | {booking.endDate}
          </div>
          <div className="provider">{booking.provider}</div>
          <div className="price">{booking.price}</div>
        </div>
      ))}
    </div>
  );
}

export default AdminbookingList;
