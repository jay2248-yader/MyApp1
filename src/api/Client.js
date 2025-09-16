import axios from 'axios';

// mapping branch → API URL
const API_BRANCHES = {
  VT: 'http://192.168.3.153:3002',
  PZ: 'http://192.168.2.151:3002',
  PS: 'http://192.168.1.49:3002',
};

let currentBranch = 'VT';

export const api = axios.create({
  baseURL: API_BRANCHES[currentBranch],
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 5000, 
});


api.interceptors.response.use(
  (response) => {
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
      return Promise.reject(new Error('API server returned HTML instead of JSON.'));
    }
    return response;
  },
  (error) => {

    if (process.env.NODE_ENV === 'development') {
      console.warn('API Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);


export function setBranch(branchCode) {
  if (API_BRANCHES[branchCode]) {
    currentBranch = branchCode;
    api.defaults.baseURL = API_BRANCHES[branchCode];
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Switched API branch:', branchCode, 'URL:', API_BRANCHES[branchCode]);
    }
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Unknown branch:', branchCode);
    }
  }
}
