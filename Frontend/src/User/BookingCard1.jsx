import React from "react";
import "./Active.css";

function BookingCard1({ booking, updateBooking }) {
  if (!booking || !booking.booked || booking.bookingStatus !== "active") {
    return <h4>No car is booked yet</h4>;
  }

  const handleCancel = () => {
    updateBooking(booking.name, false); // Update booking status to false
  };

  return (
    <div className="booking-card_active">
      <div className="details_active">
        
        {/* Left Side */}
        <div className="left_active">
          <h3>{booking.name}</h3>
          <p>{booking.startDate}</p>
          <p>{booking.startTime}</p>
        </div>

        {/* Right Side */}
        <div className="right_active">
          <img src={booking.image} alt={booking.name} className="vehicle-image" />
        </div>

      </div>
      <div className="cancle_active">
      <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default BookingCard1;
