import { create } from "zustand";
import axios from "axios";

// Configure axios defaults
axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const useVehicleStore = create((set, get) => ({
  vehicles: [], // List of vehicles
  searchResults: [], // Search results
  error: null, // Error state

  // Search vehicles
  searchVehicles: async (searchParams) => {
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

  // Update an existing vehicle (admin only)
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

  // Remove a vehicle (admin only)
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
}));

export default useVehicleStore;