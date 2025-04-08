// adminBookingStore.js to store the boookings from the admin side
import { create } from 'zustand';
import axios from 'axios';
const api = axios.create({
    baseURL: '/api/admin/bookings',
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

const useAdminBookingStore = create((set) => ({
  bookings: [],     //Holds the array of booking data received from the backend.
  loading: false,
  error: null,

  //Calls backend API with the selected date and updates the store state.
  fetchBookingsByDate: async (selectedDate) => {
    try {
      set({ loading: true, error: null });
      console.log("Selected Date:", selectedDate); // Log the selected date for debugging
      const encodedDate = encodeURIComponent(selectedDate);
      const response = await api.get(`/date?selectedDate=${encodedDate}`);
      console.log("API Response:", response.data); // Log the API response for debugging
   
      set({
        bookings: response.data.bookings,
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch bookings',
        loading: false
      });
    }
  }
}));

export default useAdminBookingStore;

