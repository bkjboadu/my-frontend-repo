import axios from 'axios';
import Cookies from 'js-cookie'

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const clearAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
}

api.interceptors.request.use(
  (config) => {
    if(config.url.includes('/login') || config.url.includes('/signup')) {
      return config;
    }
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        api.post('/accounts/token/refresh/', { refresh: refreshToken })
          .then((response) => {
            Cookies.set('authToken', response.data.access);
            return api.request(error.config);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    return Promise.reject(error);
  }
);

export default api;