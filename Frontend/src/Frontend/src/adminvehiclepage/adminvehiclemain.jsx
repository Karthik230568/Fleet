import "./adminvehicle.css";
import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Filter from "./filter";
import VehicleCard from "./vehiclecard";
import AddCar from "./addcar";
import carData from "./cardata";

function Admincarspage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState(() => {
    const savedVehicles = localStorage.getItem("vehicles");
    return savedVehicles ? JSON.parse(savedVehicles) : carData;
  });
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [filter, setFilter] = useState("All");
  const [editingVehicle, setEditingVehicle] = useState(null);

  // Save vehicles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
  }, [vehicles]);

  const handleAddVehicle = () => {
    setEditingVehicle(null);
    navigate("add");
  };

  const handleNewVehicle = (newVehicle) => {
    if (editingVehicle) {
      // Update existing vehicle
      setVehicles((prevVehicles) => {
        const updatedVehicles = prevVehicles.map((v) =>
          v === editingVehicle ? newVehicle : v
        );
        localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
        return updatedVehicles;
      });
    } else {
      // Add new vehicle
      setVehicles((prevVehicles) => {
        const updatedVehicles = [...prevVehicles, newVehicle];
        localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
        return updatedVehicles;
      });
    }
    navigate("..");
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    navigate("add");
  };

  const handleDeleteVehicle = (vehicle) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles((prevVehicles) => {
        const updatedVehicles = prevVehicles.filter((v) => v !== vehicle);
        localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
        return updatedVehicles;
      });
    }
  };

  // Function to update filter state
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  // Apply filtering & sorting logic
  useEffect(() => {
    let updatedVehicles = [...vehicles];

    if (filter === "Available") {
      updatedVehicles = updatedVehicles.filter((v) => v.availability === "Yes");
    } else if (filter === "Not available") {
      updatedVehicles = updatedVehicles.filter((v) => v.availability === "No");
    } else if (filter === "Cars") {
      updatedVehicles = updatedVehicles.filter(
        (v) => v.type.toLowerCase() === "car"
      );
    } else if (filter === "Bikes") {
      updatedVehicles = updatedVehicles.filter(
        (v) => v.type.toLowerCase() === "bike"
      );
    } else if (filter === "Price") {
      updatedVehicles.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (filter === "Rating") {
      updatedVehicles.sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      );
    }

    setFilteredVehicles(updatedVehicles);
  }, [filter, vehicles]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="main">
              <Filter onFilterChange={handleFilterChange} />
              <div className="card-container">
                {filteredVehicles.map((vehicle, index) => (
                  <VehicleCard
                    key={index}
                    vehicle={vehicle}
                    onEdit={handleEditVehicle}
                    onDelete={handleDeleteVehicle}
                  />
                ))}
                <div className="card add-car-card" onClick={handleAddVehicle}>
                  <h2>+ Add Vehicle</h2>
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="add"
          element={
            <AddCar
              onAddVehicle={handleNewVehicle}
              editingVehicle={editingVehicle}
            />
          }
        />
      </Routes>
    </>
  );
}

export default Admincarspage;
