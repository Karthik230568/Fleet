import React from "react";
import "./bookinglist.css";

function AdminbookingList({ bookings }) {
  return (
    <div className="booking-list">
      <h1 style={{color:"white"}}>Number of Active Bookings: {bookings.length}</h1>
      {bookings.map((booking) => (
        <div key={booking.bookingId} className="booking-card">
          <div className="vehicle-info">
            <span className="vehicle-name">{booking.vehicleName}</span>
            <span className="user-name">username?{booking.userName}</span>
          </div>
          <div className="booking-details">
            <span>Pickup Date and Time: {booking.pickupDate} </span>
            <br />
            <span>Return Date and Time:{booking.returnDate}</span>
          </div>
          
          <div className="driver-name">drivername?{booking.driverName}</div>
          <div className="vehicle-id">vehicleid?{booking.vehicleId}</div>
          <div className="price">Price: {booking.totalAmount}</div>
        </div>
      ))}
    </div>
  );
}

export default AdminbookingList;
