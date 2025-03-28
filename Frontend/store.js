import { create } from 'zustand';

const useFleetStore = create((set) => ({
    vehicles: [],
    bookings: [],
    users: [],
    loading: false,
    error: null,

    // Fetch available vehicles from backend
    fetchVehicles: async () => {
        set({ loading: true });
        try {
            const response = await fetch('http://localhost:5000/api/vehicles');
            const data = await response.json();
            set({ vehicles: data, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch vehicles", loading: false });
        }
    },

    // Book a vehicle
    bookVehicle: async (vehicleId, userId) => {
        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vehicleId, userId }),
            });
            const data = await response.json();
            set((state) => ({ bookings: [...state.bookings, data] }));
        } catch (error) {
            console.error("Booking failed:", error);
        }
    },

    // Fetch user bookings
    fetchBookings: async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/bookings/${userId}`);
            const data = await response.json();
            set({ bookings: data });
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        }
    }
}));

export default useFleetStore;
