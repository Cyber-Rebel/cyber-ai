import { io } from 'socket.io-client';
import { API_URL } from './config/api.config.js';


api = "https://ai.cyberhash.me"

export const socket = io(api, { withCredentials: true });