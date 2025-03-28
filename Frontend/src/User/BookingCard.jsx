import React from "react";
import "./Past.css";

function BookingCard({ booking, onRate }) {
  if (!booking || booking.booked || booking.bookingStatus !== "past") {
    return <h4>No past bookings yet</h4>;
  }

  return (
    <div className="booking-card_past">
      <div className="details_past">

        {/* Left Side */}
        <div className="left_past">
          <h3>{booking.name}</h3>
          <p>Start Date & Time: {booking.startDate} &nbsp; {booking.startTime}</p>
          <p>End Date & Time: {booking.endDate} &nbsp; {booking.endTime}</p>
          <p>Duration: {booking.duration}</p>
          <p>Rating: {booking.rating ? "⭐".repeat(booking.rating) : "Not rated yet"}</p>
        </div>

        {/* Right Side */}
        <div className="right_past">
          <img src={booking.image} alt={booking.name} className="vehicle-image" />
        </div>
      </div>

      {/* Rating Button */}
      <div className="rating_past">
        <button className="rating-btn_past" onClick={onRate}>Submit Rating</button>
      </div>
    </div>
  );
}

export default BookingCard;
