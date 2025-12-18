import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

export const getSongs = async () => {
  const response = await api.get('/songs');
  return response.data;
};

export const updateSongStatus = async (id, status) => {
  const response = await api.patch(`/songs/${id}`, { status });
  return response.data;
};

