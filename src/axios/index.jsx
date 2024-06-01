import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

Api.interceptors.request.use(config => {
  config.headers['Authorization'] = localStorage.getItem('token');
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  return config;
}, error => {
  return Promise.reject(error);
});

Api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
		localStorage.removeItem('token');
		if (window.location.pathname != '/login') window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default Api;
