import { io } from 'socket.io-client';
import { API_URL } from './config/api.config.js';

export const socket = io(API_URL, { withCredentials: true });x