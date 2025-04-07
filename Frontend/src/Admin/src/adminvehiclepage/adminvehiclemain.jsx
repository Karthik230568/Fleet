import "./adminvehicle.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Filter from "./filter";
import VehicleCard from "./vehiclecard";
import AddCar from "./addcar";
import useVehicleStore from "../../../../store/vehicleStore";
import useAdminAuthStore from "../../../../store/AdminAuthStore";
 
function Admincarspage() {
  const navigate = useNavigate();
  const { vehicles, fetchVehicles, addVehicle, updateVehicle, removeVehicle, loading, error } = useVehicleStore();
  const { isAuthenticated, checkAuth } = useAdminAuthStore();
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [authError, setAuthError] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    const isAdminAuthenticated = checkAuth();
    if (!isAdminAuthenticated) {
      navigate("/auth/adminsignin");
    }
  }, [checkAuth, navigate]);

  // Fetch vehicles from the backend on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchVehicles().catch(err => {
        if (err.response?.status === 401) {
          setAuthError("Authentication required. Please sign in again.");
          navigate("/auth/adminsignin");
        }
      });
    }
  }, [isAuthenticated, fetchVehicles, navigate]);

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
    try {
      if (editingVehicle) {
        // Update existing vehicle
        await updateVehicle(editingVehicle._id, newVehicle);
      } else {
        // Add new vehicle
        await addVehicle(newVehicle);
      }
      // Refresh the vehicles list
      await fetchVehicles();
      navigate("/admin/vehicles");
    } catch (error) {
      console.error("Error handling vehicle:", error);
      if (error.response?.status === 401) {
        setAuthError("Authentication required. Please sign in again.");
        navigate("/auth/adminsignin");
      } else {
        alert("Failed to save vehicle. Please try again.");
      }
    }
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    navigate("add");
  };

  const handleDeleteVehicle = async (vehicle) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await removeVehicle(vehicle._id);
        // Refresh the vehicles list
        await fetchVehicles();
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        if (error.response?.status === 401) {
          setAuthError("Authentication required. Please sign in again.");
          navigate("/auth/adminsignin");
        } else {
          alert("Failed to delete vehicle. Please try again.");
        }
      }
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
              {loading && <p>Loading vehicles...</p>}
              {error && <p className="error">Error: {error}</p>}
              {authError && <p className="auth-error">{authError}</p>}
              <div className="card-container">
                {filteredVehicles.map((vehicle, index) => (
                  <VehicleCard
                    key={vehicle._id || index}
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