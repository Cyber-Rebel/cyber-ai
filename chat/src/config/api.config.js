// API Configuration
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('ERROR: VITE_API_URL is not set in .env file!');
  throw new Error('VITE_API_URL environment variable is required');
}

export { API_URL };

export const API_CONFIG = {
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
};

export default API_URL;
