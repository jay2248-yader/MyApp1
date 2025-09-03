import axios from 'axios';

const BASE_URL = 'http://192.168.32.30:3002'; 

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});