import { create } from "zustand";
import axios from "axios";

const useUserVehicleStore = create((set) => ({
  vehicles: [], // List of vehicles
  loading: false, // Loading state
  error: null, // Error state

  // Function to search vehicles based on search parameters
  searchVehicles: async (searchParams) => {
    set({ loading: true, error: null }); // Set loading state

    try {

      console.log("Search parameters:", searchParams);
      // Make an API call to fetch vehicles based on search parameters
      const response = await axios.get("/vehicles", {
        params: searchParams,
      });
      console.log("API response:", response.data);

      if (response.data.success) {
        set({
          vehicles: response.data.vehicles,
          loading: false,
          error: null,
        });
      } else {
        set({
          vehicles: [],
          loading: false,
          error: response.data.message || "Failed to fetch vehicles",
        });
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      set({
        vehicles: [],
        loading: false,
        error: err.message || "An error occurred while fetching vehicles",
      });
    }
  },

  // Function to mark a vehicle as unavailable
  markVehicleUnavailable: async (vehicleId, returnDate, bookingId) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post(`/api/vehicles/${vehicleId}/unavailable`, {
        returnDate,
        bookingId,
      });

      if (response.status === 200) {
        set({ loading: false });
        return true;
      } else {
        set({ loading: false, error: response.data.error || "Failed to mark vehicle as unavailable" });
        return false;
      }
    } catch (err) {
      console.error("Error marking vehicle unavailable:", err);
      set({ loading: false, error: err.message || "Error marking vehicle unavailable" });
      return false;
    }
  },

  // Function to update a vehicle's status
  updateVehicleStatus: async (vehicleId, status, bookingId) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.put(`/api/vehicles/${vehicleId}/status`, {
        status,
        bookingId,
      });

      if (response.status === 200) {
        set({ loading: false });
        return true;
      } else {
        set({ loading: false, error: response.data.error || "Failed to update vehicle status" });
        return false;
      }
    } catch (err) {
      console.error("Error updating vehicle status:", err);
      set({ loading: false, error: err.message || "Error updating vehicle status" });
      return false;
    }
  },

  // Function to reset the vehicle store
  resetVehicles: () => {
    set({
      vehicles: [],
      loading: false,
      error: null,
    });
  },
}));

export default useUserVehicleStore;