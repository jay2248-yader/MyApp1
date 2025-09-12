import axios from 'axios';

// mapping branch → API URL
const API_BRANCHES = {
  VT: 'http://192.168.3.151:3002',
  PZ: 'http://192.168.2.151:3002',
  PS: 'http://192.168.1.49:3002',
};

// ตัวแปรเก็บ branch ปัจจุบัน
let currentBranch = 'VT';

export const api = axios.create({
  baseURL: API_BRANCHES[currentBranch], // ค่าเริ่มต้น
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor ตรวจสอบ response
api.interceptors.response.use(
  (response) => {
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
      throw new Error('API server returned HTML instead of JSON.');
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

// ฟังก์ชันเปลี่ยน branch
export function setBranch(branchCode) {
  if (API_BRANCHES[branchCode]) {
    currentBranch = branchCode;
    api.defaults.baseURL = API_BRANCHES[branchCode];
    console.log('🔄 Switched API branch:', branchCode, 'URL:', API_BRANCHES[branchCode]);
  } else {
    console.warn('⚠️ Unknown branch:', branchCode);
  }
}
