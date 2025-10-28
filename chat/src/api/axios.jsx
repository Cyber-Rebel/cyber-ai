import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:3000',
 
});

export default instance;
export const API_URL = 'http://localhost:3000';