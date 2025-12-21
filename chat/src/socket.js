import { io } from 'socket.io-client';
import { API_URL } from './config/api.config.js';


api = "http://13.49.82.81"

export const socket = io(api, { withCredentials: true });