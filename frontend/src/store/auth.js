import { create }from 'zustand'
import api from '../utils/api.js'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,

  login: async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password, withCredentials: true });
      set({ user: data, error: null, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data.message || 'Error al iniciar sesión' });
    }
  },

  register: async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password, withCredentials: true });
      set({ user: data, error: null });
    } catch (error) {
      set({ error: error.response?.data.message || 'Error al registrar' });
    }
  },

  checkAuth: async () => {
    try {
      const { data } = await api.get("/auth/me", { withCredentials: true });
      set({ user: data, loading: false });
      localStorage.setItem("user", JSON.stringify(data));
    } catch {
      set({ user: null, loading: false });
      localStorage.removeItem("user");
    }
  },

  logout: async () => {
    try {
      await api.get('/auth/logout', { withCredentials: true }); 
      set({ user: null, error: null });
      localStorage.removeItem("user");
    } catch (error) {
      set({ error: error.response?.data.message || 'Error al cerrar sesión' });
    }
  },

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading })
}));

export default useAuthStore;