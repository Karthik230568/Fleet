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
  const [searchParams, setSearchParams] = useState({
    city: location.state?.city || "",
    pickupDate: location.state?.pickupDate || "",
    returnDate: location.state?.returnDate || "",
    withDriver: bookingType === "driver" ? "driver" : "own",
    filter: "All"
  });

  useEffect(() => {
    if (bookingType) {
      localStorage.setItem("bookingType", bookingType);
      setSearchParams(prev => ({
        ...prev,
        withDriver: bookingType === "driver" ? "driver" : "own"
      }));
    }
  }, [bookingType]);

  // Fetch vehicles when the component mounts or search parameters change
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Always fetch vehicles when the component mounts
        await searchVehicles(searchParams);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };
    fetchVehicles();
  }, [searchParams, searchVehicles]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setSearchParams(prev => ({
      ...prev,
      filter: selectedFilter
    }));
  };

  // Apply client-side filtering based on the selected filter
  const filteredVehicles = React.useMemo(() => {
    if (filter === "All") return vehicles;
    
    return vehicles.filter(vehicle => {
      if (filter === "Available") return vehicle.availability === "Available";
      if (filter === "Not available") return vehicle.availability === "Not available";
      if (filter === "Cars") return vehicle.type.toLowerCase() === "car";
      if (filter === "Bikes") return vehicle.type.toLowerCase() === "bike";
      return true;
    });
  }, [vehicles, filter]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="main_v">
            <Filter onFilterChange={handleFilterChange} />
            {loading && <p className="loading">Loading vehicles...</p>}
            {error && <p className="error">Error: {error}</p>}
            <div className="card-container_v">
              {filteredVehicles.length === 0 && !loading && !error && (
                <p className="no-vehicles">No vehicles found matching your criteria.</p>
              )}
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  bookingType={bookingType}
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