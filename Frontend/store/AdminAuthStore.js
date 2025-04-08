
import { create } from "zustand";
import axios from "axios";
// Configure axios defaults for admin API
const adminApi = axios.create({
  baseURL: 'http://localhost:5000/api/admin/auth', // Backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Add response interceptor for better error handling
adminApi.interceptors.response.use(
  response => response,
  error => {
    console.error('Admin API Error:', error);
    if (error.response) {
      // Server responded with an error
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
const useAdminAuthStore = create((set) => ({
  isAuthenticated: false,
  token: null,
  error: null,
  loading: false,

  // Admin login with database-based credentials
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const response = await adminApi.post("/login", { email, password });

      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem('adminToken', response.data.token);
        // Set token in axios default headers
        adminApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        set({
          isAuthenticated: true,
          token: response.data.token,
          error: null,
          loading: false
        });

        return response.data;
      } else {
        throw new Error("Admin login failed - no token received");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      set({
        isAuthenticated: false,
        token: null,
        error: error.message || "Login failed. Please try again.",
        loading: false
      });
      throw error;
    }
  },

  // Check if admin is already logged in (on app load)
  checkAuth: async () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        // Validate token with backend
        const response = await adminApi.post('/validate-token', { token });
        if (response.data.valid) {
          // Set token in axios default headers
          adminApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          set({
            isAuthenticated: true,
            token,
            error: null
          });
          return true;
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        set({ error: "Token validation failed. Please log in again." });
      }
    }
    set({ isAuthenticated: false, token: null });
    return false;
  },

  // Admin logout
  logout: () => {
    // Clear admin token from localStorage
    localStorage.removeItem('adminToken');

    // Remove token from axios headers
    delete adminApi.defaults.headers.common['Authorization'];

    // Reset store state
    set({
      isAuthenticated: false,
      token: null,
      error: null
    });

    // Redirect to admin login page
    window.location.href = '/auth/admin';
  }
}));
export default useAdminAuthStore;