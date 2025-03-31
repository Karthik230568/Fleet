import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
    email: "",
    password: "",
    otp: "",
    isOtpSent: false,
    isVerified: false,

    // Set email and password during signup
    setSignupData: (email, password) => set({ email, password }),

    // Send OTP request to backend
    sendOtp: async () => {
        try {
            const { email } = useAuthStore.getState();
            await axios.post("http://localhost:5000/api/auth/signup", { email });
            set({ isOtpSent: true });
        } catch (error) {
            console.error("Error sending OTP:", error.response?.data || error.message);
        }
    },

    // Verify OTP
    verifyOtp: async (otp) => {
        try {
            const { email, password } = useAuthStore.getState();
            const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp, password });

            if (response.status === 201) {
                set({ isVerified: true });
            }
        } catch (error) {
            console.error("Invalid OTP:", error.response?.data || error.message);
        }
    }
}));

export default useAuthStore;
