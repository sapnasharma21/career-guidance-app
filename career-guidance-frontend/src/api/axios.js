import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Har request ke saath token automatically attach karo (agar hai to)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;