import { create } from "zustand";
import axios from "axios";

const useVehicleStore = create((set, get) => ({
  vehicles: [], // List of vehicles
  error: null, // Error state

  // Fetch all vehicles
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

  // Add a new vehicle
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

  // Update an existing vehicle
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

  // Remove a vehicle
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
}));

export default useVehicleStore;