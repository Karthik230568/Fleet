import "./adminvehicle.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Filter from "./filter";
import VehicleCard from "./vehiclecard";
import AddCar from "./addcar";
import useVehicleStore from "../../../../store/vehicleStore";
 
function Admincarspage() {
  const navigate = useNavigate();
  const { vehicles, fetchVehicles, addVehicle, updateVehicle, removeVehicle } = useVehicleStore();
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editingVehicle, setEditingVehicle] = useState(null);

  // Fetch vehicles from the backend on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Apply filtering & sorting logic
  useEffect(() => {
    let updatedVehicles = [...vehicles];

    if (filter === "Available") {
      updatedVehicles = updatedVehicles.filter(
        (v) => v.availability === "Available"
      );
    } else if (filter === "Not available") {
      updatedVehicles = updatedVehicles.filter(
        (v) => v.availability === "Not available"
      );
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

  const handleAddVehicle = () => {
    setEditingVehicle(null);
    navigate("add");
  };

  const handleNewVehicle = async (newVehicle) => {
    if (editingVehicle) {
      // Update existing vehicle
      await updateVehicle(editingVehicle.id, newVehicle);
    } else {
      // Add new vehicle
      await addVehicle(newVehicle);
    }
    navigate("..");
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    navigate("add");
  };

  const handleDeleteVehicle = async (vehicle) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      await removeVehicle(vehicle.id);
    }
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

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
                <div className="add-card" onClick={handleAddVehicle}>
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