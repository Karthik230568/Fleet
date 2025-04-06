// BookingStore.js
import { create } from 'zustand';

// src/store/BookingStore.js
import { create } from 'zustand';

const useBookingStore = create((set) => ({
  bookingData: {
    city: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    withDriver: false,
    ownDriving: false
  },
  error: null,

  setBookingData: (data) => set({ bookingData: data }),

  initializeBooking: async () => {
    const { bookingData } = useBookingStore.getState();
    try {
      // Optionally send data to backend using axios here
      // const response = await axios.post('/api/bookings', bookingData);
      // console.log(response.data);

      // Simulating backend success
      return true;
    } catch (err) {
      set({ error: 'Failed to initialize booking' });
      return false;
    }
  },
}));

export default useBookingStore;


// import axios from 'axios';       // will be required to send/fectch info to/from backend

// Configure axios defaults
// axios.defaults.baseURL = '/api';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// const useBookingStore = create((set, get) => ({
//   city: '',
//   pickupDate: '',
//   returnDate: '',
//   bookingType: '',
//   error: null,
//   loading: false,

//   setBookingData: (data) => {
//     const { city, pickupDate, returnDate, bookingType } = data;
//     set({ 
//       city, 
//       pickupDate, 
//       returnDate, 
//       bookingType,
//       error: null 
//     });
//   },
  
//   initializeBooking: async () => {
//     set({ loading: true, error: null });
    
//     try {
//       const state = get();
      
//       // Format dates to match backend expectations
//       const formattedPickupDate = new Date(state.pickupDate).toISOString();
//       const formattedReturnDate = new Date(state.returnDate).toISOString();
      
//       // Prepare the data for the backend
//       const bookingData = {
//         city: state.city,
//         pickupDate: formattedPickupDate,
//         returnDate: formattedReturnDate,
//         withDriver: state.bookingType === 'driver'
//       };
      
//       // Call the backend API
//       const response = await axios.post('/bookings/initialize', bookingData);
      
//       if (response.data.success) {
//         set({ loading: false });
//         return true;
//       } else {
//         throw new Error(response.data.error || 'Failed to initialize booking');
//       }
//     } catch (error) {
//       console.error('Error initializing booking:', error);
      
//       // Extract error message from response if available
//       const errorMessage = error.response?.data?.error || 'Failed to initialize booking';
//       set({ error: errorMessage, loading: false });
//       throw error;
//     }
//   },

//   createBooking: async (vehicleId) => {
//     set({ loading: true, error: null });
    
//     try {
//       const state = get();
      
//       // Format dates to match backend expectations
//       const formattedPickupDate = new Date(state.pickupDate).toISOString();
//       const formattedReturnDate = new Date(state.returnDate).toISOString();
      
//       // Prepare the booking data
//       const bookingData = {
//         vehicleId,
//         city: state.city,
//         pickupDate: formattedPickupDate,
//         returnDate: formattedReturnDate,
//         withDriver: state.bookingType === 'driver'
//       };
      
//       // Create the booking
//       const response = await axios.post('/bookings', bookingData);
      
//       if (response.data.success) {
//         set({ loading: false });
//         return response.data.booking;
//       } else {
//         throw new Error(response.data.error || 'Failed to create booking');
//       }
//     } catch (error) {
//       console.error('Error creating booking:', error);
//       const errorMessage = error.response?.data?.error || 'Failed to create booking';
//       set({ error: errorMessage, loading: false });
//       throw error;
//     }
//   },
  
  // resetBookingData: () => set({
//     city: '',
//     pickupDate: '',
//     returnDate: '',
//     bookingType: '',
//     error: null,
//     loading: false
//   })
// }));

// export default useBookingStore;
