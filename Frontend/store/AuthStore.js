import { create } from "zustand";
import axios from "axios";

// Configure axios defaults
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true; // Enable sending cookies with requests

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api/auth', // This works with Vite proxy and matches backend route prefix
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with error
      const errorMessage = error.response.data.message || error.response.data.error || "Server error occurred";
      return Promise.reject({ message: errorMessage });
    } else if (error.request) {
      // No response received
      return Promise.reject({ message: "No response from server. Please try again." });
    } else {
      // Request setup error
      return Promise.reject({ message: error.message });
    }
  }
);

const useAuthStore = create((set, get) => ({
  email: "",
  password: "",
  confirmPassword: "",
  isOtpSent: false,
  isVerified: false,
  user: null,
  token: null,
  error: null,
  // Set email and password during signup
  setSignupData: (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    // Store in sessionStorage for persistence
    sessionStorage.setItem('signupEmail', email);
    sessionStorage.setItem('signupPassword', password);
    set({ email, password, confirmPassword });
  },

  // Send OTP request to backend
  sendOtp: async () => {
    try {
      const { email, password, confirmPassword } = get();
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await api.post("/send-otp", { 
        email,
        password,
        confirmPassword
      });
      
      if (response.data.success) {
        set({ isOtpSent: true });
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  },

  // Verify OTP
  verifyOtp: async (otp) => {
    try {
      // Get data from sessionStorage if state is empty
      const email = get().email || sessionStorage.getItem('signupEmail');
      const password = get().password || sessionStorage.getItem('signupPassword');
      
      if (!email || !password) {
        throw new Error('Session expired. Please try signing up again.');
      }

      const response = await api.post("/verify-otp", { 
        email, 
        otp,
        password  // Include password in verification request
      });

      if (response.data.success) {
        set({ 
          isVerified: true,
          user: response.data.user,
          token: response.data.token 
        });
        // Clear signup data from sessionStorage
        sessionStorage.removeItem('signupEmail');
        sessionStorage.removeItem('signupPassword');
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        // Set token in axios default headers
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return response.data;
      } else {
        throw new Error(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      
      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        // Set token in axios default headers
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        set({
          user: response.data.user,
          token: response.data.token,
          error: null,
        });
        return response.data;
      } else {
        throw new Error("Login failed - no token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      set({
        user: null,
        token: null,
        error: error.message || "Login failed. Please try again.",
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      // First clear all stored data
      localStorage.clear();
      sessionStorage.clear();
      
      // Remove token from axios headers
      delete api.defaults.headers.common['Authorization'];
      
      // Reset store state
      set({
        user: null,
        token: null,
        error: null,
        email: "",
        password: "",
        confirmPassword: "",
        isOtpSent: false,
        isVerified: false,
      });

      // Clear the entire history and force navigation to signin
      const signInUrl = '/auth/signin';
      
      // First, add a new entry to prevent going back
      window.history.pushState(null, '', signInUrl);
      
      // Then clear the entire history
      window.history.go(-(window.history.length - 1));
      
      // Finally, force a page reload to the signin page
      setTimeout(() => {
        window.location.href = signInUrl;
        // Prevent any back navigation after reload
        window.onbeforeunload = function() {
          window.history.forward();
        };
      }, 0);
      
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  // Forgot Password - Request OTP
  forgotPassword: async (email) => {
    try {
      const response = await api.post("/forgot-password", { email });
      if (response.data.message) {
        set({ email }); // Store email for reset password step
        return response.data;
      } else {
        throw new Error("Failed to send password reset OTP");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  },

  // Reset Password with OTP
  resetPassword: async (email, otp, newPassword) => {
    try {
      const response = await api.post("/reset-password", {
        email,
        otp,
        newPassword
      });
      
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  }
}));
export default useAuthStore;
