import "./adddriver.css";
import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import driversData from "./driversdata";
import DriverCard from "./drivercard";
import AddDriver from "../adddriverdetails/adddriver";

function Admindriverpage() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState(() => {
    const savedDrivers = localStorage.getItem("drivers");
    return savedDrivers ? JSON.parse(savedDrivers) : driversData;
  });
  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    localStorage.setItem("drivers", JSON.stringify(drivers));
  }, [drivers]);

  const handleAddDriver = () => {
    setEditingDriver(null);
    navigate("/admin/drivers/add");
  };

  const handleNewDriver = (driverData) => {
    if (editingDriver) {
      // Update existing driver
      setDrivers((prevDrivers) => {
        const updatedDrivers = prevDrivers.map((d) =>
          d.driverId === editingDriver.driverId ? driverData : d
        );
        localStorage.setItem("drivers", JSON.stringify(updatedDrivers));
        return updatedDrivers;
      });
    } else {
      // Add new driver
      setDrivers((prevDrivers) => {
        const updatedDrivers = [...prevDrivers, driverData];
        localStorage.setItem("drivers", JSON.stringify(updatedDrivers));
        return updatedDrivers;
      });
    }
    setEditingDriver(null);
    navigate("/admin/drivers");
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    navigate("/admin/drivers/add");
  };

  const handleDeleteDriver = (driver) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      setDrivers((prevDrivers) => {
        const updatedDrivers = prevDrivers.filter((d) => d !== driver);
        localStorage.setItem("drivers", JSON.stringify(updatedDrivers));
        return updatedDrivers;
      });
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="driver-container">
            {drivers.map((driver, index) => (
              <DriverCard
                key={index}
                {...driver}
                onEdit={() => handleEditDriver(driver)}
                onDelete={() => handleDeleteDriver(driver)}
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
