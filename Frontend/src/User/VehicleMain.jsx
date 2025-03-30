import "./Vehicle.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Filter from "./Filter";
import VehicleCard from "./VehicleCard";
import carData from "./CarData";

function Usercarspage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingType, setBookingType] = useState(() => {
    // Retrieve the bookingType from location state or localStorage
    return location.state?.bookingType || localStorage.getItem('bookingType') || 'driver';
  });

  useEffect(() => {
    // Store the bookingType in localStorage whenever it changes
    if (bookingType) {
      localStorage.setItem('bookingType', bookingType);
    }
  }, [bookingType]);



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
    navigate("/admincarspage/add");
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
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    navigate("/admincarspage/add");
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
                  bookingType={bookingType} // Pass bookingType to VehicleCard
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