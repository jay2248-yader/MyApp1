import axios from 'axios';

const BASE_URL =  'http://localhost:3002/'; 

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add response interceptor to handle HTML error responses
api.interceptors.response.use(
  (response) => {
    // Check if response is HTML instead of JSON
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
      throw new Error('API server returned HTML instead of JSON. Please check if the backend server is running on port 3002.');
    }
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);