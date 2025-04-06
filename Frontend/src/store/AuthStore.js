import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const useAuthStore = create((set) => ({
  signupData: null,
  setSignupData: (email, password) => set({ signupData: { email, password } }),
  
  sendOtp: async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/send-otp`, {
        email: useAuthStore.getState().signupData.email,
        password: useAuthStore.getState().signupData.password
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyOtp: async (otp) => {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        email: useAuthStore.getState().signupData.email,
        otp
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signin: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  adminSignin: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/admin/auth/signin`, {
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}));

export default useAuthStore; 