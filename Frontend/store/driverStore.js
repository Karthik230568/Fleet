import { create } from "zustand";
import axios from "axios";

const useDriverStore = create((set, get) => ({
  drivers: [], // List of drivers
  error: null, // Error state

  // Fetch all drivers
  fetchDrivers: async () => {
    try {
      const response = await axios.get("/api/admin/drivers");
      set({ drivers: response.data.drivers, error: null });
      console.log("Fetched drivers:", response.data.drivers);
    } catch (error) {
      console.error("Error fetching drivers:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to fetch drivers" });
    }
  },

  // Add a new driver
  addDriver: async (driverData) => {
    try {
      const response = await axios.post("/api/admin/drivers", driverData);
      set((state) => ({
        drivers: [...state.drivers, response.data.driver],
        error: null,
      }));
      return response.data.driver;
    } catch (error) {
      console.error("Error adding driver:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to add driver" });
      throw error;
    }
  },

  // Remove a driver
  removeDriver: async (id) => {
    try {
      await axios.delete(`/api/admin/drivers/${id}`);
      set((state) => ({
        drivers: state.drivers.filter((driver) => driver._id !== id),
        error: null,
      }));
    } catch (error) {
      console.error("Error removing driver:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to remove driver" });
      throw error;
    }
  },

  // Get driver profile
  getDriverProfile: async () => {
    try {
      const response = await axios.get("/api/admin/drivers/profile");
      return response.data.driver;
    } catch (error) {
      console.error("Error fetching driver profile:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to fetch driver profile" });
      throw error;
    }
  },

  // Update driver profile
  updateDriverProfile: async (profileData) => {
    try {
      const response = await axios.put("/api/admin/drivers/profile", profileData);
      set((state) => ({
        drivers: state.drivers.map((driver) =>
          driver._id === response.data.driver._id ? response.data.driver : driver
        ),
        error: null,
      }));
      return response.data.driver;
    } catch (error) {
      console.error("Error updating driver profile:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to update driver profile" });
      throw error;
    }
  },
}));

export default useDriverStore;