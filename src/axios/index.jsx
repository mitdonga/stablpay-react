// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_API_URL
});

const token = localStorage.getItem('token')
console.log(token);
api.interceptors.request.use(config => {
  config.headers['Authorization'] = token;
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
		if (window.location.pathname != '/login') window.location.href = '/login'; 
  }
  return Promise.reject(error);
});

export default api;
