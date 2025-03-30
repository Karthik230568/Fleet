import React, { useState } from "react";
import "./Vehicle.css";
import { useNavigate } from 'react-router-dom';

function VehicleCard({ vehicle, bookingType }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleBookNow = () => {
    setShowPopup(true); // Show the popup when "Book Now" is clicked
  };

  const handleConfirm = () => {
    setShowPopup(false); // Close the popup
    if (bookingType === 'driver') {
      navigate('/home/userpickup', {state: { vehicle, bookingType } });
    }
    else if (bookingType === 'own') {
      navigate('/home/bookingtype', { state: { bookingType } });
    } else {
      navigate('/home/tandc', { state: { bookingType } });
    }
  };

  const handleCancel = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="vehicle-card_v">
      <div className="vehicle-image_v">
        <img src={vehicle.image} alt={vehicle.name} />
      </div>
      <div className="vehicle-details_v">
        <h3>{vehicle.name}</h3>
        <p>Type: {vehicle.type}</p>
        <p>Price: ${vehicle.price}/day</p>
        <p>Availability: {vehicle.availability}</p>
        <p>Rating: {vehicle.rating} ⭐</p>
        <p>Driver: {vehicle.driverName}</p>
        <p>Fuel Type: {vehicle.fuelType}</p>
        <p>Seating Capacity: {vehicle.seatingCapacity}</p>
        <p>Registration Plate: {vehicle.registrationPlate}</p>
        <p>Vehicle ID: {vehicle.vehicleId}</p>
      </div>
      <div className="vehicle-actions">
        <button onClick={handleBookNow} className="button_vehicles">
          Book Now
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Price Details</h3>
            <p>Price per day: ${vehicle.price}</p>
            <p>Total Price: ${vehicle.price * 1} (for 1 day)</p>
            <div className="popup-actions">
              <button onClick={handleConfirm} className="button_confirm">
                Confirm
              </button>
              <button onClick={handleCancel} className="button_cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleCard;