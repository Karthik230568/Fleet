import React, { useState } from "react";
import "./userpickup.css";
import Logo from "../../public/greylogo.png";
import Map from "./map.jpg";
import { useNavigate, useLocation } from "react-router-dom";

function Userpickup() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingType, deliveryOption } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);

  const placeholderText =
    bookingType === "own" && deliveryOption === "Delivery"
      ? "Enter Delivery Address"
      : "Enter Pickup Location";

  const handleNext = () => {
    setShowPopup(true); // Show the booking confirmation popup
  };

  const handlePopupOk = () => {
    setShowPopup(false); // Close the popup
    navigate("/home/active"); // Redirect to the active bookings page
  };

  return (
    <div className="pickup_body">
      <div className="pickup_logo-container">
        <img src={Logo} className="pickup_logo-image" alt="Logo" />
      </div>
      <div className="pickup_location">
        <div className="pickup_location-1">
          <img src={Map} alt="Map Logo" />
          <input
            type="text"
            name="pickup"
            placeholder={placeholderText}
            className="pickup_input-field"
          />
        </div>
        <button onClick={handleNext} className="pickup_next-button">
          Next
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay_p">
          <div className="popup-content_p">
            <h3>Booking Confirmed</h3>
            <p className="ppr">Your booking has been successfully confirmed!</p>
            <button onClick={handlePopupOk} className="popup-ok-button">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Userpickup;