import axios from 'axios';
import { API_URL, API_CONFIG } from '../config/api.config.js';

const instance = axios.create(API_CONFIG);

export default instance;
export { API_URL };