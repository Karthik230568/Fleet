import { create } from "zustand";
import axios from "axios";

const useVehicleStore = create((set, get) => ({
  vehicles: [], // List of vehicles
  searchCriteria: {},
  error: null, // Error state
  loading: false,
  // Fetch all vehicles for admin
  fetchVehicles: async () => {
    try {
      const response = await axios.get("/api/admin/vehicles");
      
      set({ vehicles: response.data.vehicles, error: null });
      console.log("Fetched vehicles:", response.data.vehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to fetch vehicles" });
    }
  },

  // Add a new vehicle for admin
  addVehicle: async (vehicleData) => {
    try {
      console.log("in store");
      const response = await axios.post("/api/admin/vehicles", vehicleData);
      console.log(response)
      set((state) => ({
        vehicles: [...state.vehicles, response.data.vehicle],
        error: null,
      }));
      return response.data.vehicle;
    } catch (error) {
      console.error("Error adding vehicle:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to add vehicle" });
      throw error;
    }
  },

  // Update an existing vehicle admin
  updateVehicle: async (id, updates) => {
    try {
      const response = await axios.put(`/api/admin/vehicles/${id}`, updates);
      set((state) => ({
        vehicles: state.vehicles.map((vehicle) =>
          vehicle._id === id ? response.data.vehicle : vehicle
        ),
        error: null,
      }));
      return response.data.vehicle;
    } catch (error) {
      console.error("Error updating vehicle:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to update vehicle" });
      throw error;
    }
  },

  // Remove a vehicle admin
  removeVehicle: async (id) => {
    try {
      await axios.delete(`/api/admin/vehicles/${id}`);
      set((state) => ({
        vehicles: state.vehicles.filter((vehicle) => vehicle._id !== id),
        error: null,
      }));
    } catch (error) {
      console.error("Error removing vehicle:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to remove vehicle" });
      throw error;
    }
  },

  // Fetch vehicles for user
  searchVehicles: async (criteria) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/vehicles/", {
        params: criteria,
      });

      set({
        vehicles: response.data.vehicles,
        searchCriteria: response.data.searchCriteria,
        error: null,
        loading: false,
      });
    } catch (error) {
      console.error("Error searching vehicles:", error);
      set({
        vehicles: [],
        searchCriteria: {},
        error: error.response?.data?.message || "Failed to fetch vehicles",
        loading: false,
      });
    }
  },

  // update vehicle status for booking
  updateVehicleStatus: async (vehicleId, status, bookingId) => {
    try {
      const response = await axios.put(`/api/vehicles/${vehicleId}/status`, {
        status,
        bookingId,
      });

      // Update the local state for the vehicle
      const updatedVehicles = get().vehicles.map((vehicle) =>
        vehicle.id === vehicleId ? { ...vehicle, availability: status } : vehicle
      );

      set({ vehicles: updatedVehicles });
      return response.data;
    } catch (error) {
      console.error("Error updating vehicle status:", error);
      throw error.response?.data?.message || "Failed to update vehicle status";
    }
  },

  // Mark vehicle as unavailable for booking
  markVehicleUnavailable: async (vehicleId, returnDate, bookingId) => {
    try {
      const response = await axios.post(`/api/vehicles/${vehicleId}/unavailable`, {
        returnDate,
        bookingId,
      });

      // Update the local state for the vehicle
      const updatedVehicles = get().vehicles.map((vehicle) =>
        vehicle.id === vehicleId ? { ...vehicle, availability: "Not available" } : vehicle
      );

      set({ vehicles: updatedVehicles });
      return response.data;
    } catch (error) {
      console.error("Error marking vehicle unavailable:", error);
      throw error.response?.data?.message || "Failed to mark vehicle unavailable";
    }
  },

}));

export default useVehicleStore;