import React from "react";
import "./Vehicle.css";
import {NavLink} from 'react-router-dom';

function VehicleCard({ vehicle, onEdit, onDelete }) {
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
      <div className="vehicle-actions_v">
        <NavLink to='/home/tandc' state={{ from: '/home/vehicles' }} className="book-btn_vb">
          Book Now
        </NavLink>
      </div>
    </div>
  );
}

export default VehicleCard;
