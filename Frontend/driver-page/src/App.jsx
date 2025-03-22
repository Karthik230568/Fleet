import "./Styles.css";
import React, { useState } from "react";
import Navbar from "./Navbar";
import driversData from "./drivers";
import DriverCard from "./Drivercard";

function App() {
  const [drivers, setDrivers] = useState(driversData);

  const addDriver = () => {
    const newDriver = {
      id: drivers.length + 1,
      name: "New Driver",
      age: "N/A",
      address: "Unknown",
      phone: "0000000000",
      license: "XXXX0000",
      vehicleId: "00000",
      driverId: (Math.random() * 100000).toFixed(0),
      image: "Images/default-driver.png",
    };
    setDrivers([...drivers, newDriver]);
  };

  return (
    <div className="main">
      <Navbar />
      <div className="driver-container">
        {drivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
        <div className="add-driver-card" onClick={addDriver}>
          <div className="add-icon">+</div>
          <p>Add Driver</p>
        </div>
      </div>
    </div>
  );
}

export default App;
