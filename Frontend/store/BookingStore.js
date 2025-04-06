import { create } from "zustand";
import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api/bookings',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for better error handling
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.error('API Error:', error.response?.data || error.message);
  return Promise.reject(error);
});

const useBookingStore = create((set, get) => ({
  // Booking form data
  bookingData: {
    city: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    withDriver: false,
    ownDriving: false,
    address: '',
    termsAccepted: false
  },

  // Available vehicles
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,

  // Set booking data
  setBookingData: (data) => {
    set((state) => ({
      bookingData: {
        ...state.bookingData,
        ...data
      }
    }));
  },

  // Reset booking data
  resetBookingData: () => {
    set({
      bookingData: {
        city: '',
        pickupDate: '',
        pickupTime: '',
        returnDate: '',
        returnTime: '',
        withDriver: false,
        ownDriving: false,
        address: '',
        termsAccepted: false
      },
      selectedVehicle: null,
      vehicles: [],
      error: null
    });
  },

  // Initialize booking
  initializeBooking: async () => {
    try {
      set({ loading: true, error: null });
      const { bookingData } = get();

      const formattedData = {
        pickupDate: `${bookingData.pickupDate}T${bookingData.pickupTime}`,
        returnDate: `${bookingData.returnDate}T${bookingData.returnTime}`,
        bookingType: bookingData.withDriver ? 'driver' : 'own',
        city: bookingData.city
      };

      const response = await api.post('/initialize', formattedData);
      
      if (response.data.success) {
        set({ loading: false });
        return true;
      } else {
        throw new Error(response.data.message || 'Failed to initialize booking');
      }
    } catch (error) {
      console.error('Error initializing booking:', error);
      set({ 
        error: error.response?.data?.error || error.message || 'Failed to initialize booking',
        loading: false 
      });
      throw error;
    }
  },

  // Confirm booking
  confirmBooking: async (vehicleId) => {
    try {
      set({ loading: true, error: null });
      const { bookingData } = get();

      const baseBookingData = {
        vehicleId,
        pickupDate: `${bookingData.pickupDate}T${bookingData.pickupTime}`,
        returnDate: `${bookingData.returnDate}T${bookingData.returnTime}`
      };

      let endpoint;
      let bookingDetails;

      if (bookingData.withDriver) {
        endpoint = '/confirm-driver';
        bookingDetails = {
          ...baseBookingData,
          address: bookingData.address,
          isDelivery: true
        };
      } else if (bookingData.address) {
        endpoint = '/confirm-self-drive-delivery';
        bookingDetails = {
          ...baseBookingData,
          deliveryAddress: bookingData.address,
          termsAccepted: bookingData.termsAccepted
        };
      } else {
        endpoint = '/confirm-self-drive-pickup';
        bookingDetails = {
          ...baseBookingData,
          termsAccepted: bookingData.termsAccepted
        };
      }

      const response = await api.post(endpoint, bookingDetails);
      
      if (response.data.success) {
        set({ loading: false });
        return response.data.booking;
      } else {
        throw new Error(response.data.message || 'Booking confirmation failed');
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      set({ 
        error: error.response?.data?.error || error.message || 'Failed to confirm booking',
        loading: false 
      });
      throw error;
    }
  },

  // Get active bookings
  getActiveBookings: async () => {
    try {
      set({ loading: true, error: null });
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await api.get(`/active/${userId}`);
      
      if (response.data.success) {
        set({ loading: false });
        return response.data.bookings;
      } else {
        throw new Error(response.data.message || 'Failed to fetch active bookings');
      }
    } catch (error) {
      console.error('Error fetching active bookings:', error);
      set({ 
        error: error.response?.data?.error || error.message || 'Failed to fetch active bookings',
        loading: false 
      });
      throw error;
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId) => {
    try {
      set({ loading: true, error: null });
      
      const response = await api.put(`/cancel/${bookingId}`);
      
      if (response.data.success) {
        set({ loading: false });
        return true;
      } else {
        throw new Error(response.data.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
      set({ 
        error: error.response?.data?.error || error.message || 'Failed to cancel booking',
        loading: false 
      });
      throw error;
    }
  }
}));

export default useBookingStore;
