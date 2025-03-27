import { create }from 'zustand'
import axios from 'axios'

const apiUrl = 'http://localhost:5000/api/auth'

const useAuthStore = create((set) => ({
  user: null,
  email: null,
  token: null,

  login: async (email, password) => {
    try {
      const { data } = await axios.post(`${apiUrl}/login`, { email, password });
      set({ user: data, token: data.token, error: null });
    } catch (error) {
      set({ error: error.response?.data.message || 'Error al iniciar sesión' });
    }
  },
  register: async(name, email, password) => {
    try {
      const { data } = await axios.post(`${apiUrl}/register`, { name, email, password });
      set({ user: data, token: data.token, error: null });
    } catch (error) {
      set({ error: error.response?.data.message || 'Error al registrar' });
    }
  },

  logout: () => set({ user: null, token: null, error: null })
}))

export default useAuthStore;