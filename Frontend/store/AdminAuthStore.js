
import { create } from "zustand";
import { persist } from "zustand/middleware"; // 👈 import persist
import axios from "axios";

// Axios config
const adminApi = axios.create({
  baseURL: '/api/admin/auth',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

adminApi.interceptors.response.use(
  response => response,
  error => {
    console.error("Admin API Error:", error);
    if (error.response) {
      const errorMessage = error.response.data.message || error.response.data.error || "Server error occurred";
      return Promise.reject({ message: errorMessage });
    } else if (error.request) {
      return Promise.reject({ message: "No response from server. Please try again." });
    } else {
      return Promise.reject({ message: error.message });
    }
  }
);

const useAdminAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      error: null,
      loading: false,

      login: async (email, password) => {
        try {
          set({ loading: true, error: null });
          const response = await adminApi.post("/login", { email, password });

          if (response.data.token) {
            localStorage.setItem("adminToken", response.data.token);
            adminApi.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

            set({
              isAuthenticated: true,
              token: response.data.token,
              loading: false,
              error: null,
            });

            return response.data;
          } else {
            throw new Error("Login failed - No token received");
          }
        } catch (error) {
          set({
            isAuthenticated: false,
            token: null,
            loading: false,
            error: error.message || "Login failed",
          });
          throw error;
        }
      },

      checkAuth: async () => {
        const token = localStorage.getItem("adminToken");
        if (token) {
          try {
            const response = await adminApi.post("/validate-token", { token });
            if (response.data.valid) {
              adminApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
              set({
                isAuthenticated: true,
                token,
                error: null,
              });
              return true;
            }
          } catch (error) {
            console.error("Admin token validation failed:", error);
            set({ error: "Session expired. Please login again." });
          }
        }
        set({ isAuthenticated: false, token: null });
        return false;
      },

      logout: () => {
        localStorage.removeItem("adminToken");
        delete adminApi.defaults.headers.common["Authorization"];
        set({
          isAuthenticated: false,
          token: null,
          error: null,
        });
        window.location.href = "/auth/admin";
      },
    }),
    {
      name: "admin-auth-storage", // 👈 localStorage key
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    }
  )
);

export default useAdminAuthStore;
