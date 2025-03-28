import "./Vehicle.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Filter from "./Filter";
import VehicleCard from "./VehicleCard";
import carData from "./CarData";

function Usercarspage() {
  const [vehicles, setVehicles] = useState(() => {
    const savedVehicles = localStorage.getItem("vehicles");
    return savedVehicles ? JSON.parse(savedVehicles) : carData;
  });
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [filter, setFilter] = useState("All");

  // Save vehicles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
  }, [vehicles]);

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
    <Routes>
      <Route
        path="/"
        element={
          <div className="main_v">
            <Filter onFilterChange={handleFilterChange} />
            <div className="card-container_v">
              {filteredVehicles.map((vehicle, index) => (
                <VehicleCard
                  key={index}
                  vehicle={vehicle}
                />
              ))}
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default Usercarspage;
