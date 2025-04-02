// Por ejemplo, al crear una instancia de axios:
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // IMPORTANTE: Permite enviar cookies en cada request
});

export default api;
