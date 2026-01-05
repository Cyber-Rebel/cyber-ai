import { io } from 'socket.io-client';
import { API_URL } from './config/api.config.js';


api = "http://localhost:3000"

export const socket = io(api, { withCredentials: true });