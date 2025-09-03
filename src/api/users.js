import { api } from './Client';

export const login = (username, password) =>
  api.post('/users/login', { username, password });


