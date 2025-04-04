import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set, get) => ({
  email: "",
  password: "",
  isOtpSent: false,
  isVerified: false,
  user: null,
  token: null,
  error: null,
  // Set email and password during signup
  setSignupData: (email, password) =>
    set({ email, password }),

  // Send OTP request to backend
  sendOtp: async () => {
    try {
      const { email } = get();
      const res=await axios.post("/api/auth/signup", { email });
      if (res.status !== 200) {
        return res.data;
      }
      // If OTP sent successfully:
      set({ isOtpSent: true });
      return res.data;
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data || error.message);
      throw error;
    }
  },

  // Verify OTP
  verifyOtp: async (otp) => {
    try {
      const { email, password } = get();
      const res=await axios.post("/api/auth/verify-otp", { email, otp, password });
      if (res.data.success===false) {
        return res.data;
      }
      set({ isVerified: true });
      // If successful verification:
      return res.data;
      
     } catch(error){
     throw error;
     }
    },

  login: async (email, password) => {
      try {
        const res = await axios.post("/api/auth/login", { email, password });
        set({
          user: res.data.user,
          token: res.data.token,
          error: null,
        });
        return res.data; // Return response for further actions
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        set({
          user: null,
          token: null,
          error: error.response?.data?.error || "Login failed. Please try again.",
        });
        throw error; // Rethrow error for handling in the component
      }
    },

    logout: () => {
      set({
        user: null,
        token: null,
        error: null,
      });
    },

}));
export default useAuthStore;
