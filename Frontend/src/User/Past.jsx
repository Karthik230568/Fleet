import React, { useState } from "react";
import "./Past.css";
import BookingCard from "./BookingCard.jsx"; 
import { NavLink } from 'react-router-dom';
import CarData from "./CarData"; // Import car data

function Past() {
  const [pastBookings, setPastBookings] = useState(
    CarData.filter(car => !car.booked && car.bookingStatus === "past")
  );

  const [showPopup, setShowPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);

  // Open popup when user clicks "Submit Rating"
  const handleOpenPopup = (booking) => {
    setSelectedBooking(booking);
    setShowPopup(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedBooking(null);
    setRating(0);
  };

  // Submit rating and update car data
  const handleSubmitRating = () => {
    if (!selectedBooking) return;

    const updatedBookings = pastBookings.map(car =>
      car.name === selectedBooking.name
        ? { ...car, rating: rating }
        : car
    );

    setPastBookings(updatedBookings);
    handleClosePopup();
  };

  // Handle star rating click
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className={`app-container_past ${showPopup ? "overlay" : ""}`}>
      <div className="body_past">

        {/* Tabs */}
        <div className="tabs_past">
          <NavLink to='/active' className="tab_past">Active</NavLink>
          <NavLink to='/past' className="active_past">Past journey</NavLink>
        </div>

        {/* Booking Cards */}
        {pastBookings.length > 0 ? (
          pastBookings.map((booking, index) => (
            <BookingCard 
              key={index} 
              booking={booking} 
              onRate={() => handleOpenPopup(booking)} // Pass function to BookingCard
            />
          ))
        ) : (
          <h4>No past bookings yet</h4>
        )}

        {/* Rating Popup */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3 className="rateNow">Rate {selectedBooking?.name}</h3>

              {/* Star Rating */}
              <div className="star-rating">
                {[...Array(5)].map((star, index) => (
                  <span
                    key={index}
                    className={`star ${index < rating ? "filled" : ""}`}
                    onClick={() => handleStarClick(index)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="popup-buttons">
                <button onClick={handleSubmitRating}>Submit</button>
                <button onClick={handleClosePopup}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Past;