import "./adddriver.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import DriverCard from "./drivercard";
import AddDriver from "../adddriverdetails/adddriver";
import useDriverStore from "../../../../store/driverStore"; // Import the driver store

function Admindriverpage() {
  const navigate = useNavigate();

  // Zustand store actions and state
  const { drivers, fetchDrivers, addDriver, updateDriverProfile, removeDriver, error } = useDriverStore();

  const [editingDriver, setEditingDriver] = useState(null);

  // Fetch drivers from the backend on component mount
  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const handleAddDriver = () => {
    setEditingDriver(null);
    navigate("/admin/drivers/add");
  };

  const handleNewDriver = async (driverData) => {
    try {
      if (editingDriver) {
        // Update existing driver
        await updateDriverProfile(driverData);
      } else {
        // Add new driver
        await addDriver(driverData);
      }
      setEditingDriver(null);
      navigate("/admin/drivers");
    } catch (error) {
      console.error("Error handling driver:", error);
      alert("Failed to save driver. Please try again.");
    }
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    navigate("/admin/drivers/add");
  };

  const handleDeleteDriver = async (driverId) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      try {
        await removeDriver(driverId);
      } catch (error) {
        console.error("Error deleting driver:", error);
        alert("Failed to delete driver. Please try again.");
      }
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="driver-container">
            {error && <p className="error_message">{error}</p>}
            {drivers.map((driver, index) => (
              <DriverCard
                key={index}
                {...driver}
                onEdit={() => handleEditDriver(driver)}
                onDelete={() => handleDeleteDriver(driver._id)}
              />
            ))}
            <DriverCard isAddCard={true} onAdd={handleAddDriver} />
          </div>
        }
      />
      <Route
        path="add"
        element={
          <AddDriver
            onAddDriver={handleNewDriver}
            editingDriver={editingDriver}
          />
        }
      />
    </Routes>
  );
}

export default Admindriverpage;