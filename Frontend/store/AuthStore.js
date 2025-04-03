import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set, get) => ({
  email: "",
  password: "",
  isOtpSent: false,
  isVerified: false,
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
}}));
export default useAuthStore;
