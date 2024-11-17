// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-backend-url.com/api',
});

export default api;
