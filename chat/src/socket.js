import { io } from 'socket.io-client';

const URL = 'https://cyber-ai-a71i.onrender.com';

export const socket = io(URL,{withCredentials:true});x