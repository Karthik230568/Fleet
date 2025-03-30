import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/api/signup', { email, password });
      set({ user: response.data.user, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Sign-up failed', isLoading: false });
    }
  },
}));

export default useAuthStore;
