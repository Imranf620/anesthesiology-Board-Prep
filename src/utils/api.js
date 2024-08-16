import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create an Axios instance
 const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const queryClient = new QueryClient();
const controllers = new Map();

// Request interceptor to add AbortController
API.interceptors.request.use(
  config => {
    const controller = new AbortController();
    config.signal = controller.signal;
    controllers.set(config.url, controller);
    return config;
  },
  error => Promise.reject(error),
);

let authError = false;

// Response interceptor to handle 401 errors
API.interceptors.response.use(
  response => {
    controllers.delete(response.config.url);
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/' &&
        !authError &&
        localStorage.getItem('token')
      ) {
        toast.error(
          'Token has expired. You will be redirected to login page, Please login again!',
          { autoClose: 3000 },
        );
        authError = true;
        // Abort all ongoing requests
        controllers.forEach(controller => controller.abort());
        controllers.clear();
        setTimeout(() => {
          queryClient.clear();
          localStorage.clear();
          location.assign('/login');
          authError = false;
        }, 3000);
      }
    }
    return Promise.reject(error);
  },
);

 const updateHeaders = () => {
  API.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token',
  )}`;
};

updateHeaders();

export {API,updateHeaders}