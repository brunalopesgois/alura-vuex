import axios from 'axios';
import provider from '@/provider';

const http = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Accept': 'application/json',
    'Content': 'application/json'
  }
});

http.interceptors.request.use((config) => {
  const token = provider.state.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default http;