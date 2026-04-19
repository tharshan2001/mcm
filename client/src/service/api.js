// src/service/api.js
import axios from 'axios';
import toast from 'react-hot-toast';

// Vite env variable (must start with VITE_)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090/api/';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // automatically send cookies/credentials
});

// Map technical errors to user-friendly messages
const friendlyMessages = {
  forbidden: 'You do not have permission for this action',
  unauthorized: 'Please login to continue',
  not_found: 'The requested item was not found',
  bad_request: 'Invalid information provided',
  conflict: 'This item already exists',
  internal_server_error: 'Server error. Please try again later',
  service_unavailable: 'Server is busy. Please try again later',
  network_error: 'Connection failed. Check your internet',
};

const getFriendlyMessage = (error) => {
  const status = error.response?.status;
  const serverMessage = error.response?.data?.message;
  
  if (!serverMessage) {
    return friendlyMessages.network_error || 'Something went wrong';
  }
  
  const key = serverMessage.toLowerCase().replace(/ /g, '_');
  if (friendlyMessages[key]) {
    return friendlyMessages[key];
  }
  
  if (status === 403) return friendlyMessages.forbidden;
  if (status === 401) return friendlyMessages.unauthorized;
  if (status === 404) return friendlyMessages.not_found;
  if (status === 400) return friendlyMessages.bad_request;
  if (status === 409) return friendlyMessages.conflict;
  if (status >= 500) return friendlyMessages.internal_server_error;
  
  return serverMessage;
};

// Response interceptor - show user-friendly error toast
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = getFriendlyMessage(error);
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;