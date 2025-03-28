import React from "react";
import "./adminvehicle.css";

function VehicleCard({ vehicle, onEdit, onDelete }) {
  return (
    <div className="vehicle-card">
      <div className="vehicle-image">
        <img src={vehicle.image} alt={vehicle.name} />
      </div>
      <div className="vehicle-details">
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
        <button onClick={() => onEdit(vehicle)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(vehicle)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default VehicleCard;
