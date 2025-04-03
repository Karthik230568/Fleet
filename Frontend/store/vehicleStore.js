import { create } from "zustand";
import axios from "axios";

const useVehicleStore = create((set) => ({
  vehicles: [],
  fetchVehicles: async () => {
    try {
      const response = await axios.get("/api/vehicles"); // Backend API to fetch vehicles
      set({ vehicles: response.data.vehicles });
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  },
  addVehicle: async (newVehicle) => {
    try {
      const response = await axios.post("/api/vehicles", newVehicle); // Backend API to add a vehicle
      set((state) => ({ vehicles: [...state.vehicles, response.data] }));
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  },
  updateVehicle: async (vehicleId, updatedVehicle) => {
    try {
      await axios.put(`/api/vehicles/${vehicleId}`, updatedVehicle); // Backend API to update a vehicle
      set((state) => ({
        vehicles: state.vehicles.map((v) =>
          v.id === vehicleId ? { ...v, ...updatedVehicle } : v
        ),
      }));
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  },
  deleteVehicle: async (vehicleId) => {
    try {
      await axios.delete(`/api/vehicles/${vehicleId}`); // Backend API to delete a vehicle
      set((state) => ({
        vehicles: state.vehicles.filter((v) => v.id !== vehicleId),
      }));
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  },
}));

export default useVehicleStore;