// BookingStore.js
import { create } from 'zustand';
import axios from 'axios';

const useBookingStore = create((set) => ({
  city: '',
  pickupDate: '',
  returnDate: '',
  bookingType: '',
  error: null,
  loading: false,

  setCity: (city) => set({ city }),
  setPickupDate: (pickupDate) => set({ pickupDate }),
  setReturnDate: (returnDate) => set({ returnDate }),
  setBookingType: (bookingType) => set({ bookingType }),
  
  initializeBooking: async () => {
    set({ loading: true, error: null });
    
    try {
      const state = useBookingStore.getState();
      
      // Prepare the data for the backend
      const bookingData = {
        city: state.city,
        pickupDate: state.pickupDate,
        returnDate: state.returnDate,
        bookingType: state.bookingType === 'driver' ? 'withDriver' : 'withoutDriver'
      };
      
      // Call the backend API
      const response = await axios.post('/api/bookings/initialize', bookingData);
      
      set({ loading: false });
      return response.data;
    } catch (error) {
      console.error('Error initializing booking:', error);
      
      // Extract error message from response if available
      const errorMessage = error.response?.data?.error || 'Failed to initialize booking';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },
  
  resetBookingData: () => set({
    city: '',
    pickupDate: '',
    returnDate: '',
    bookingType: '',
    error: null
  })
}));

export default useBookingStore;
