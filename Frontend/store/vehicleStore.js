import { create } from "zustand";
import axios from "axios";

// Configure axios defaults
axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Add auth token to requests
axios.interceptors.request.use((config) => {
  // Check if it's an admin route
  if (config.url.startsWith('/admin')) {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  } else {
    // For user routes
    const userToken = localStorage.getItem('token');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Helper function to normalize vehicle data format
const normalizeVehicle = (vehicle) => {
  return {
    _id: vehicle._id || vehicle.id,
    name: vehicle.name,
    type: vehicle.type,
    price: vehicle.price,
    availability: vehicle.availability,
    rating: vehicle.rating,
    driverName: vehicle.driverName || "",
    driverId: vehicle.driverId || "",
    fuelType: vehicle.fuelType,
    seatingCapacity: vehicle.seatingCapacity,
    registrationPlate: vehicle.registrationPlate,
    vehicleId: vehicle.vehicleId,
    city: vehicle.city,
    image: vehicle.image || "Images/default-car.png"
  };
};

const useVehicleStore = create((set, get) => ({
  vehicles: [], // List of vehicles
  searchResults: [], // Search results
  error: null, // Error state
  loading: false, // Loading state

  // Fetch all vehicles (admin only)
  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/admin/vehicles");
      
      if (response.data.success) {
        // Normalize vehicle data
        const normalizedVehicles = response.data.vehicles.map(normalizeVehicle);
        set({ vehicles: normalizedVehicles, error: null });
        return normalizedVehicles;
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
    } finally {
      set({ loading: false });
    }
  },

  // Add a new vehicle (admin only)
  addVehicle: async (vehicleData) => {
    set({ loading: true, error: null });
    try {
      // Ensure required fields are present
      const vehicleToAdd = {
        ...vehicleData,
        availability: vehicleData.availability || "Available",
        rating: vehicleData.rating || 0.0,
        city: vehicleData.city || "Delhi",
        image: vehicleData.image || "Images/default-car.png"
      };

      const response = await axios.post("/admin/vehicles", vehicleToAdd);
      
      if (response.data.success) {
        // Normalize the new vehicle data
        const normalizedVehicle = normalizeVehicle(response.data.vehicle);
        
        // Update the vehicles list with the new vehicle
        set((state) => ({
          vehicles: [...state.vehicles, normalizedVehicle],
          error: null,
        }));
        return normalizedVehicle;
      } else {
        throw new Error(response.data.error || "Failed to add vehicle");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to add vehicle" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Update an existing vehicle (admin only)
  updateVehicle: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      console.log("Updating vehicle with ID:", id);
      console.log("Update data:", updates);
      
      // Make sure we're using the correct ID format
      const vehicleId = id;
      
      const response = await axios.put(`/admin/vehicles/${vehicleId}`, updates);
      
      if (response.data.success) {
        // Normalize the updated vehicle data
        const normalizedVehicle = normalizeVehicle(response.data.vehicle);
        
        set((state) => ({
          vehicles: state.vehicles.map((vehicle) =>
            vehicle._id === vehicleId ? normalizedVehicle : vehicle
          ),
          error: null,
        }));
        return normalizedVehicle;
      } else {
        throw new Error(response.data.error || "Failed to update vehicle");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error.response?.data || error.message);
      set({ error: error.response?.data?.error || "Failed to update vehicle" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Remove a vehicle (admin only)
  removeVehicle: async (id) => {
    set({ loading: true, error: null });
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
    } finally {
      set({ loading: false });
    }
  },

  // Search vehicles for users
  searchVehicles: async (searchParams) => {
    set({ loading: true, error: null });
    try {
      const { pickupDate, returnDate, withDriver, city, filter = 'All' } = searchParams;
      
      // Format dates to match backend expectations
      const formattedPickupDate = pickupDate ? new Date(pickupDate).toISOString() : undefined;
      const formattedReturnDate = returnDate ? new Date(returnDate).toISOString() : undefined;

      // If no search parameters are provided, fetch all available vehicles
      if (!pickupDate && !returnDate && !withDriver && !city) {
        // Use the admin endpoint to get all vehicles when no search parameters are provided
        const response = await axios.get("/admin/vehicles");
        
        if (response.data.success) {
          // Normalize vehicle data
          const normalizedVehicles = response.data.vehicles.map(normalizeVehicle);
          
          set({ 
            vehicles: normalizedVehicles,
            searchResults: normalizedVehicles,
            error: null 
          });
          return normalizedVehicles;
        } else {
          throw new Error(response.data.error || "Failed to fetch vehicles");
        }
      } else {
        // Use search parameters
        const response = await axios.get("/vehicles", { 
          params: {
            pickupDate: formattedPickupDate,
            returnDate: formattedReturnDate,
            withDriver: withDriver === 'driver',
            city,
            filter
          }
        });
        
        if (response.data.success) {
          // Normalize vehicle data
          const normalizedVehicles = response.data.vehicles.map(normalizeVehicle);
          
          set({ 
            vehicles: normalizedVehicles,
            searchResults: normalizedVehicles,
            error: null 
          });
          return normalizedVehicles;
        } else {
          throw new Error(response.data.error || "Failed to search vehicles");
        }
      }
    } catch (error) {
      console.error("Error searching vehicles:", error.response?.data || error.message);
      set({ 
        vehicles: [],
        searchResults: [],
        error: error.response?.data?.error || "Failed to search vehicles" 
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Update vehicle status for booking
  updateVehicleStatus: async (vehicleId, status, bookingId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`/vehicles/${vehicleId}/status`, {
        status,
        bookingId,
      });

      if (response.data.success) {
        // Update the local state for the vehicle
        set((state) => ({
          vehicles: state.vehicles.map((vehicle) =>
            vehicle._id === vehicleId ? { ...vehicle, availability: status } : vehicle
          ),
          error: null
        }));
        return response.data;
      } else {
        throw new Error(response.data.error || "Failed to update vehicle status");
      }
    } catch (error) {
      console.error("Error updating vehicle status:", error);
      set({ error: error.response?.data?.error || "Failed to update vehicle status" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Mark vehicle as unavailable for booking
  markVehicleUnavailable: async (vehicleId, returnDate, bookingId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`/vehicles/${vehicleId}/unavailable`, {
        returnDate,
        bookingId,
      });

      if (response.data.success) {
        // Update the local state for the vehicle
        set((state) => ({
          vehicles: state.vehicles.map((vehicle) =>
            vehicle._id === vehicleId ? { ...vehicle, availability: "Not available" } : vehicle
          ),
          error: null
        }));
        return response.data;
      } else {
        throw new Error(response.data.error || "Failed to mark vehicle unavailable");
      }
    } catch (error) {
      console.error("Error marking vehicle unavailable:", error);
      set({ error: error.response?.data?.error || "Failed to mark vehicle unavailable" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useVehicleStore;