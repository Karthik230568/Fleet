import { create } from "zustand";
import axios from "axios";

// Configure axios defaults
axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const useVehicleStore = create((set, get) => ({
  vehicles: [], // List of vehicles
<<<<<<< HEAD
  searchResults: [], // Search results
  error: null, // Error state

  // Search vehicles
  searchVehicles: async (searchParams) => {
=======
  searchCriteria: {},
  error: null, // Error state
  loading: false,
  // Fetch all vehicles for admin
  fetchVehicles: async () => {
>>>>>>> 0619c3e7d71a65ddaa3a4144c0cdf6af6fa29760
    try {
      const { pickupDate, returnDate, withDriver, city } = searchParams;
      
      // Format dates to match backend expectations
      const formattedPickupDate = new Date(pickupDate).toISOString();
      const formattedReturnDate = new Date(returnDate).toISOString();

      const response = await axios.get("/vehicles", { 
        params: {
          pickupDate: formattedPickupDate,
          returnDate: formattedReturnDate,
          withDriver: withDriver === 'driver',
          city,
          filter: 'All' // Default filter
        }
      });
      
      if (response.data.success) {
        set({ 
          searchResults: response.data.vehicles,
          error: null 
        });
        return response.data.vehicles;
      } else {
        throw new Error(response.data.error || "Failed to search vehicles");
      }
    } catch (error) {
      console.error("Error searching vehicles:", error.response?.data || error.message);
      set({ 
        searchResults: [],
        error: error.response?.data?.error || "Failed to search vehicles" 
      });
      throw error;
    }
  },

<<<<<<< HEAD
  // Fetch all vehicles (admin only)
  fetchVehicles: async () => {
    try {
      const response = await axios.get("/admin/vehicles");
      
      if (response.data.success) {
        set({ vehicles: response.data.vehicles, error: null });
        return response.data.vehicles;
      } else {
        throw new Error(response.data.error || "Failed to fetch vehicles");
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error.response?.data || error.message);
      set({ 
        vehicles: [],
        error: error.response?.data?.error || "Failed to fetch vehicles" 
      });
      throw error;
    }
  },

  // Add a new vehicle (admin only)
=======
  // Add a new vehicle for admin
>>>>>>> 0619c3e7d71a65ddaa3a4144c0cdf6af6fa29760
  addVehicle: async (vehicleData) => {
    try {
      const response = await axios.post("/admin/vehicles", vehicleData);
      
      if (response.data.success) {
        set((state) => ({
          vehicles: [...state.vehicles, response.data.vehicle],
          error: null,
        }));
        return response.data.vehicle;
      } else {
        throw new Error(response.data.error || "Failed to add vehicle");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to add vehicle" });
      throw error;
    }
  },

<<<<<<< HEAD
  // Update an existing vehicle (admin only)
=======
  // Update an existing vehicle admin
>>>>>>> 0619c3e7d71a65ddaa3a4144c0cdf6af6fa29760
  updateVehicle: async (id, updates) => {
    try {
      const response = await axios.put(`/admin/vehicles/${id}`, updates);
      
      if (response.data.success) {
        set((state) => ({
          vehicles: state.vehicles.map((vehicle) =>
            vehicle._id === id ? response.data.vehicle : vehicle
          ),
          error: null,
        }));
        return response.data.vehicle;
      } else {
        throw new Error(response.data.error || "Failed to update vehicle");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to update vehicle" });
      throw error;
    }
  },

<<<<<<< HEAD
  // Remove a vehicle (admin only)
=======
  // Remove a vehicle admin
>>>>>>> 0619c3e7d71a65ddaa3a4144c0cdf6af6fa29760
  removeVehicle: async (id) => {
    try {
      const response = await axios.delete(`/admin/vehicles/${id}`);
      
      if (response.data.success) {
        set((state) => ({
          vehicles: state.vehicles.filter((vehicle) => vehicle._id !== id),
          error: null,
        }));
      } else {
        throw new Error(response.data.error || "Failed to remove vehicle");
      }
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