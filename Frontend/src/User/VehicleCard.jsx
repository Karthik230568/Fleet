import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useVehicleStore from "../../store/vehicleStore"; // Import the VehicleStore
import "./Vehicle.css";

// Import the BookingStore to update booking data
import useBookingStore from '../../store/BookingStore';

function VehicleCard({ vehicle, bookingType }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { markVehicleUnavailable } = useVehicleStore(); // Access the store action

  // Access the booking store to update booking data
  const { updateBookingData} = useBookingStore();

  const handleBookNow = () => {
    setShowPopup(true); // Show the popup when "Book Now" is clicked
  };

  const handleConfirm = async () => {
    setShowPopup(false); // Close the popup
    try {
      // Mark the vehicle as unavailable
      await markVehicleUnavailable(vehicle._id, new Date().toISOString(), null);

      // Update the booking data in the store once confirm is selected.
      updateBookingData(vehicle);

      // Navigate to the appropriate page based on booking type
      if (bookingType === "driver") {
        navigate("/home/userpickup", { state: { vehicle, bookingType } });
      } else if (bookingType === "own") {
        navigate("/home/bookingtype", { state: { bookingType } });
      } else {
        navigate("/home/tandc", { state: { bookingType } });
      }
    } catch (error) {
      console.error("Error booking vehicle:", error);
      alert("Failed to book the vehicle. Please try again.");
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
        {vehicle.driverName && <p>Driver: {vehicle.driverName}</p>}
        <p>Fuel Type: {vehicle.fuelType}</p>
        <p>Seating Capacity: {vehicle.seatingCapacity}</p>
        <p>Registration Plate: {vehicle.registrationPlate}</p>
        <p>Vehicle ID: {vehicle.vehicleId}</p>
        <p>City: {vehicle.city}</p>
      </div>
      <div className="vehicle-actions">
        <button onClick={handleBookNow} className="button_vehicles">
          Book Now
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content_v">
            <h3 className="p-r">Price Details</h3>
            <p className="p-r">Price per day: ${vehicle.price}</p>
            <p className="p-r">Total Price: ${vehicle.price * 1} (for 1 day)</p>
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