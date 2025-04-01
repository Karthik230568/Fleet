import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set, get) => ({
  email: "",
  password: "",
  isOtpSent: false,
  
  // Set email and password during signup
  setSignupData: (email, password) =>
    set({ email, password }),

  // Send OTP request to backend
  sendOtp: async () => {
    try {
      const { email } = get();
      const res=await axios.post("/api/auth/signup", { email });
      if (res.status !== 200) {
        return { success: false, message: res.message };
      }
      // If OTP sent successfully:
      set({ isOtpSent: true });
      return { success: true, message: "OTP sent successfully!" };
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data || error.message);
      throw error;
    }
  },

  // Verify OTP
  verifyOtp: async (otp) => {
    try {
      const { email, password } = get();
      await axios.post("/api/auth/verify-otp", { email, otp, password });
      
      // If successful verification:
      return true;
      
     } catch(error){
     throw error;
     }
}}));
export default useAuthStore;
