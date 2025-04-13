import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

// Axios config
const api = axios.create({
  baseURL: '/api/auth',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies if needed
});

// Axios interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { userlogout } = useAuthStore.getState();

      // Log out the user if token is invalid or expired
      userlogout();
    }
    return Promise.reject(error);
  }
);

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isOtpSent: false,
      isVerified: false,
      error: null,

      // Set signup data
      setSignupData: (email, password, confirmPassword) => {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        set({ email, password, confirmPassword });
      },

      // Send OTP
      sendOtp: async () => {
        const { email, password, confirmPassword } = get();

        if (!email || !password) throw new Error('Email and password are required');
        if (password !== confirmPassword) throw new Error('Passwords do not match');

        const response = await api.post("/send-otp", { email, password, confirmPassword });
        if (response.data.success) {
          set({ isOtpSent: true });
          return response.data;
        } else {
          throw new Error(response.data.message || 'Failed to send OTP');
        }
      },

      // Verify OTP
      verifyOtp: async (otp) => {
        const { email, password } = get();

        if (!email || !password) throw new Error('Session expired. Please try signing up again.');

        const response = await api.post("/verify-otp", { email, otp, password });

        if (response.data.success) {
          set({
            isVerified: true,
            user: response.data.user,
            token: response.data.token,
          });

          localStorage.setItem('token', response.data.token);
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
          return response.data;
        } else {
          throw new Error(response.data.message || "OTP verification failed");
        }
      },

      // Login
      login: async (email, password) => {
        try {
          const response = await api.post("/login", { email, password });
          if(!response.data.success) {
            return response.data;
          }
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
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
          set({
            user: null,
            token: null,
            error: error.message || "Login failed. Please try again.",
          });
          throw error;
        }
      },

      // Logout
      userlogout: () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        set({
          user: null,
          token: null,
          isOtpSent: false,
          isVerified: false,
          error: null,
        });
        window.location.href = "/auth/signin"; // Redirect to login page
      },

      // Forgot Password
      forgotPassword: async (email) => {
        const response = await api.post("/forgot-password", { email });
        if (response.data.message) {
          set({ email });
          return response.data;
        } else {
          throw new Error("Failed to send password reset OTP");
        }
      },

      // Reset Password
      resetPassword: async (email, otp, newPassword) => {
        const response = await api.post("/reset-password", { email, otp, newPassword });
        if (response.data.success) {
          return response.data;
        } else {
          throw new Error(response.data.error || "Failed to reset password");
        }
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isVerified: state.isVerified,
      }),
    }
  )
);

export default useAuthStore;