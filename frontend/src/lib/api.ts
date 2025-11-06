import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000,
});

export const endpoints = {
  players: '/api/players',   // 백엔드에서 GET /api/players 제공
};
