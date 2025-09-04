import axios from 'axios';

const BASE_URL = 'api-production-0ec6.up.railway.app'; 

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});