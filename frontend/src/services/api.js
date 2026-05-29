import axios from 'axios';

const API_BASE = process.env.VITE_API_URL || 'https://animal-rescue-u26c.onrender.com/api';

const getHeaders = () => {
  const user = localStorage.getItem('rescueUser');
  if (user) {
    const { token } = JSON.parse(user);
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// Auth APIs
export const authAPI = {
  register: (data) => axios.post(`${API_BASE}/auth/register`, data),
  login: (data) => axios.post(`${API_BASE}/auth/login`, data),
};

// Animal APIs
export const animalAPI = {
  getAll: (filters = {}) => axios.get(`${API_BASE}/animals`, { params: filters }),
  getById: (id) => axios.get(`${API_BASE}/animals/${id}`),
  create: (data) => 
    axios.post(`${API_BASE}/animals`, data, { headers: getHeaders() }),
  update: (id, data) => 
    axios.put(`${API_BASE}/animals/${id}`, data, { headers: getHeaders() }),
  delete: (id) => 
    axios.delete(`${API_BASE}/animals/${id}`, { headers: getHeaders() }),
  adopt: (id) => 
    axios.put(`${API_BASE}/animals/${id}/adopt`, {}, { headers: getHeaders() }),
};

// Rescue Request APIs
export const rescueAPI = {
  getAll: (filters = {}) => axios.get(`${API_BASE}/rescues`, { params: filters }),
  getById: (id) => axios.get(`${API_BASE}/rescues/${id}`),
  create: (data) => 
    axios.post(`${API_BASE}/rescues`, data, { headers: getHeaders() }),
  update: (id, data) => 
    axios.put(`${API_BASE}/rescues/${id}`, data, { headers: getHeaders() }),
  addUpdate: (id, text) => 
    axios.post(`${API_BASE}/rescues/${id}/updates`, { text }, { headers: getHeaders() }),
  close: (id) => 
    axios.put(`${API_BASE}/rescues/${id}/close`, {}, { headers: getHeaders() }),
};

// Volunteer APIs
export const volunteerAPI = {
  getAll: (filters = {}) => axios.get(`${API_BASE}/volunteers`, { params: filters }),
  getById: (id) => axios.get(`${API_BASE}/volunteers/${id}`),
  getDashboard: () => 
    axios.get(`${API_BASE}/volunteers/dashboard`, { headers: getHeaders() }),
  updateProfile: (data) => 
    axios.put(`${API_BASE}/volunteers/profile`, data, { headers: getHeaders() }),
  assignRescue: (rescueId, data) => 
    axios.post(`${API_BASE}/volunteers/${rescueId}/assign`, data, { headers: getHeaders() }),
};

// NGO APIs
export const ngoAPI = {
  getAll: (filters = {}) => axios.get(`${API_BASE}/ngos`, { params: filters }),
  getById: (id) => axios.get(`${API_BASE}/ngos/${id}`),
  updateProfile: (data) => 
    axios.put(`${API_BASE}/ngos/profile`, data, { headers: getHeaders() }),
};
