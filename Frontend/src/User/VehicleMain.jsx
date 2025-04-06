import "./Vehicle.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Filter from "./Filter";
import VehicleCard from "./VehicleCard";
import useVehicleStore from "../../store/vehicleStore"; // Import the VehicleStore

function Usercarspage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicles, searchVehicles, loading, error } = useVehicleStore(); // Access the store
  const [bookingType, setBookingType] = useState(() => {
    return location.state?.bookingType || localStorage.getItem("bookingType") || "driver";
  });

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (bookingType) {
      localStorage.setItem("bookingType", bookingType);
    }
  }, [bookingType]);

  // Fetch vehicles when the component mounts or filter changes
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        await searchVehicles({ filter }); // Pass the filter to the searchVehicles action
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };
    fetchVehicles();
  }, [filter, searchVehicles]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="main_v">
            <Filter onFilterChange={handleFilterChange} />
            {loading && <p>Loading vehicles...</p>}
            {error && <p>Error: {error}</p>}
            <div className="card-container_v">
              {vehicles.map((vehicle, index) => (
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