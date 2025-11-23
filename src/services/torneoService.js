import api from './api';

export const torneoService = {
  getAll: () => api.get('/torneos'),
  getById: (id) => api.get(`/torneos/${id}`),
  create: (data) => api.post('/torneos', data),
  update: (id, data) => api.put(`/torneos/${id}`, data),
  delete: (id) => api.delete(`/torneos/${id}`),
  getCategorias: (torneoId) => api.get(`/torneos/${torneoId}/categorias`),
  addCategoria: (torneoId, categoria) => api.post(`/torneos/${torneoId}/categorias`, categoria),
  updateCategoria: (torneoId, categoriaId, categoria) => 
    api.put(`/torneos/${torneoId}/categorias/${categoriaId}`, categoria),
  deleteCategoria: (torneoId, categoriaId) => 
    api.delete(`/torneos/${torneoId}/categorias/${categoriaId}`),
};

