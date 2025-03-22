import "./Styles.css";
import React from "react";

function DriverCard({ driver }) {
  return (
    <div className="driver-card">
      <img src={driver.image} alt={driver.name} className="driver-image" />
      <div className="driver-details">
        <p>
          <strong>Driver name:</strong> {driver.name}
        </p>
        <p>
          <strong>Driver Age:</strong> {driver.age}
        </p>
        <p>
          <strong>Driver Address:</strong> {driver.address}
        </p>
        <p>
          <strong>Driver Phone No:</strong> {driver.phone}
        </p>
      </div>
      <div className="driver-info">
        <p>
          <strong>License No:</strong> {driver.license}
        </p>
        <p>
          <strong>Vehicle Id:</strong> {driver.vehicleId}
        </p>
        <p>
          <strong>Driver Id:</strong> {driver.driverId}
        </p>
      </div>
    </div>
  );
}

export default DriverCard;
