import React, { useState } from "react";
import "./Active.css";

function BookingCard1({ booking, updateBooking }) {
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  console.log("Booking data:", booking);

  if (!booking || !booking.booked || booking.bookingStatus !== "active") {
    return <h4>No car is booked yet</h4>;
  }

  const handleCancel = () => {
    console.log("Cancel button clicked");
    updateBooking(booking.name, false); // Update booking status to false
    setShowPopup(true); // Show the cancellation popup
    console.log("Popup state after cancel:", showPopup);
  };

  const handlePopupClose = () => {
    console.log("Popup closed");
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="booking-card_active">
      <div className="details_active">
        {/* Left Side */}
        <div className="left_active">
          <h3>{booking.name}</h3>
          <p>Start Date & Time: {booking.startDate} &nbsp; {booking.startTime}</p>
          <p>End Date & Time: {booking.endDate} &nbsp; {booking.endTime}</p>
          <p>Duration: {booking.duration}</p>
          <p>Driver Name : {booking.driverName}</p>
          <p>VehicleID : {booking.ID}</p>
          <p>Price : {booking.price}</p>
        </div>

        {/* Right Side */}
        <div className="right_active">
          <img src={booking.image} alt={booking.name} className="vehicle-image" />
        </div>
      </div>
      <div className="cancle_active">
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Ride Cancelled</h3>
            <p>Your ride has been successfully cancelled.</p>
            <button onClick={handlePopupClose} className="popup-close-btn">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingCard1;