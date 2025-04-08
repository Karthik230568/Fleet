import React from "react";
import "./bookinglist.css";

function AdminbookingList({ bookings }) {
  return (
    <div className="booking-list">
      <h1>{console.log(bookings.length)}</h1>
      {bookings.map((booking) => (
        <div key={booking.bookingId} className="booking-card">
          <div className="vehicle-info">
            <span className="vehicle-name">{booking.vehicleName}</span>
            <span className="user-name">{booking.userName}</span>
          </div>
          <div className="booking-details">
            {booking.pickupDate} | {booking.duration} | {booking.returnDate}
          </div>
          
          <div className="driver-name">{booking.driver.name}</div>
          <div className="vehicle-id">{booking.vehicle.vehicleId}</div>
          <div className="price">{booking.totalAmount}</div>
        </div>
      ))}
    </div>
  );
}

export default AdminbookingList;
