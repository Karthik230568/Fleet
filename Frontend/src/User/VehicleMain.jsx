import "./Vehicle.css";
import React, { useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";
import VehicleCard from "./VehicleCard";
import useUserVehicleStore from "../../store/userVehicleStore"; // Import the UserVehicleStore
import useBookingStore from "../../store/BookingStore"; // Import the BookingStore

function Usercarspage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicles, searchVehicles, loading, error } = useUserVehicleStore(); // Access the user vehicle store
  const { bookingData } = useBookingStore(); // Access the booking data from BookingStore

  const [filter, setFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");

  // Initialize search parameters from BookingStore
  const [searchParams, setSearchParams] = useState({
    city: bookingData.city || location.state?.city || "",
    pickupDate: bookingData.pickupDate || location.state?.pickupDate || "",
    returnDate: bookingData.returnDate || location.state?.returnDate || "",
    withDriver: bookingData.withDriver,
    filter: "All",
  });

  // Fetch vehicles when the component mounts or search parameters change
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        await searchVehicles(searchParams);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };
    fetchVehicles();
  }, [searchParams, searchVehicles]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setSearchParams((prev) => ({
      ...prev,
      filter: selectedFilter,
    }));
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  }

  // Apply client-side filtering based on the selected filter
  const filteredVehicles = React.useMemo(() => {
    let filtered = vehicles;

    // Apply filter
    if (filter !== "All") {
      filtered = filtered.filter((vehicle) => {
        if (filter === "Available") return vehicle.availability === "Available";
        if (filter === "Not available") return vehicle.availability === "Not available";
        if (filter === "Cars") return vehicle.type.toLowerCase() === "car";
        if (filter === "Bikes") return vehicle.type.toLowerCase() === "bike";
        return true;
      });
    }

    // Apply sorting
    if (filter === "Price") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (filter === "Rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [vehicles, filter, sortOption]);

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <div className="main_v">
            <Filter 
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange} />
            {loading && (
              <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading vehicles...</p>
              </div>
            )}
            {error && <p className="error">Error: {error}</p>}
            <div className="card-container_v">
              {filteredVehicles.length === 0 && !loading && !error && (
                <div className="parent1">
                  <p className="no-vehicles">No vehicles found matching your criteria.</p>
                  <button className="back-link" onClick={() => navigate('/home')}>Back to Home</button>
                </div>
              )}
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  bookingType={searchParams.withDriver}
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
