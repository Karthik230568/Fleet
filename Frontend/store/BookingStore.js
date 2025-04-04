import { create } from "zustand";
import axios from "axios";

const useBookingStore = create((set) => ({
  pickupDate: null,
  returnDate: null,
  bookingType: null,
  city: null,
  error: null,

  // Set pickup and return dates
  setPickupDate: (date) => set({ pickupDate: date }),
  setReturnDate: (date) => set({ returnDate: date }),
  setBookingType: (type) => set({ bookingType: type }),
  setCity: (city) => set({ city }),

  // Send booking details to the backend
  initializeBooking: async () => {
    try {
      const { pickupDate, returnDate, bookingType, city } = get();
      const response = await fetch("/api/bookings/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickupDate,
          returnDate,
          bookingType,
          city,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to initialize booking");
      }

      const data = await response.json();
      console.log("Booking initialized:", data);
      return data;
    } catch (error) {
      console.error("Error initializing booking:", error.message);
      set({ error: error.message });
      throw error;
    }
  },
}));

export default useBookingStore;
